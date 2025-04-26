import express from 'express';
import * as path from 'node:path';
import Routes from './routes';

async function bootstrap() {
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api');
  app.use(express.static(path.join(__dirname, 'public')));
  new Routes(app);
  app.listen(port, () => {
    console.log(`listen ${port}`);
  });
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
