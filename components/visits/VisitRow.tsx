import { Visit } from "@/app/types/visits";
import { statusColor } from "@/app/hooks/visitStatusColor";
import VisitQRCode from "./VisitQRCode";

type Props = {
  visit: Visit;
};

export default function VisitRow({
  visit,
}: Props) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">

      <td className="px-4 py-3 font-medium">
        {visit.visitorName}
      </td>

      <td className="px-4 py-3">
        {visit.visitorCompany ?? "-"}
      </td>

      <td className="px-4 py-3">
        {visit.visitorType}
      </td>

      <td className="px-4 py-3">
        {visit.departmentName}
      </td>

      <td className="px-4 py-3">
        {visit.purpose}
      </td>

      <td className="px-4 py-3">
        {visit.hostName}
      </td>

      <td className="px-4 py-3">
        {visit.location}
      </td>

      <td className="px-4 py-3">
        {new Date(
          visit.scheduledDate
        ).toLocaleString()}
      </td>

      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs ${statusColor(
            visit.status
          )}`}
        >
          {visit.status}
        </span>
      </td>

      <td className="px-4 py-3 text-center">
        <VisitQRCode id={visit.id} />
      </td>

    </tr>
  );
}   