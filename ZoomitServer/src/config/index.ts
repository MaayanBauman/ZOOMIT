export default {
    port: 3001,
    mongoConfig: {
        connectionString: 'mongodb://localhost:27017',
        dbName: 'zoomit'
    },
    collections: {
        categories: {
            name: "categories"
        },
        events: {
            name: "events"
        },
        users: {
            name: "users"
        },
        sources: {
            name: "sources"
        }
    }
};