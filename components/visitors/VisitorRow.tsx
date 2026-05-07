// src/components/visitors/VisitorRow.tsx

import { Visitor } from "@/app/types/visitor";

type Props = {
  visitor: Visitor;
  onDelete: (id: string) => void;
  onPhotoClick: (photo: string) => void;
};

export default function VisitorRow({
  visitor,
  onDelete,
  onPhotoClick,
}: Props) {
  return (
    <tr className="hover:bg-gray-50 transition">

      <td className="p-3 font-medium text-gray-800">
        {visitor.name}
      </td>

      <td className="p-3 text-gray-600">
        {visitor.company ?? "-"}
      </td>

      <td className="p-3 text-gray-600">
        {visitor.idNumber ?? "-"}
      </td>

      <td className="p-3 text-gray-600">
        {visitor.purpose}
      </td>

      <td className="p-3 text-gray-600">
        {visitor.type}
      </td>

      <td className="p-3 text-gray-600">
        {visitor.phone ?? "-"}
      </td>

      <td className="p-3">
        {visitor.photoPath ? (
          <img
            src={visitor.photoPath}
            alt="visitor"
            onClick={() =>
              onPhotoClick(visitor.photoPath!)
            }
            className="w-10 h-10 rounded-full object-cover border cursor-pointer hover:scale-110 transition"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
            -
          </div>
        )}
      </td>

      <td className="p-3 text-center">
        <div className="flex justify-center gap-3">

          <a
            href={`/visitors/edit/${visitor.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </a>

          <button
            onClick={() => onDelete(visitor.id)}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Delete
          </button>

        </div>
      </td>

    </tr>
  );
}