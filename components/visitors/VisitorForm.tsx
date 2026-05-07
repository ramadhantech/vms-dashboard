export default function VisitForm(){

    return(
           <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-xl shadow">

        <h1 className="text-lg font-bold mb-3">Add Visit</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* FORM */}
          <div className="grid grid-cols-2 gap-2">

            <input name="name"   value={form.name} placeholder="Name" onChange={handleChange}
              className="border rounded px-2 py-1 text-sm h-9" />

            <input name="purpose"   value={form.purpose} placeholder="Purpose" onChange={handleChange}
              className="border rounded px-2 py-1 text-sm h-9" />

            <input name="company"  value={form.company} placeholder="Company" onChange={handleChange}
              className="border rounded px-2 py-1 text-sm h-9" />

            <input name="phone"  value={form.phone} placeholder="Phone" onChange={handleChange}
              className="border rounded px-2 py-1 text-sm h-9" />

            <input name="idNumber"   value={form.idNumber} placeholder="ID Number" onChange={handleChange}
              className="border rounded px-2 py-1 text-sm h-9" />

            <select name="type"   value={form.type} onChange={handleChange}
              className="border rounded px-2 py-1 text-sm h-9">
              <option value="Guest">Guest</option>
              <option value="Vendor">Vendor</option>
              <option value="Inspector">Inspector</option>
            </select>

            <select name="departmentId" onChange={handleChange}
              className="border rounded px-2 py-1 text-sm h-9 col-span-2">
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <input name="hostName" value={form.hostName} placeholder="Host" onChange={handleChange}
              className="border rounded px-2 py-1 text-sm h-9" />

            <input name="location" value={form.location} placeholder="Location" onChange={handleChange}
              className="border rounded px-2 py-1 text-sm h-9" />

            <input
              type="datetime-local"
              name="scheduledDate"
              value={form.scheduledDate}
              onChange={handleChange}
              className="border rounded px-2 py-1 text-sm h-9 col-span-2"
            />
          </div>

          {/* CAMERA */}
          <div className="flex flex-col items-center">

            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-w-sm h-56 object-cover border rounded bg-black"
            />

            <canvas ref={canvasRef} className="hidden" />

            <div className="flex gap-2 mt-2">
              <button onClick={startCamera}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Start
              </button>

              <button onClick={capturePhoto}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                Capture
              </button>

              <button onClick={stopCamera}
                className="bg-gray-600 text-white px-3 py-1 rounded text-sm">
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
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Saving..." : "Save Visit"}
        </button>

      </div>
    </div>

    );

}