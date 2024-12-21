type PaginationProps = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  baseUrl: string; 
};

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  baseUrl,
}: PaginationProps) {
  return (
    <div className="pagination mt-6 flex justify-center gap-4">
      {hasPrevPage && (
        <a href={`${baseUrl}?page=${currentPage - 1}`} className="btn">
          Previous
        </a>
      )}

      {/* Pagination Index */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <a
            key={pageNumber}
            href={`${baseUrl}?page=${pageNumber}`}
            className={`btn px-4 py-2 ${
              pageNumber === currentPage ? "active" : ""
            }`}
          >
            {pageNumber}
          </a>
        ),
      )}

      {hasNextPage && (
        <a href={`${baseUrl}?page=${currentPage + 1}`} className="btn">
          Next
        </a>
      )}
    </div>
  );
}
