"use client";

import { QRCodeCanvas } from "qrcode.react";

type Props = {
  id: string;
};

export default function VisitQRCode({
  id,
}: Props) {

  function downloadQR() {
    const canvas = document.getElementById(
      `qr-${id}`
    ) as HTMLCanvasElement;

    if (!canvas) return;

    const url = canvas.toDataURL("image/png");

    const a = document.createElement("a");

    a.href = url;
    a.download = `qr-${id}.png`;

    a.click();
  }

  return (
    <div className="flex flex-col items-center gap-1">

      <QRCodeCanvas
        id={`qr-${id}`}
        value={id}
        size={60}
      />

      <button
        className="text-xs text-blue-600 hover:underline"
        onClick={downloadQR}
      >
        Download
      </button>

    </div>
  );
}