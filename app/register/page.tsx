"use client";

import { useEffect, useRef, useState } from "react";
import { createVisit, getDepartments } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    purpose: "",
    type: "Guest",
    company: "",
    phone: "",
    idNumber: "",
    photoPath: "",
    departmentId: "",
    hostName: "",
    location: "",
    scheduledDate: "",
  });

  useEffect(() => {
    getDepartments().then((res) => setDepartments(res || []));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    streamRef.current = stream;
    if (videoRef.current) videoRef.current.srcObject = stream;
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }

  function capture() {
    const canvas = canvasRef.current!;
    const video = videoRef.current!;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0);

    const img = canvas.toDataURL("image/jpeg", 0.8);

    setPhoto(img);
    setForm((p) => ({ ...p, photoPath: img }));

    stopCamera();
  }

  async function submit() {
    if (!form.name) return alert("Name wajib diisi");
    if (!form.photoPath) return alert("Ambil foto dulu");

    setLoading(true);

    try {
      const payload = {
        name: form.name,
        purpose: form.purpose,
        type: form.type,
        company: form.company,
        phone: form.phone,
        idNumber: form.idNumber,
        photoPath: form.photoPath,
        departmentId: form.departmentId,
        hostName: form.hostName,
        location: form.location,
        scheduledDate: form.scheduledDate,
        status: "Pending",
      };

      const res = await createVisit(payload);

      stopCamera();

      const visitId = res.id;

if (!visitId) {
  alert("ID tidak ditemukan dari server");
  return;
}

router.push(`/register/success?id=${visitId}`);

router.push(`/register/success?id=${visitId}`);
    } catch (err) {
      console.error(err);
      alert("Gagal submit");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-3">
      <div className="w-full max-w-md bg-white p-5 rounded-2xl shadow space-y-2">

        <h1 className="text-xl font-bold text-center mb-3">
          Visitor Registration
        </h1>

        <input name="name" placeholder="Full Name" onChange={handleChange} className="input" />
        <input name="company" placeholder="Company" onChange={handleChange} className="input" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />
        <input name="idNumber" placeholder="ID Number" onChange={handleChange} className="input" />
        <input name="purpose" placeholder="Purpose" onChange={handleChange} className="input" />
        <input name="hostName" placeholder="Host Name" onChange={handleChange} className="input" />
        <input name="location" placeholder="Location" onChange={handleChange} className="input" />

        <input
          type="datetime-local"
          name="scheduledDate"
          onChange={handleChange}
          className="input"
        />

        <select name="type" value={form.type} onChange={handleChange} className="input">
          <option value="Guest">Guest</option>
          <option value="Vendor">Vendor</option>
          <option value="Inspector">Inspector</option>
        </select>

        <select name="departmentId" value={form.departmentId} onChange={handleChange} className="input">
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <video ref={videoRef} className="w-full h-40 bg-black rounded-xl" autoPlay />
        <canvas ref={canvasRef} className="hidden" />

        <div className="flex gap-2">
          <button onClick={startCamera} className="flex-1 bg-blue-500 text-white p-2 rounded-xl">
            Camera
          </button>
          <button onClick={capture} className="flex-1 bg-green-500 text-white p-2 rounded-xl">
            Capture
          </button>
        </div>

        {photo && <img src={photo} className="w-20 h-20 rounded-full mx-auto" />}

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded-xl"
        >
          {loading ? "Processing..." : "Register"}
        </button>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          padding: 10px;
          border-radius: 10px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}