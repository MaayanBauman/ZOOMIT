//@ts-nocheck
import { Request, Response } from 'express';
import { IOperationBuilder } from './operations/types'
import operationBuilder from './operations';
import { IUser } from '../models/types/user';
import {
    addUserToEvent,
    getEventsById,
    removeUserFromEvent,
    getEventsByIdJoinedAndSorted,
    getEventById
} from './events';
import config from '../config';
import sendEmail from '../repositories/sendEmail';
import getRecommendedEventsIds from '../RecommenderAlgo/algo';

const collectionName = config.collections.users.name;
const usersOperationBuilder: IOperationBuilder<IUser> = operationBuilder<IUser>();

export const getAllUsers = () =>
    usersOperationBuilder.getAllObjects(collectionName);

export const getUserById = (id: string) =>
    usersOperationBuilder.getObjectById(collectionName, id);

export const getUsersByType = (type: string) =>
    usersOperationBuilder.getObjectsBySubsetFiled(collectionName, 'user_type', [type]);

export const getUsersByEmail = (email: string) =>
    usersOperationBuilder.getObjectsBySubsetFiled(collectionName, 'email', [email]);

export const getUserEvents = async (id: string) => {
    const user = await getUserById(id);
    const userEventsIds = user.registerd_events.map(registerd_event => registerd_event.eventId);
    return getEventsById(userEventsIds);
}

export const getUserEventsJoined = async (id: string) => {
    const user = await getUserById(id);
    const userEventsIds = user.registerd_events.map(registerd_event => registerd_event.eventId);
    const sortedBy = 'start_time';

    return getEventsByIdJoinedAndSorted(userEventsIds, sortedBy);
}

export const getZoomerEvents = async (id: string) => {
    const user = await getUserById(id);
    return getEventsById(user.owned_events);
}

export const getZoomerRequesters = () => {
    return usersOperationBuilder.getObjectsBySubsetFiled(collectionName, 'is_waiting_for_approval', [true]);
}

export const getUserRecommendedEvents = async (id: string, count: Number) => {
    const userRecommendedEventsIds = await getRecommendedEventsIds(id, count);
    const userRecommendedEvents = await getEventsById(userRecommendedEventsIds.map(e => e._id));
    return userRecommendedEvents
        .map(event => {
            // Add user's rating to event
            const index = userRecommendedEventsIds.findIndex(e => e["_id"] == event._id);
            // const rating = user.registerd_events[index].rating;
            return { ...event, score: userRecommendedEventsIds[index].score };
        }).sort((a, b) => { return b.score - a.score });
}

export const addUser = (newSource: IUser) =>
    usersOperationBuilder.createObject(collectionName, newSource);

export const addEventToUser = (id: string, eventid: string) =>
    Promise.all([
        addUserToEvent(eventid, id),
        usersOperationBuilder.addUniqueValuesToArray(collectionName, id, 'registerd_events', [{ eventId: eventid, rating: 0 }])
    ]).then(async () => {
        const user = await getUserById(id);
        const fullEvent = await getEventById(eventid);
        sendEmail(user, fullEvent);
    });

//TODO!!!
export const removeEventFromUser = (id: string, eventId: string) =>
    Promise.all([
        removeUserFromEvent(eventId, id),
        usersOperationBuilder.deleteValueFromArray(collectionName, id, 'registerd_events', { eventId })
    ]);

export const addEventToZoomer = (id: string, event: string) =>
    Promise.all([
        usersOperationBuilder.addUniqueValuesToArray(collectionName, id, 'owned_events', [event])
    ]);

export const deleteEventFromZoomer = (id: string, event: string) =>
    Promise.all([
        removeUserFromEvent(event, id),
        usersOperationBuilder.deleteValuesFromArray(collectionName, id, 'owned_events', [event])
    ]);

export const updateUser = (id: string, sourceToUpdate: IUser) =>
    usersOperationBuilder.updateObject(collectionName, id, sourceToUpdate);

export const updateEventFromUser = (id: string, eventIndex: number, eventId: string, rating: number) =>
    usersOperationBuilder.updateValueOnArrayByIndex(collectionName, id, `registerd_events.${eventIndex}`, { eventId, rating })

export const deleteUser = (id: string) =>
    usersOperationBuilder.deleteObject(collectionName, id);