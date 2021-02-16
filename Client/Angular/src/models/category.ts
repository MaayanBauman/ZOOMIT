export interface Category {
    _id: string;
    name: string;
};

export interface CategoryWithEventsCount {
    _id: string;
    name: string;
    events?: number | undefined;
    prices?: number | undefined;
};

export interface EventsCount {
    _id: string;
    count: number;
};

export interface EventsPriceSum {
    _id: string;
    value: number;
};
