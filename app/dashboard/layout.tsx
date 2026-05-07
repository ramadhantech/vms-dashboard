"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex min-h-screen">

  {/* SIDEBAR */}
  <Sidebar />

  {/* CONTENT AREA */}
  <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

    <Topbar />

    {/* CONTENT SCROLL AREA */}
    <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
      {children}
    </main>

  </div>

</div>
  );
}