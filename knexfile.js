require('dotenv-safe').load();

var config = {
    // debug: process.env.NODE_ENV === 'development',
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        charset  : 'utf8',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    },
    pool: {
        min: 1,
        max: 5
    },
    migrations: {
        tableName: '_migrations',
        directory: 'database/migrations'
    },
    seeds: {
        directory: 'database/seeds'
    }
};

module.exports = {
    development: config,
    staging: config,
    production: config
};
