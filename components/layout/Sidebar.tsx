"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRole, removeToken } from "@/lib/auth";

import {
  Users,
  ClipboardList,
  Building2,
  CheckCircle,
  LogOut,
  Menu,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>("");

  const menu = [
    {
      name: "Visitors",
      href: "/dashboard/visitors",
      icon: Users,
      roles: ["Admin"],
    },
    {
      name: "Visits",
      href: "/dashboard/visits",
      icon: ClipboardList,
      roles: ["Admin"],
    },
    {
      name: "Checkins",
      href: "/dashboard/checkins",
      icon: Building2,
      roles: ["Admin", "Security"],
    },
    {
      name: "Checkout",
      href: "/dashboard/checkout",
      icon: Building2,
      roles: ["Admin", "Security"],
    },
    {
      name: "Department",
      href: "/dashboard/departments",
      icon: Building2,
      roles: ["Admin"],
    },
    {
      name: "Approval",
      href: "/dashboard/approval",
      icon: CheckCircle,
      roles: ["Admin",  "user"],
    },
  ];

  // 🔥 FIX PENTING: set role AFTER MOUNT + retry kecil
  useEffect(() => {
  const r = getRole();
  console.log("ROLE DARI TOKEN:", r); // 🔥 cek ini

  if (r) {
    setRole(r);
  } else {
    setTimeout(() => {
      const retry = getRole();
      console.log("RETRY ROLE:", retry); // 🔥 cek ini juga
      setRole(retry ?? "");
    }, 100);
  }
}, []);
  // 🔥 TIDAK BLOK UI
  const filteredMenu =
    role
      ? menu.filter((item) =>
          item.roles.some(
            (r) => r.toLowerCase() === role.toLowerCase()
          )
        )
      : menu; // sementara tampil semua dulu (biar ga blank)

  return (
    <div
      className={`h-screen sticky top-0 bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <Link href="/dashboard">
            <h1 className="font-bold text-lg">VMS SYSTEM</h1>
          </Link>
        )}

        <button onClick={() => setCollapsed(!collapsed)}>
          <Menu size={20} />
        </button>
      </div>

      {/* MENU */}
      <div className="flex-1 p-2 space-y-1">
        {filteredMenu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
            >
              <Icon size={20} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="p-3 border-t border-gray-700">
        <button
          onClick={() => {
            removeToken();
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-red-600 text-red-300"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}