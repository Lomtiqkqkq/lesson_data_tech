import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { LessonSequelizeModel } from './lesson.sequelize.model';

@Table({ tableName: 'teachers' })
export class TeacherSequelizeModel extends Model<TeacherSequelizeModel> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  name!: string;

  @HasMany(() => LessonSequelizeModel)
  lessons!: LessonSequelizeModel[];
}
