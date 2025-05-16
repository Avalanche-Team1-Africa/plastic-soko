import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContract } from "./contract";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import ReportForm from "./components/ReportForm";
import ReportList from "./components/ReportList";
import RewardDisplay from "./components/RewardDisplay";
import AdminDashboard from "./components/AdminDashboard";


function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [points, setPoints] = useState(0);
  const [reports, setReports] = useState([]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask or Core Wallet");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    setWalletAddress(address);
    setProvider(provider);

    const contract = getContract(signer);
    setContract(contract);
  };

  const reportWaste = async (location, description) => {
    if (!contract) return;
    try {
      const tx = await contract.reportWaste(location, description);
      await tx.wait();
      alert("♻️ Waste reported successfully!");
      setPoints((prev) => prev + 10);
      fetchReports();
    } catch (err) {
      console.error("❌ Reporting failed:", err);
    }
  };

  const fetchReports = async () => {
    if (!contract) return;
    try {
      const reports = await contract.getAllReports();
      setReports(reports);
    } catch (err) {
      console.error("❌ Fetching reports failed:", err);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchReports();
    }
  }, [contract]);

  // Dummy map pins for now
  const positions = [
    { location: "Dandora", lat: -1.2545, lng: 36.897 },
    { location: "Kibra", lat: -1.309, lng: 36.793 },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>♻️ PlasticSoko DApp</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      {walletAddress && <p>✅ Connected: {walletAddress}</p>}

      <RewardDisplay contract={contract} />

      <div style={{ marginTop: "2rem" }}>
        <h2>📍 Report Plastic Waste</h2>
        <ReportForm onSubmit={reportWaste} />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>📜 Waste Reports Feed</h2>
        <ReportList reports={reports} />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>🗺️ Nairobi Waste Map</h2>
        <MapContainer center={[-1.2921, 36.8219]} zoom={11} style={{ height: "300px" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {positions.map((pos, idx) => (
            <Marker key={idx} position={[pos.lat, pos.lng]}>
              <Popup>{pos.location}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {walletAddress === "0x20F7DDd12480491bd932F5A1c7b76C40c8Cb7b81" && (
  <AdminDashboard reports={reports} />
)}

    </div>
  );
}

export default App;