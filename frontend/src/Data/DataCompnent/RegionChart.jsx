import React, { useEffect, useState } from "react";
import axios from "axios";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import 'tailwindcss/tailwind.css';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RegionChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/data");
        setData(response.data);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Fetched Data:", data);
  }, [data]);

  const regionData = data.reduce((acc, item) => {
    if (item.region) {
      acc[item.region] = (acc[item.region] || 0) + 1;
    }
    return acc;
  }, {});

  const labels = Object.keys(regionData);
  const values = Object.values(regionData);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Regions",
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Region Data</h1>
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <div className="relative" style={{ height: "300px", width: "100%" }}>
          <Radar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RegionChart;
