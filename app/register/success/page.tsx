"use client";

import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

export default function SuccessPage() {
  const params = useSearchParams();
  const id = params.get("id");

  const qrRef = useRef<HTMLCanvasElement | null>(null);

  function downloadQR() {
    if (!qrRef.current) return;

    const url = qrRef.current.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-visit.png";
    a.click();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-6 rounded-xl shadow text-center">

        <h1 className="text-xl font-bold mb-2 text-green-600">
          Registration Success
        </h1>

        <p className="text-sm text-gray-500 mb-4">
          Tunjukkan QR ini saat check-in
        </p>

        {id && (
          <QRCodeCanvas
            value={id}
            size={220}
            level="H"
            ref={qrRef}
          />
        )}

        <button
          onClick={downloadQR}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Download QR
        </button>

      </div>
    </div>
  );
}