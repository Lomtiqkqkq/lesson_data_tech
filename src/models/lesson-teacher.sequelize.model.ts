import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { LessonSequelizeModel } from './lesson.sequelize.model';
import { TeacherSequelizeModel } from './teacher.sequelize.model';

@Table({
  tableName: 'lesson_teachers',
  timestamps: false,
})
export class LessonTeacherSequelizeModel extends Model<LessonTeacherSequelizeModel> {
  @ForeignKey(() => LessonSequelizeModel)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  lesson_id!: number;

  @ForeignKey(() => TeacherSequelizeModel)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  teacher_id!: number;

  @BelongsTo(() => LessonSequelizeModel)
  lesson!: LessonSequelizeModel;

  @BelongsTo(() => TeacherSequelizeModel)
  teacher!: TeacherSequelizeModel;
}
