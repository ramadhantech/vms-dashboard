"use client";

import { useState } from "react";
import { getRole, getToken, getUserName, removeToken } from "@/lib/auth";
import { User, LogOut, ChevronDown } from "lucide-react";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const name = getUserName();
  const role = getRole();

  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">

      {/* LEFT */}
      <h1 className="font-bold text-gray-700">
        Visitor Management System
      </h1>

      {/* RIGHT USER MENU */}
      <div className="relative">

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <User size={18} />
          <span className="text-sm">{name}</span>
          <ChevronDown size={16} />
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border">

            <div className="p-3 border-b text-sm text-gray-500">
              Logged in as <b>{name}</b>
            </div>

            <button
              onClick={() => {
                removeToken();
                window.location.href = "/login";
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-red-50 text-red-600"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>
        )}
      </div>
    </div>
  );
}