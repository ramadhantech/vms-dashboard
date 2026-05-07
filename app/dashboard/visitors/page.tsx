// src/app/visitors/page.tsx

"use client";

import { useState } from "react";

import VisitorTable from "@/components/visitors/VisitorTable";
import Pagination from "@/components/visitors/Pagination";
import PhotoModal from "@/components/visitors/PhotoModal";
import { useVisitors } from "@/app/hooks/useVisitors";

export default function VisitorsPage() {
  const { data, handleDelete } = useVisitors();

  const [selectedPhoto, setSelectedPhoto] =
    useState<string | null>(null);

  const [page, setPage] = useState(1);

  const pageSize = 10;

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  function nextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-100">

      {/* HEADER */}
      <div className="p-4 border-b flex justify-between items-center">

        <h2 className="font-semibold text-gray-700">
          Visitor List
        </h2>

        <a
          href="/dashboard/visitors/add"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          + Add Visitor
        </a>

      </div>

      <VisitorTable
        data={paginatedData}
        onDelete={handleDelete}
        onPhotoClick={setSelectedPhoto}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />

      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

    </div>
  );
}