import { getToken } from "@/lib/auth";
import { getRole } from "@/lib/auth";

const BASE_URL = "https://localhost:7091/api";



/* =========================
   SAFE JSON PARSER
========================= */

export async function getUsers() {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  // 🔥 handle kalau unauthorized
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Unauthorized");
  }

  return res.json();
}

export async function getUser(id: string) {
  const res = await fetch(`${BASE_URL}/user/${id}`);
  return res.json();
}

export async function createUser(data: any) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text || "Server Error");
  }
}

export async function updateUser(id: string, data: any) {
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteUser(id: string) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return true;
}

async function safeFetch(res: Response) {
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text || "Server Error");
  }
}

/* =========================
   AUTH HEADER
========================= */
function authHeader() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/* =========================
   LOGIN
========================= */
export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return safeFetch(res);
}

/* =========================
   DASHBOARD
========================= */
export async function getDashboardSummary() {
  const res = await fetch(`${BASE_URL}/dashboard/summary`);
  return safeFetch(res);
}

export async function getDailySummary() {
  const res = await fetch(`${BASE_URL}/dashboard/daily-summary`);
  return safeFetch(res);
}
/* =========================
   VISITORS
========================= */

/* GET ALL */
export async function getVisitors() {
  const res = await fetch(`${BASE_URL}/visitors`);
  return safeFetch(res);
}

export async function getVisits() {
   const role = getRole();

  // 🔥 BLOCK USER
  if (role === "user") {
    throw new Error("Forbidden: role tidak diizinkan");
  }
  const res = await fetch(`${BASE_URL}/visits`, {
    method: "GET",
    headers: authHeader(),
  });

  const json = await safeFetch(res);

  return json.data ?? json; // 🔥 AMAN (support 2 format)
}

  export async function createVisit(data: any) {

    console.log("SEND PAYLOAD:", data); // 🔥 cek ini

    const res = await fetch(`${BASE_URL}/visits`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data),
    });

    return safeFetch(res);
    
    
  }

export async function getDepartments() {
  const res = await fetch(`${BASE_URL}/department`);
  return safeFetch(res);
}

export async function createDepartment(data: any) {
  const res = await fetch(`${BASE_URL}/department`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  });

  return safeFetch(res);
}

export async function deleteDepartment(id: string) {
  const res = await fetch(`${BASE_URL}/department/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });

  return safeFetch(res);
}


export async function approveVisit(data: any) {
  const res = await fetch(`${BASE_URL}/approvals`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  });

  return safeFetch(res);
}

export async function getPendingVisits(departmentId?: string) {
  const role = getRole();

  const token = getToken();

  let url = `${BASE_URL}/approvals/pending`;

  if (role !== "Admin") {
    if (!departmentId) throw new Error("departmentId kosong");

    url = `${BASE_URL}/approvals/pending/${departmentId}`;
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function getCheckIns() {
  const res = await fetch(`${BASE_URL}/checkins`, {
    headers: authHeader(),
  });

  return safeFetch(res);
}

export async function getCheckedInVisits() {
  const res = await fetch(`${BASE_URL}/visits`, {
    method: "GET",
    headers: authHeader(),
  });

  const json = await safeFetch(res);

  const data = json.data ?? json;

  return data.filter((v: any) => v.status === "CheckedIn");
}

export async function createCheckIn(data: {
  visitId: string;
  gate?: string;
}) {
  const res = await fetch(`${BASE_URL}/checkins`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  });

  return safeFetch(res);
}

export async function scanQRCheckIn(data: {
  visitId: string;
  gate?: string;
}) {
  const res = await fetch(`${BASE_URL}/checkins/scan`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  });

  return safeFetch(res);
}

export async function createCheckOut(data: {
  visitId: string;
  gate?: string;
}) {
  const res = await fetch(`${BASE_URL}/checkouts`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  });

  return safeFetch(res);
}



/* GET BY ID */
export async function getVisitor(id: string) {
  const res = await fetch(`${BASE_URL}/visitors/${id}`);
  return safeFetch(res);
}

/* CREATE */
export async function createVisitor(data: any) {
  const res = await fetch(`${BASE_URL}/visitors`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  });

  return safeFetch(res);
}

/* UPDATE */
export async function updateVisitor(id: string, data: any) {
  const res = await fetch(`${BASE_URL}/visitors/${id}`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(data),
  });

  return safeFetch(res);
}

/* DELETE */
export async function deleteVisitor(id: string) {
  const res = await fetch(`${BASE_URL}/visitors/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return true;
}