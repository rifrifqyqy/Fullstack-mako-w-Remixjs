export function usePagination({
  currentPage,
  totalItems,
  limit,
}: {
  currentPage: number;
  totalItems: number;
  limit: number;
}) {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    currentPage,
    totalPages,
    hasNextPage: currentPage * limit < totalItems,
    hasPrevPage: currentPage > 1,
  };
}
