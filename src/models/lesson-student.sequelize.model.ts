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
import { StudentSequelizeModel } from './student.sequelize.model';

@Table({
  tableName: 'lesson_student',
  timestamps: false,
})
export class LessonStudentSequelizeModel extends Model<LessonStudentSequelizeModel> {
  @ForeignKey(() => LessonSequelizeModel)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  lesson_id!: number;

  @ForeignKey(() => StudentSequelizeModel)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  student_id!: number;

  @BelongsTo(() => LessonSequelizeModel)
  lesson!: LessonSequelizeModel;

  @BelongsTo(() => StudentSequelizeModel)
  student!: StudentSequelizeModel;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  visit: boolean;
}
