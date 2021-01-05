interface Event {
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

export default Event;
