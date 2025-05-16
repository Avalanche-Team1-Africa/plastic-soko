import React, { useEffect, useState } from "react";

const RewardDisplay = ({ contract }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      if (!contract) return;
      try {
        const pts = await contract.getMyBalance();
        setPoints(pts.toString());
      } catch (err) {
        console.error("❌ Failed to fetch reward points", err);
      }
    };

    fetchPoints();
  }, [contract]);

  return <p>🎁 Your points: {points}</p>;
};

export default RewardDisplay;
