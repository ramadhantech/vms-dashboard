"use client";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;

  startCamera: () => void;
  stopCamera: () => void;
  capturePhoto: () => void;

  photo: string;
};

export default function VisitCamera({
  videoRef,
  canvasRef,
  startCamera,
  stopCamera,
  capturePhoto,
  photo,
}: Props) {
  return (
    <div className="flex flex-col items-center">

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-sm h-56 object-cover border rounded bg-black"
      />

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-2 mt-2">
        <button
          onClick={startCamera}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          Start
        </button>

        <button
          onClick={capturePhoto}
          className="bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
          Capture
        </button>

        <button
          onClick={stopCamera}
          className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
        >
          Stop
        </button>
      </div>

      {photo && (
        <img
          src={photo}
          className="w-24 h-24 mt-3 rounded-full border object-cover"
        />
      )}
    </div>
  );
}