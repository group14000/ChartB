import React, { useEffect, useState } from "react";
import axios from "axios";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import 'tailwindcss/tailwind.css';

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const TopicChart = () => {
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

  const topicData = data.reduce((acc, item) => {
    if (item.topic) {
      acc[item.topic] = (acc[item.topic] || 0) + 1;
    }
    return acc;
  }, {});

  const labels = Object.keys(topicData);
  const values = Object.values(topicData);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Topics",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
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
      <h1 className="text-2xl font-bold text-center mb-4">Topic Data</h1>
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <div className="relative" style={{ height: "300px", width: "100%" }}>
          <PolarArea data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TopicChart;
