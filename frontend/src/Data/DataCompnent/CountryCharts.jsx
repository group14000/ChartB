import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import 'tailwindcss/tailwind.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const CountryCharts = () => {
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

  const countryData = data.reduce((acc, item) => {
    acc[item.country] = (acc[item.country] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(countryData);
  const values = Object.values(countryData);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Country",
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
      <h1 className="text-2xl font-bold text-center mb-4">Country Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="bg-white p-4 shadow-lg rounded-lg">
          {/* <h2 className="text-xl font-semibold text-center mb-2">Doughnut Chart</h2> */}
          <div className="relative" style={{ height: "300px", width: "100%" }}>
            <Doughnut data={chartData} options={options} />
          </div>
        </div>
        {/* <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-center mb-2">Pie Chart</h2>
          <div className="relative" style={{ height: "300px", width: "100%" }}>
            <Pie data={chartData} options={options} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CountryCharts;
