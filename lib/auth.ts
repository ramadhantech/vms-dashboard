import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "vms_token";

/* =========================
   TOKEN
========================= */
export function setToken(token: string) {
  Cookies.set(TOKEN_KEY, token);
}

export function getToken() {
  return Cookies.get(TOKEN_KEY) || null;
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
}

/* =========================
   JWT PAYLOAD TYPE
========================= */
type JwtPayload = {
  role?: string;
  departmentId?: string;
  name?: string;
  exp?: number;
};

/* =========================
   DECODE SAFE
========================= */
function decodeToken(): JwtPayload | null {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
}

/* =========================
   ROLE
========================= */
export function getRole() {
  const token = getToken();
  console.log("TOKEN:", token); // 🔥 tambah ini

  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  console.log("PAYLOAD:", payload); // 🔥 tambah ini

  return (
    payload?.role ||
    payload?.Role ||
    payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  )?.toLowerCase() ?? null;
}

export function getUserName() {
  const token = getToken();
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));

  return (
    payload?.name ||
    payload?.Name ||
    payload?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
  ) ?? "User";
}

/* =========================
   DEPARTMENT ID
========================= */
export function getDepartmentId() {
  const payload = decodeToken();
  return payload?.departmentId ?? null;
}

/* =========================
   ROLE REDIRECT
========================= */
export function redirectByRole(role: string) {
  switch (role) {
    case "Admin":
      return "/dashboard";

    case "Security":
      return "/dashboard/checkin";

    default:
      return "/register";
  }
}