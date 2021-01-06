require('dotenv').config();

export default {
    port: process.env.PORT,
    mongoConfig: {
        connectionString: process.env.CONNECTION_STRING,
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