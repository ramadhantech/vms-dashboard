// src/components/visitors/VisitorTable.tsx

import { Visitor } from "@/app/types/visitor";
import VisitorRow from "./VisitorRow";

type Props = {
  data: Visitor[];
  onDelete: (id: string) => void;
  onPhotoClick: (photo: string) => void;
};

export default function VisitorTable({
  data,
  onDelete,
  onPhotoClick,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">

        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">PT / Company</th>
            <th className="p-3 text-left">ID Number</th>
            <th className="p-3 text-left">Purpose</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">

          {data.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="p-6 text-center text-gray-400"
              >
                No visitors found
              </td>
            </tr>
          ) : (
            data.map((visitor) => (
              <VisitorRow
                key={visitor.id}
                visitor={visitor}
                onDelete={onDelete}
                onPhotoClick={onPhotoClick}
              />
            ))
          )}

        </tbody>

      </table>
    </div>
  );
}