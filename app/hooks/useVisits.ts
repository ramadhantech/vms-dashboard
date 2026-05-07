"use client";

import { useEffect, useMemo, useState } from "react";

import { getVisits } from "@/lib/api";
import { Visit } from "../types/visits";

export function useVisits() {
  const [data, setData] = useState<Visit[]>([]);

  // FILTER
  const [department, setDepartment] =
    useState("");

  // PAGINATION
  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getVisits();

    setData(res?.data ?? res ?? []);
  }

  // UNIQUE DEPARTMENT
  const departments = useMemo(() => {
    return [
      ...new Set(
        data
          .map((d) => d.departmentName)
          .filter(Boolean)
      ),
    ];
  }, [data]);

  // FILTERED DATA
  const filteredData = useMemo(() => {
    return data.filter((v) => {
      return department
        ? v.departmentName === department
        : true;
    });
  }, [data, department]);

  // PAGINATION
  const totalPages = Math.ceil(
    filteredData.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function changeDepartment(value: string) {
    setDepartment(value);
    setCurrentPage(1);
  }

  return {
    data,
    currentData,

    department,
    departments,
    changeDepartment,

    currentPage,
    totalPages,

    nextPage,
    prevPage,
  };
}