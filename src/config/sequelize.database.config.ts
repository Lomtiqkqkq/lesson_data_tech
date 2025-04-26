import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    models: [join(__dirname, '..', 'models')],
    pool: { max: 20, min: 2 },
    logging: console.log,
  },
);
