import Nameplate from "../components/Nameplate.jsx";
import { useState, useEffect } from "react";
import api from "../lib/axios.js";

const HomePage = () => {
  const [pingData, setPingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPings = async () => {
      try {
        const res = await api.get("/ping");
        setPingData(res.data);
      } catch (error) {
        console.log("Error fetching pings");
      } finally {
        setLoading(false);
      }
    };
    fetchPings();
  }, []);

  return (
    <>
      {loading && <div className="text-center py-10">Loading pings...</div>}
      {pingData.length > 0 && (
        
        <div
          className="flex items-center 
      justify-center h-screen gap-5"
        >
          {pingData.map(ping => (
            <Nameplate key={ping._id} ping={ping}/>
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
