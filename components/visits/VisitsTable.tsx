import { Visit } from "@/app/types/visits";
import VisitRow from "./VisitRow";

type Props = {
  data: Visit[];
};

export default function VisitsTable({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-x-auto">

      <table className="w-full text-sm border-collapse">

        <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10">
          <tr>
            {[
              "Visitor",
              "Company",
              "Type",
              "Dept",
              "Purpose",
              "Host",
              "Location",
              "Date",
              "Status",
            ].map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 font-semibold whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {data.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="text-center py-10 text-gray-400"
              >
                No visits found
              </td>
            </tr>
          ) : (
          data.map((v) => (
  <VisitRow
    key={v.id}
    visit={v}
  />
))
          )}

        </tbody>

      </table>

    </div>
  );
}