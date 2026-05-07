"use client";

import { useEffect, useRef, useState } from "react";
import { createCheckIn } from "@/lib/api";
import { Html5Qrcode } from "html5-qrcode";

type State = "idle" | "scanning" | "success" | "error";

export default function CheckInPage() {
  const [state, setState] = useState<State>("idle");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isRunningRef = useRef(false);

  // =========================
  // START SCANNER
  // =========================
  const startScanner = () => {
    if (isRunningRef.current) return;

    setError(null);
    setResult(null);
    setState("scanning");
  };

  // =========================
  // INIT SCANNER
  // =========================
  useEffect(() => {
    if (state !== "scanning") return;

    const initScanner = async () => {
      try {
        isRunningRef.current = true;

        const scanner = new Html5Qrcode("reader");
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
         async (decodedText) => {
  const id = decodedText.includes("id=")
    ? decodedText.split("id=")[1]
    : decodedText;

  await handleCheckIn(id);
},
          () => {}
        );
      } catch (err) {
        console.error("Scanner error:", err);
        setError("Camera tidak bisa diakses");
        setState("error");
        isRunningRef.current = false;
      }
    };

    initScanner();
  }, [state]);

  // =========================
  // STOP SCANNER
  // =========================
  const stopScanner = async () => {
    const scanner = scannerRef.current;

    if (scanner) {
      try {
        await scanner.stop();
        await scanner.clear();
      } catch (err) {
        console.warn(err);
      }
    }

    scannerRef.current = null;
    isRunningRef.current = false;
    setState("idle");
  };

  // =========================
  // CHECK IN
  // =========================
  const handleCheckIn = async (id: string) => {
    setLoading(true);

    try {
      await createCheckIn({
         visitId: String(id),
      });

      // ❌ DIHAPUS getVisits
      // ✔ langsung set result

      setResult({
        id,
        visitorName: "Check-In Success"
      });

      setState("success");
    } catch (err) {
      console.error(err);
      setError("Check-in gagal");
      setState("error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CLEANUP
  // =========================
  useEffect(() => {
    return () => {
      const scanner = scannerRef.current;

      if (scanner) {
        try {
          scanner.stop();
          scanner.clear();
        } catch (err) {
          console.warn(err);
        }
      }
    };
  }, []);

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">

        <h1 className="text-xl font-bold text-center mb-4">
          Visitor Check-In System
        </h1>

        {/* SCANNER */}
        {state === "scanning" && (
          <div>
            <div
              id="reader"
              className="w-full border rounded-xl"
              style={{ minHeight: 320 }}
            />

            <p className="text-center text-sm text-gray-500 mt-3">
              Arahkan QR Code ke kamera
            </p>

            <button
              onClick={stopScanner}
              className="mt-4 w-full border border-red-500 text-red-500 py-2 rounded-lg"
            >
              Stop Scanner
            </button>
          </div>
        )}

        {/* IDLE */}
        {state === "idle" && (
          <button
            onClick={startScanner}
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            Start QR Scan
          </button>
        )}

        {/* SUCCESS */}
        {state === "success" && result && (
          <div className="text-center">
            <div className="text-green-600 text-xl font-bold">
              ✔ Check-In Success
            </div>

            <div className="mt-2 font-semibold">
              {result.visitorName}
            </div>

            <div className="text-xs text-gray-500">
              ID: {result.id}
            </div>

            <button
              onClick={startScanner}
              className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Scan Next
            </button>
          </div>
        )}

        {/* ERROR */}
        {state === "error" && (
          <div className="text-center text-red-600">
            {error}

            <button
              onClick={startScanner}
              className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-4 text-gray-500">
            Processing...
          </p>
        )}

      </div>
    </div>
  );
}