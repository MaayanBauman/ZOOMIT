//@ts-nocheck
import { getSimilarPosts, SupportedLanguage } from "recomm.js";
import { events, users, categories, sources } from '../services';

// Return the n (=count) most recommended events-ids to this user
const getRecommendedEventsIds = async (userId: string, count: Number): string[] => {
	const user = await users.getUserById(userId);
	const allCategories = await categories.getAllCategories();
	const allSources = await sources.getAllSources();
	const allZoomers = await users.getUsersByType("zoomer");
	const now = new Date();
	const userEvents = await users.getUserEvents(userId);
	const pastUserEventsRated = userEvents
		.filter(event => event.start_time < now)
		.map(event => {
			// Add user's rating to event
			const index = user.registerd_events.findIndex(e => e["eventId"] == event._id.toString());
			// const rating = user.registerd_events[index].rating;
			return { ...event, rating: user.registerd_events[index].rating };
		});

	let eventTarget;

	// If he rated event 4-5, take the latest
	const highRatedPastEvents = pastUserEventsRated.filter(e => e.rating >= 4)

	if (highRatedPastEvents.length > 0) {
		eventTarget = getLatestEvent(highRatedPastEvents)
	} else {
		// If there are unrated events, take the latest
		const unratedEvents = pastUserEventsRated.filter(e => e.rating == 0)
		if (unratedEvents.length > 0) {
			eventTarget = getLatestEvent(unratedEvents)
		} else {
			// return the latest event
			eventTarget = getHighestRatedEvent(pastUserEventsRated)
		}
	}

	const eventTargetFormatted = formatEvent(eventTarget, allCategories, allSources, allZoomers)
	console.log(eventTargetFormatted);

	// Get all future events
	const futureEvents = await events.getEventsByFiltersJoined({
		title: '',
		zoomer_id: '',
		source_id: '',
		start_time: now,
		category: '',
		min_price: 0,
		max_price: 1000,
	})

	// Format all future events that the user is not register to (so zoomer_id "123" wont be close to "127")
	const futureEventsFormatted = futureEvents
		.filter(event => !event.registered_users.includes(user._id.toString()))
		.map(event => (formatEvent(event, allCategories, allSources, allZoomers)))

	// checkFromattings(futureEventsFormatted, "duration");

	const options = {
		fields: ["price", "duration", "start_time", "zoomer_source"],
		items: futureEventsFormatted,
		language: SupportedLanguage.ENGLISH,
		returnFields: ["_id", "category", "price", "duration", "start_time", "zoomer_source", "score"],
		limit: futureEventsFormatted.length
	};

	const results = getSimilarPosts(eventTargetFormatted, options);

	const miniEvent = (({ category, price, duration, start_time, zoomer_source }) => ({ category, price, duration, start_time, zoomer_source }))(eventTargetFormatted)

	// console.log("results before category:");
	// console.table({miniEvent});
	// console.table({...results});

	const formattedFavoriteCategories = user.favorite_categories.map(cat => formatCategory(allCategories, cat));

	const sameCategoryWeight = 0.20
	const favoriteCategoryWeight = 0.35

	const resultsWithCategory = results.map(event => (
		{
			...event,
			score: Math.round(event.score * 100) / 100,
			score_weighted: Math.round((
				sameCategoryWeight * (event.category == eventTargetFormatted.category ? 1 : 0)
				+ favoriteCategoryWeight * (formattedFavoriteCategories.includes(event.category) ? 1 : 0)
				+ (1 - sameCategoryWeight - favoriteCategoryWeight) * event.score) * 100) / 100
		}
	)).sort((a, b) => { return b.score_weighted - a.score_weighted })

	console.log("results after category:");
	console.table({ miniEvent });
	console.table({ ...resultsWithCategory });

	return resultsWithCategory
		.slice(0, count)
		.map(e => ({_id: e._id, score: e.score_weighted}))
};

const getLatestEvent = (events: Event[]) => {
	var latest = new Date(Math.max.apply(null, events.map(({ start_time }) => start_time)));
	return events.find(e => e.start_time.getTime() == latest.getTime())
}

const getHighestRatedEvent = (events: Event[]) => {
	var highRating = Math.max.apply(Math, events.map(e => e.rating));
	return getLatestEvent(events.filter(e => e.rating == highRating));
}

const formatCategory = (allCategories, category) => {
	return String.fromCharCode(allCategories.findIndex(c => c._id.toString() == category) + 'a'.charCodeAt(0))
}

const formatEvent = (event, allCategories, allSources, allZoomers) => {
	return {
		_id: event._id.toString(),
		title: event.title,
		category: formatCategory(allCategories, event.category),
		price: formatPrice(event.price),
		duration: formatDuration(diffMinutes(event.end_time, event.start_time)),
		start_time: formatStartTime(event.start_time),
		zoomer_source: event.zoomer_id ?
			String.fromCharCode(allZoomers.findIndex(z => z._id.toString() == event.zoomer_id) + 'a'.charCodeAt(0)) :
			(event.source_id ?
				String.fromCharCode(allSources.findIndex(z => z._id.toString() == event.source_id) + 'A'.charCodeAt(0)) :
				'0'),
	}
}

const diffMinutes = (dt2, dt1) => {
	const diff = ((dt2.getTime() - dt1.getTime()) / 1000) / 60;
	return Math.abs(Math.round(diff));
}

const formatPrice = (price: Number) => {
	switch (true) {
		case (price == 0):
			return ("0");
		case (price <= 10):
			return ("1");
		case (price <= 50):
			return ("2");
		case (price <= 100):
			return ("3");
		default:
			return ("4");
	}
}

const formatDuration = (minutes: Number) => {
	switch (true) {
		case (minutes <= 30):
			return ("0");
		case (minutes <= 60):
			return ("1");
		case (minutes <= 90):
			return ("2");
		default:
			return ("3");
	}
}

const formatStartTime = (startTime: Date) => {
	const hour = startTime.getHours()

	switch (true) {
		case (hour <= 5):
			return ("0");
		case (hour <= 9):
			return ("1");
		case (hour <= 12):
			return ("2");
		case (hour <= 17):
			return ("3");
		case (hour <= 20):
			return ("4");
		default:
			return ("5");
	}
}

const checkFromattings = (futureEventsFormatted, prop) => {
	let group = futureEventsFormatted.reduce((r, a) => {
		r[a[prop]] = [...r[a[prop]] || [], a];
		return r;
	}, {});

	console.log("group", group);
}

export default getRecommendedEventsIds;