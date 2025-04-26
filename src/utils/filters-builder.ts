import { FilterDto } from '../dto/filter.dto';

export function filterBuilderFromSQL(dto: FilterDto) {
  const where: string[] = [];
  const having: string[] = [];
  const replacements: Record<string, any> = {};

  if (dto.date) {
    const splitStringDate = dto.date.split(',').map((s) => s.trim());
    if (splitStringDate.length === 1) {
      where.push(`l.date = :date`);
      replacements.date = splitStringDate[0];
    } else {
      where.push(`l.date BETWEEN :dateFrom AND :dateTo`);
      replacements.dateFrom = splitStringDate[0];
      replacements.dateTo = splitStringDate[1];
    }
  }

  if (dto.status) {
    where.push(`l.status = :status`);
    replacements.status = dto.status;
  }

  if (dto.teacherIds) {
    const ids = dto.teacherIds.split(',').map((id) => +id.trim());
    where.push(`lt.teacher_id IN (:teacherIds)`);
    replacements.teacherIds = ids;
  }

  if (dto.studentsCount) {
    const splitStudentString = dto.studentsCount
      .split(',')
      .map((s) => +s.trim());
    if (splitStudentString.length === 1) {
      having.push(`COUNT(ls.student_id) = :studentsCount`);
      replacements.studentsCount = splitStudentString[0];
    } else {
      having.push(
        `COUNT(ls.student_id) BETWEEN :studentsCountFrom AND :studentsCountTo`,
      );
      replacements.studentsCountFrom = splitStudentString[0];
      replacements.studentsCountTo = splitStudentString[1];
    }
  }

  return { where, having, replacements };
}
