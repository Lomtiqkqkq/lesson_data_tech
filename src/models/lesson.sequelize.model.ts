import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { TeacherSequelizeModel } from './teacher.sequelize.model';
import { StudentSequelizeModel } from './student.sequelize.model';
import { LessonTeacherSequelizeModel } from './lesson-teacher.sequelize.model';
enum StatusEnum {
  'не проведено',
  'проведено',
}
@Table({ tableName: 'lessons', timestamps: false })
export class LessonSequelizeModel extends Model<LessonSequelizeModel> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.DATE, allowNull: false })
  date!: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: StatusEnum['не проведено'],
  })
  status!: StatusEnum;

  @HasMany(() => LessonTeacherSequelizeModel)
  lessonTeachers!: LessonTeacherSequelizeModel[];

  @HasMany(() => TeacherSequelizeModel, {
    foreignKey: 'lesson_id',
    sourceKey: 'id',
  })
  teachers!: TeacherSequelizeModel[];

  @HasMany(() => StudentSequelizeModel)
  students!: StudentSequelizeModel[];
}
