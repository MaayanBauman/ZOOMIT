export interface Category {
    _id: string;
    name: string;
};

export interface CategoryWithEventsCount {
    _id: string;
    name: string;
    events: number | undefined;
};

export interface EventsCount {
    _id: string;
    count: number;
};

