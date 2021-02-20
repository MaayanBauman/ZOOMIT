export interface Event {
    _id: string;
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
}

export interface ExtendedEvent {
    _id: string;
    title: string;
    description: string;
    zoom_link: string;
    password: string;
    start_time: Date;
    end_time: Date;
    max_registers: number;
    registered_number: number;
    category_name: string | undefined;
    price: number;
    author_name: string | undefined;
    author_is_active: boolean;
}