

module.exports = ({ env }) => ({
    connection: {
        client: 'mysql',
        connection: {
            fconnectionString: env('DATABASE_URL'),
            host: env('DATABASE_HOST', '192.168.50.10'),
            port: env.int('DATABASE_PORT', 3306),
            database: env('DATABASE_NAME', 'strapi_grigoprint'),
            user: env('DATABASE_USERNAME', 'strapi'),
            // password: env('DATABASE_PASSWORD', 'strapi'),
        },
        useNullAsDefault: true,
        debug: false
    },
});