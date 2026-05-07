// src/components/visitors/PhotoModal.tsx

type Props = {
  photo: string | null;
  onClose: () => void;
};

export default function PhotoModal({
  photo,
  onClose,
}: Props) {
  if (!photo) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <img
        src={photo}
        alt="preview"
        className="max-w-md max-h-[80vh] rounded-lg border"
      />
    </div>
  );
}