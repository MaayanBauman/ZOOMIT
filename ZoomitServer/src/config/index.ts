export default {
    port: 3001,
    mongoConfig: {
        connectionString: 'mongodb+srv://admin:a123456@cluster0.cn1mp.mongodb.net/zoomit?retryWrites=true&w=majority',
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