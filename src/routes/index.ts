import { Application } from 'express';
import lessonRoutes from './lessons.routes';

export default class Routes {
  constructor(app: Application) {
    app.use('/', lessonRoutes);
  }
}
