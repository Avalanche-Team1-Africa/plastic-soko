import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const AdminDashboard = ({ reports }) => {
  const exportCSV = () => {
    const headers = "Location,Description,Reporter,Timestamp\n";
    const rows = reports.map((r) =>
      `${r.location},${r.description},${r.reporter},${new Date(
        Number(r.timestamp) * 1000
      ).toLocaleString()}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "waste_reports.csv";
    link.click();
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      <h2 className="text-2xl font-bold mb-4">🛠️ Admin Dashboard</h2>

      <button
        onClick={exportCSV}
        className="bg-green-700 text-white px-4 py-2 mb-4 rounded hover:bg-green-800"
      >
        📤 Export Reports as CSV
      </button>

      {/* Report Table */}
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Reporter</th>
              <th className="p-2 border">Reported On</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, idx) => (
              <tr key={idx} className="text-center">
                <td className="p-2 border">{r.location}</td>
                <td className="p-2 border">{r.description}</td>
                <td className="p-2 border">{r.reporter}</td>
                <td className="p-2 border">
                  {new Date(Number(r.timestamp) * 1000).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Map */}
      <h3 className="text-xl font-semibold mb-2">🗺️ Waste Map Overview</h3>
      <MapContainer center={[-1.2921, 36.8219]} zoom={11} style={{ height: "400px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {reports
          .filter((r) => r.lat && r.lng)
          .map((r, idx) => (
            <Marker key={idx} position={[r.lat, r.lng]}>
              <Popup>
                <strong>{r.location}</strong>
                <br />
                {r.description}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default AdminDashboard;
