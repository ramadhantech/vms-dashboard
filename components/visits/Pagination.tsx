type Props = {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
};


export default function Pagination({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}: Props) {

    
  return (
    <div className="p-4 flex justify-center items-center gap-3 border-t">

      <button
        disabled={currentPage === 1}
        onClick={prevPage}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-sm">
        Page {currentPage} of {totalPages || 1}
      </span>

      <button
        disabled={
          currentPage === totalPages ||
          totalPages === 0
        }
        onClick={nextPage}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}