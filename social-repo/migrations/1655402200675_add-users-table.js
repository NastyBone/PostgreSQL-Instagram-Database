/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        bio VARCHAR(400) DEFAULT '',
        username VARCHAR(20) NOT NULL
    )`)
};

exports.down = pgm => {
    pgm.sql(`
    DROP TABLE users`)
};
