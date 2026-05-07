"use client";

import { useEffect, useState } from "react";
import {
  getDepartments,
  createDepartment,
  deleteDepartment,
} from "@/lib/api";

export default function DepartmentPage() {
  const [data, setData] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getDepartments();
    setData(res);
  }

  async function handleAdd() {
    if (!name) return;

    await createDepartment({
      name,
    });

    setName("");
    load();
  }

  async function handleDelete(id: string) {
    await deleteDepartment(id);
    load();
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">
        Department
      </h1>

      {/* ADD FORM */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-2">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department name..."
          className="flex-1 border p-2 rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Add
        </button>

      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        {data.length === 0 ? (
          <p className="p-6 text-center text-gray-400">
            No departments found
          </p>
        ) : (
          data.map((d: any) => (
            <div
              key={d.id}
              className="flex justify-between items-center p-4 border-b hover:bg-gray-50"
            >

              {/* NAME */}
              <div className="font-medium text-gray-800">
                {d.name}
              </div>

              {/* ACTION */}
              <button
                onClick={() => handleDelete(d.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}