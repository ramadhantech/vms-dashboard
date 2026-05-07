// src/hooks/useVisitors.ts

"use client";

import { useEffect, useState } from "react";
import { getVisitors, deleteVisitor } from "@/lib/api";
import { Visitor } from "../types/visitor";

export function useVisitors() {
  const [data, setData] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await getVisitors();
      const result = res.data ?? res;
      setData(result);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      "Yakin mau hapus visitor ini?"
    );

    if (!confirmDelete) return;

    await deleteVisitor(id);

    setData((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  return {
    data,
    loading,
    handleDelete,
  };
}