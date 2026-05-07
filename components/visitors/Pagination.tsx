// src/components/visitors/Pagination.tsx

type Props = {
  page: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
};

export default function Pagination({
  page,
  totalPages,
  nextPage,
  prevPage,
}: Props) {
  return (
    <div className="flex items-center justify-between p-4 border-t">

      <button
        onClick={prevPage}
        disabled={page === 1}
        className="px-3 py-1 text-sm border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <div className="text-sm text-gray-600">
        Page {page} of {totalPages || 1}
      </div>

      <button
        onClick={nextPage}
        disabled={page === totalPages || totalPages === 0}
        className="px-3 py-1 text-sm border rounded disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}