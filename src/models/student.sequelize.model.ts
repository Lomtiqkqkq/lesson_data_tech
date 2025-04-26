import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { LessonSequelizeModel } from './lesson.sequelize.model';

@Table({ tableName: 'students', timestamps: false })
export class StudentSequelizeModel extends Model<StudentSequelizeModel> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  name!: string;

  @ForeignKey(() => LessonSequelizeModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  lessonId!: number;

  @BelongsTo(() => LessonSequelizeModel)
  lesson!: LessonSequelizeModel;
}
