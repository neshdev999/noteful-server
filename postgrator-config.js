const pg = require('pg');
pg.defaults.ssl = process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false;

require('dotenv').config();

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "connectionString": process.env.DATABASE_URL,
}