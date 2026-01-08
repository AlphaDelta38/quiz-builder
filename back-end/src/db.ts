import { Sequelize } from 'sequelize';
import 'dotenv/config';

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDriver = 'postgres';
const dbPassword = process.env.DB_PASSWORD;

if (!dbName || !dbUser) {
  throw new Error('Provide DB_NAME and DB_USER in .env file');
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging: false,
});

export default sequelize;
