export function paginationFromSQL(
  sqlRequest: string,
  page = 1,
  perPage = 5,
): { sql: string; replacements: Record<string, any> } {
  const offset = (page - 1) * perPage;
  const paginated = `${sqlRequest} LIMIT :limit OFFSET :offset`;
  return {
    sql: paginated,
    replacements: { limit: perPage, offset },
  };
}
