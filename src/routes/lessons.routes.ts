import { LessonsController } from '../controllers/lessons.controller';
import { Sequelize } from 'sequelize';
import { Request, Response, Router } from 'express';
import sequelize from '../config/sequelize.database.config';

export class LessonsRoutes {
  controller = new LessonsController(sequelize);
  router = Router();
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.get('/lessons', (req: Request, res: Response) =>
      this.controller.getLessons(req, res),
    );
  }
}
export default new LessonsRoutes().router;
