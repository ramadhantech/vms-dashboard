"use client";

import { useEffect, useState } from "react";
import { createUser, getDepartments } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AddUser() {
  const router = useRouter();

  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    passwordHash: "",
    role: "Security",
    departmentId: "",
  });

  // ================= LOAD DEPARTMENT =================
  useEffect(() => {
    async function load() {
      const res = await getDepartments();
      setDepartments(res);
    }

    load();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function submit() {
    if (!form.departmentId) {
      alert("Department wajib dipilih");
      return;
    }

    setLoading(true);

    try {
      await createUser(form);
      router.push("/dashboard/users");
    } catch (err) {
      console.error(err);
      alert("Gagal create user");
    }

    setLoading(false);
  }

  return (
    <div className="p-6 max-w-md mx-auto">

      <h1 className="text-xl font-bold mb-4">
        Add User
      </h1>

      {/* NAME */}
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      {/* EMAIL */}
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      {/* PASSWORD */}
      <input
        name="passwordHash"
        placeholder="Password"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      {/* ROLE */}
      <select
        name="role"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      >
        <option value="Admin">Admin</option>
        <option value="Security">Security</option>
        <option value="User">User</option>
      </select>

      {/* DEPARTMENT SELECT 🔥 */}
      <select
        name="departmentId"
        value={form.departmentId}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      >
        <option value="">-- Select Department --</option>

        {departments.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      {/* BUTTON */}
      <button
        onClick={submit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        {loading ? "Saving..." : "Save User"}
      </button>

    </div>
  );
}