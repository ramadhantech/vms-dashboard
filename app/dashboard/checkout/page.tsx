"use client";

import { useEffect, useRef, useState } from "react";
import { createCheckOut } from "@/lib/api";
import { Html5Qrcode } from "html5-qrcode";

type State = "idle" | "scanning" | "success" | "error";

export default function CheckOutPage() {
  const [state, setState] = useState<State>("idle");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isRunning = useRef(false);

  // =========================
  // START SCANNER
  // =========================
  const startScanner = async () => {
    if (isRunning.current) return;

    setState("scanning");
    setError(null);
    setResult(null);
    isRunning.current = true;

    // WAIT DOM READY (INI KUNCI FIX ERROR)
    setTimeout(async () => {
      try {
        const el = document.getElementById("reader");

        if (!el) {
          setError("Camera container tidak ditemukan");
          setState("error");
          isRunning.current = false;
          return;
        }

        const scanner = new Html5Qrcode("reader");
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          async (decodedText) => {
            await stopScanner();
            await handleCheckOut(decodedText);
          },
          () => {}
        );
      } catch (err) {
        console.error("Scanner error:", err);
        setError("Camera tidak bisa diakses / permission ditolak");
        setState("error");
        isRunning.current = false;
      }
    }, 300);
  };

  // =========================
  // STOP SCANNER
  // =========================
  const stopScanner = async () => {
    const scanner = scannerRef.current;

    try {
      if (scanner) {
        await scanner.stop();
        await scanner.clear();
      }
    } catch (err) {
      console.warn("Stop scanner error:", err);
    }

    scannerRef.current = null;
    isRunning.current = false;
    setState("idle");
  };

  // =========================
  // CHECK OUT API
  // =========================
  const handleCheckOut = async (visitId: string) => {
    setLoading(true);

    try {
      await createCheckOut({
        visitId,
        gate: "Main Gate",
      });

      setResult({
        id: visitId,
        message: "Check-out success",
      });

      setState("success");
    } catch (err) {
      console.error(err);
      setError("Check-out gagal");
      setState("error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CLEANUP ON EXIT
  // =========================
  useEffect(() => {
    return () => {
      const scanner = scannerRef.current;

      if (scanner) {
        try {
          scanner.stop();
          scanner.clear();
        } catch (e) {
          console.warn(e);
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

        {/* TITLE */}
        <h1 className="text-xl font-bold text-center mb-4">
          Visitor Check-Out Scanner
        </h1>

        {/* SCANNER */}
        {state === "scanning" && (
          <div>
            <div
              id="reader"
              className="w-full border rounded-xl overflow-hidden"
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
            className="w-full bg-red-600 text-white py-3 rounded-xl font-medium"
          >
            Start Check-Out Scan
          </button>
        )}

        {/* SUCCESS */}
        {state === "success" && result && (
          <div className="text-center">
            <div className="text-green-600 text-xl font-bold">
              ✔ Check-Out Success
            </div>

            <div className="mt-2 text-gray-700">
              Visitor ID: {result.id}
            </div>

            <button
              onClick={startScanner}
              className="mt-5 w-full bg-red-600 text-white py-2 rounded-lg"
            >
              Scan Next
            </button>
          </div>
        )}

        {/* ERROR */}
        {state === "error" && (
          <div className="text-center">
            <div className="text-red-600 font-semibold">
              {error}
            </div>

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
            Processing check-out...
          </p>
        )}

      </div>
    </div>
  );
}