type Props = {
  department: string;
  departments: string[];
  onChangeDepartment: (value: string) => void;
};

export default function VisitFilters({
  department,
  departments,
  onChangeDepartment,
}: Props) {
  return (
    <div className="mb-4 flex gap-3 flex-wrap">

      <select
        className="border px-3 py-2 rounded-lg text-sm"
        value={department}
        onChange={(e) =>
          onChangeDepartment(e.target.value)
        }
      >

        <option value="">
          All Department
        </option>

        {departments.map((d, i) => (
          <option key={i} value={d}>
            {d}
          </option>
        ))}

      </select>

    </div>
  );
}