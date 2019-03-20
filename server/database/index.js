const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});
const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users(
              id SERIAL PRIMARY KEY,
              firstName VARCHAR(30) NOT NULL,
              lastName VARCHAR(15) NOT NULL,
              email VARCHAR(50) NOT NULL,
              password VARCHAR(200),
              role VARCHAR(15),
              createdOn timestamp NOT NULL DEFAULT now(),
              updatedAt timestamp NOT NULL DEFAULT now(),
              UNIQUE(email)
          )`;
  const createMessages = `CREATE TABLE IF NOT EXISTS messages(
              id SERIAL PRIMARY KEY,
              subject VARCHAR(75) NOT NULL,
              receiverUserId INTEGER  REFERENCES users(id) ,
              message VARCHAR(255) NOT NULL,
              receiverGroupId  INTEGER  REFERENCES groups(id),
              parentMessageId INTEGER,
              sender INTEGER NOT NULL REFERENCES users(id),
              status VARCHAR(20) NOT NULL,
              createdOn timestamp NOT NULL DEFAULT now(),
              updatedOn timestamp NOT NULL DEFAULT now()
          )`;
  const createGroups = `CREATE TABLE IF NOT EXISTS groups(
              id SERIAL PRIMARY KEY,
              groupName VARCHAR(75) NOT NULL,
              groupOwner INTEGER NOT NULL REFERENCES users(id),
              createdOn timestamp NOT NULL DEFAULT now(),
              updatedOn timestamp NOT NULL DEFAULT now(),
              UNIQUE(id)
        )`;
  const createMembers = `CREATE TABLE IF NOT EXISTS members(
              id SERIAL PRIMARY KEY,
              groupId  INTEGER NOT NULL REFERENCES groups(id),
              groupOwner INTEGER NOT NULL REFERENCES users(id),
              role VARCHAR(15)NOT NULL,
              createdOn timestamp NOT NULL DEFAULT now(),
              updatedOn timestamp NOT NULL DEFAULT now()
        )`;

  pool
    .query(`${queryText}; ${createMessages}; ${createGroups}; ${createMembers}`)
    .then(res => {
      console.log(res);
      pool.end();
      console.log('created');
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

module.exports = {
  createTables
};

createTables();
