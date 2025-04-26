import { FilterDto } from '../dto/filter.dto';
import { filterBuilderFromSQL } from '../utils/filters-builder';
import { QueryTypes, Sequelize } from 'sequelize';
import { paginationFromSQL } from '../utils/pagination';
import { Request, Response } from 'express';
// TODO в сервис решил не выносить, так как логики мало
export class LessonsController {
  constructor(private db: Sequelize) {}
  async getLessons(req: Request, res: Response) {
    const filter = req.body as FilterDto;
    const { where, replacements, having } = filterBuilderFromSQL(filter);
    let sql = `
    SELECT
     l.*
     COUNT(ls.student_id) AS "studentsCount"
    FROM lessons AS l
    LEFT JOIN lesson_teachers lt ON lt.lesson_id = l.id
    LEFT JOIN lesson_students ls ON ls.lesson_id = l.id
    ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
    GROUP BY l.id
    ${having.length ? 'HAVING ' + having.join(' AND ') : ''}
    ORDER BY l.date DESC
    `;
    const page = filter.page ?? 1;
    const perPage = filter.lessonsPerPage ?? 5;
    const pagination = paginationFromSQL(sql, page, perPage);
    sql = pagination.sql;
    Object.assign(replacements, pagination.replacements);
    const lessons = await this.db.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });
    if (lessons.length) {
      res.status(200).json(lessons);
    } else {
      res.status(404).json({ message: 'Not Found' }); // здесь должны быть универсальные errorsHandler, но их нет, так как нет больше контроллеров
    }
  }
}
