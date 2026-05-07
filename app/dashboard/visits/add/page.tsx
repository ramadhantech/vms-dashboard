"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createVisit, getVisitors, getDepartments } from "@/lib/api";

export default function AddVisitPage() {
  const router = useRouter();

  const [visitors, setVisitors] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  const [form, setForm] = useState({
    visitorId: "",
    departmentId: "",
    purpose: "",
    hostName: "",
    location: "",
    scheduledDate: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [v, d] = await Promise.all([
      getVisitors(),
      getDepartments(),
    ]);

    setVisitors(v);
    setDepartments(d);
  }

  function handleChange(e: any) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    await createVisit({
      visitorId: form.visitorId,
      departmentId: form.departmentId,
      purpose: form.purpose,
      hostName: form.hostName,
      location: form.location,
      scheduledDate: new Date(form.scheduledDate),
    });

    router.push("/visits");
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

      <h1 className="text-xl font-bold mb-4">Add Visit</h1>

      {/* VISITOR DROPDOWN */}
      <select
        name="visitorId"
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      >
        <option value="">Select Visitor</option>
        {visitors.map((v: any) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>

      {/* DEPARTMENT DROPDOWN */}
      <select
        name="departmentId"
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      >
        <option value="">Select Department</option>
        {departments.map((d: any) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <input
        name="purpose"
        placeholder="Purpose"
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        name="hostName"
        placeholder="Host Name"
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        type="datetime-local"
        name="scheduledDate"
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Save Visit
      </button>

    </div>
  );
}