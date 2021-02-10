require('dotenv').config();

export default {
    port: process.env.PORT,
    websocketPort: process.env.WEBSOCKET_PORT,
    clientReactUrl: process.env.REACT_APP_CLIENT_URL,
    clientAngolarUrl: process.env.ANGULAR_APP_CLIENT_URL,
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
        },
    }
};