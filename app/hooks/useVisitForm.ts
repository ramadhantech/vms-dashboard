"use client";

import { useEffect, useState } from "react";
import { createVisit, getDepartments, getVisitors,} from "@/lib/api";

export function useVisitForm() {

  const [visitors, setVisitors] = useState<any[]>([]);

  const [departments, setDepartments] =
    useState<any[]>([]);

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

  async function submit() {
    await createVisit({
      visitorId: form.visitorId,
      departmentId: form.departmentId,
      purpose: form.purpose,
      hostName: form.hostName,
      location: form.location,
      scheduledDate: new Date(
        form.scheduledDate
      ),
    });
  }

  return {
    visitors,
    departments,

    form,
    handleChange,

    submit,
  };
}