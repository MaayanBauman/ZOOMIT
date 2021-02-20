export const convertEvent = (event: any) => {
    return {
        id: event._id,
        title: event.title,
        description: event.description,
        zoomer_id: event.zoomer_id,
        zoom_link: event.zoom_link,
        password: event.password,
        start_time: new Date(event.start_time),
        end_time: new Date(event.end_time),
        max_registers: event.max_registers,
        registered_users: event.registered_users || [],
        category: event.category,
        price: isNaN(event.price?.$numberDecimal) ? +event.price : +event.price?.$numberDecimal,
        source_id: event.source_id
    }
};

export const convertFullEvent = (event: any) => {
    return {
        id: event._id,
        title: event.title,
        description: event.description,
        zoomer_id: event.zoomer_id,
        zoom_link: event.zoom_link,
        password: event.password,
        start_time: new Date(event.start_time),
        end_time: new Date(event.end_time),
        max_registers: event.max_registers,
        registered_users: event.registered_users || [],
        category: event.category,
        price: isNaN(event.price?.$numberDecimal) ? +event.price : +event.price?.$numberDecimal,
        source_id: event.source_id,
        source_detailes: {
            _id: event.source_detailes[0]?._id,
            name: event.source_detailes[0]?.name,
            url: event.source_detailes[0]?.url,
            photograph: event.source_detailes[0]?.photograph
        },
        zoomer_detailes: {
            _id: event.zoomer_detailes[0]?._id,
            full_name: event.zoomer_detailes[0]?.full_name,
            photograph: event.zoomer_detailes[0]?.photograph,
            zoomer_is_active: event.zoomer_detailes[0]?.user_type === 'zoomer',
        },
    }
};