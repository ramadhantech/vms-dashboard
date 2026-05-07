"use client";

import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "@/lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getUsers();
    setUsers(res);
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus user ini?")) return;

    await deleteUser(id);
    load();
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">User Management</h1>

        <a
          href="users/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add User
        </a>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>DepartmentId</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td className="text-xs text-gray-500">
                  {u.departmentId ?? "-"}
                </td>

                <td className="text-center space-x-2">
                  <a
                    href={`/users/edit/${u.id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </a>

                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}