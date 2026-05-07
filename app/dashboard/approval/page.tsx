"use client";

import { useEffect, useState } from "react";
import { getPendingVisits, approveVisit } from "@/lib/api";
import { getDepartmentId, getRole } from "@/lib/auth";

export default function ApprovalPage() {
  const [data, setData] = useState<any[]>([]);

  const role = getRole();
  const departmentId = getDepartmentId();

  // 👉 filter (STATUS ONLY)
  const [filterStatus, setFilterStatus] = useState("Pending");

  // 👉 pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      let res;

      if (role === "Admin") {
        res = await getPendingVisits();
      } else {
        if (!departmentId) return;
        res = await getPendingVisits(departmentId);
      }

      const list = res?.data ?? res;
      setData(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error(err);
      setData([]);
    }
  }

  async function handleAction(id: string, status: string) {
    try {
      await approveVisit({
        visitId: id,
        status,
        notes: "",
      });

      load();
    } catch (err) {
      console.error("approve error:", err);
    }
  }

  // 👉 FILTER STATUS ONLY
  const filteredData = data.filter((v: any) => {
    return filterStatus ? v.status === filterStatus : true;
  });

  // 👉 pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">
        Approval Dashboard ({role})
      </h1>

      {/* FILTER STATUS */}
      <div className="mb-4 flex gap-3 flex-wrap">

        <select
          className="border px-3 py-2 rounded-lg text-sm bg-white"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>

      {/* LIST */}
      {currentData.length === 0 ? (
        <div className="text-gray-400">No data found</div>
      ) : (
        <div className="space-y-3">

          {currentData.map((v: any) => (
            <div
              key={v.id}
              className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-yellow-400 flex justify-between items-center hover:shadow-md transition"
            >

              {/* LEFT INFO */}
              <div>
                <p className="font-semibold text-gray-800">
                  {v.purpose}
                </p>

                <p className="text-sm text-gray-500">
                  {v.hostName} • {v.location}
                </p>

                <p className="text-xs text-gray-400">
                  {v.departmentName} •{" "}
                  {new Date(v.createdAt ?? v.scheduledDate).toLocaleDateString()}
                </p>
              </div>

              {/* ACTION */}
              <div className="flex gap-2">

                <button
                  onClick={() => handleAction(v.id, "Approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleAction(v.id, "Rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                >
                  Reject
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* PAGINATION */}
      <div className="mt-6 flex justify-center items-center gap-3">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 bg-white"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 bg-white"
        >
          Next
        </button>

      </div>

    </div>
  );
}