
type Props = {
  visitors: any[];
  departments: any[];

  form: {
    visitorId: string;
    departmentId: string;
    purpose: string;
    hostName: string;
    location: string;
    scheduledDate: string;
  };

  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;

  handleSubmit: () => void;
};
export default function VisitFrom({
     visitors,
  departments,

  form,
  handleChange,

  handleSubmit,
}: Props) {
 return(
     <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

      <h1 className="text-xl font-bold mb-4">
        Add Visit
      </h1>

      {/* VISITOR */}
      <select
        name="visitorId"
        value={form.visitorId}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      >

        <option value="">
          Select Visitor
        </option>

        {visitors.map((v: any) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}

      </select>

      {/* DEPARTMENT */}
      <select
        name="departmentId"
        value={form.departmentId}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      >

        <option value="">
          Select Department
        </option>

        {departments.map((d: any) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}

      </select>

      {/* PURPOSE */}
      <input
        name="purpose"
        placeholder="Purpose"
        value={form.purpose}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      {/* HOST */}
      <input
        name="hostName"
        placeholder="Host Name"
        value={form.hostName}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      {/* LOCATION */}
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      {/* DATE */}
      <input
        type="datetime-local"
        name="scheduledDate"
        value={form.scheduledDate}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Save Visit
      </button>

    </div>
 );
}