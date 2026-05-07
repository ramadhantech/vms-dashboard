"use client";

import { useEffect, useRef, useState } from "react";
import { createVisit, getDepartments } from "@/lib/api";


export function useVisitorForm(){
 const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [photo, setPhoto] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // ================= LOAD DEPARTMENT =================
  useEffect(() => {
    getDepartments()
      .then(setDepartments)
      .catch(() => setError("Gagal load department"));
  }, []);

  // ================= CAMERA =================
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error(err);
      setError("Tidak bisa akses kamera");
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/jpeg", 0.8);

    setPhoto(image);

    setForm((prev) => ({
      ...prev,
      photoPath: image,
    }));

    stopCamera();
  }

  // ================= SUBMIT =================
  async function submit() {
  setError("");

  if (!form.name) return setError("Name wajib diisi");
  if (!form.photoPath) return setError("Photo wajib diambil");
  if (!form.departmentId)
    return setError("Department wajib dipilih");

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
      scheduledDate: form.scheduledDate
        ? new Date(form.scheduledDate).toISOString()
        : null,
      status: "Pending",
    };

    const res = await createVisit(payload);

    stopCamera();

    return res; // ⬅️ penting
  } catch (err) {
    console.error(err);
    setError("Gagal submit data");
    return null;
  } finally {
    setLoading(false);
  }
}

  return{
    departments,
  error,
  loading,
  form,
  handleChange,
  videoRef,
  canvasRef,
  startCamera,
  stopCamera,
  capturePhoto,
  photo,
  submit,

  };
}