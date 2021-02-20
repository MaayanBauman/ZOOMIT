export interface Event {
    id: string;
    title: string;
    description: string;
    zoomer_id: string;
    zoom_link: string;
    password: string;
    start_time: Date;
    end_time: Date;
    max_registers: number;
    registered_users: string[];
    category: string;
    price: number;
    source_id: string;
};

export interface zoomerDetailesEvent {
    _id: string;
    full_name: string;
    photograph: string;
    zoomer_is_active: boolean;
}

export interface sourceDetailesEvent {
    _id: string;
    name: string;
    url: string;
    photograph: string;
}

export interface FullEvent {
    id: string;
    title: string;
    description: string;
    zoomer_id: string;
    zoom_link: string;
    password: string;
    start_time: Date;
    end_time: Date;
    max_registers: number;
    registered_users: string[];
    category: string;
    price: number;
    source_id: string;
    source_detailes: sourceDetailesEvent;
    zoomer_detailes: zoomerDetailesEvent;
};

export default Event;
