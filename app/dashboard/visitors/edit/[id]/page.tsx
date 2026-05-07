"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getVisitor, updateVisitor } from "@/lib/api";
import Link from "next/link";

export default function EditVisitorPage() {
  const { id } = useParams();
  const router = useRouter();

  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  const [form, setForm] = useState<any>({
    name: "",
    purpose: "",
    type: "Guest",
    company: "",
    phone: "",
    idNumber: "",
    photoPath: "",
  });

  const [loading, setLoading] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getVisitor(id as string);

    setForm({
      name: data.name ?? "",
      purpose: data.purpose ?? "",
      type: data.type ?? "Guest",
      company: data.company ?? "",
      phone: data.phone ?? "",
      idNumber: data.idNumber ?? "",
      photoPath: data.photoPath ?? "",
    });

    setLoading(false);
  }

  function handleChange(e: any) {
    const { name, value } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    await updateVisitor(id as string, form);
    router.push("/visitors");
  }

  async function openCamera() {
    setCameraOn(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    setForm((prev: any) => ({
      ...prev,
      photoPath: image,
    }));

    const stream = video.srcObject;
    stream.getTracks().forEach((t: any) => t.stop());

    setCameraOn(false);
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading visitor data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Edit Visitor
        </h1>
        <p className="text-sm text-gray-500">
          Update visitor information and photo
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* =========================
            LEFT: FORM (2/3 WIDTH)
        ========================= */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold text-gray-700 mb-4">
            Visitor Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-2 rounded"
            />

            <input
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              placeholder="Purpose of Visit"
              className="border p-2 rounded"
            />

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="Guest">Guest</option>
              <option value="Vendor">Vendor</option>
              <option value="Inspector">Inspector</option>
            </select>

            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company (PT)"
              className="border p-2 rounded"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-2 rounded"
            />

            <input
              name="idNumber"
              value={form.idNumber}
              onChange={handleChange}
              placeholder="ID / KTP Number"
              className="border p-2 rounded"
            />

          </div>

        </div>

        {/* =========================
            RIGHT: PHOTO PANEL
        ========================= */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold text-gray-700 mb-4">
            Visitor Photo
          </h2>

          {/* PHOTO PREVIEW */}
          {form.photoPath ? (
            <img
              src={form.photoPath}
              className="w-full h-60 object-cover rounded-lg border mb-4"
            />
          ) : (
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg mb-4">
              No Photo
            </div>
          )}

          {/* CAMERA */}
          {cameraOn && (
            <div className="mb-4">
              <video
                ref={videoRef}
                autoPlay
                className="w-full rounded border mb-2"
              />
              <canvas ref={canvasRef} className="hidden" />

              <button
                onClick={capturePhoto}
                className="bg-blue-600 text-white w-full py-2 rounded"
              >
                Capture Photo
              </button>
            </div>
          )}

          <button
            onClick={openCamera}
            className="bg-gray-700 text-white w-full py-2 rounded mb-4"
          >
            Retake Photo
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white w-full py-2 rounded"
          >
            Save Changes
          </button>

        </div>
 <Link
    href="/visitors"
    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm transition"
  >
    ← Back to Table
  </Link>

      </div>

    </div>
    
  );
}