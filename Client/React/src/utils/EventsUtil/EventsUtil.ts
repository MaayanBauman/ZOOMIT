export const convertEvent = (event: any)=> {
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
        price: isNaN(event.price?.$numberDecimal) ? +event.price: +event.price?.$numberDecimal,
        source_id: event.source_id
    }
};