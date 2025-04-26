import express from 'express';
import * as path from 'node:path';
import Routes from './routes';
import { sequelize } from './config/sequelize.database.config';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = express();
  const port = process.env.PORT || 3000;
  await sequelize.authenticate();
  await sequelize.sync({ alter: true }); // только для dev разумеется, в прод миграции и seeders
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api');
  new Routes(app);
  app.listen(port, () => {
    console.log(`listen ${port}`);
  });
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
