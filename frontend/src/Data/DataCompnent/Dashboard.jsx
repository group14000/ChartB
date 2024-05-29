import React, { useEffect, useState } from "react";
import axios from "axios";
import 'tailwindcss/tailwind.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    country: "",
  });
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    let filtered = data;

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filtered = filtered.filter(item => item[key] === filters[key]);
      }
    });

    setFilteredData(filtered);
    setShowData(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const renderFilterOptions = (field) => {
    const uniqueOptions = [...new Set(data.map(item => item[field]))].filter(Boolean);
    return uniqueOptions.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Data Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-2">End Year</label>
          <select
            name="end_year"
            value={filters.end_year}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            {renderFilterOptions("end_year")}
          </select>
        </div>
        <div>
          <label className="block mb-2">Topic</label>
          <select
            name="topic"
            value={filters.topic}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            {renderFilterOptions("topic")}
          </select>
        </div>
        <div>
          <label className="block mb-2">Sector</label>
          <select
            name="sector"
            value={filters.sector}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            {renderFilterOptions("sector")}
          </select>
        </div>
        <div>
          <label className="block mb-2">Region</label>
          <select
            name="region"
            value={filters.region}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            {renderFilterOptions("region")}
          </select>
        </div>
        <div>
          <label className="block mb-2">PEST Analysis</label>
          <select
            name="pestle"
            value={filters.pestle}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            {renderFilterOptions("pestle")}
          </select>
        </div>
        <div>
          <label className="block mb-2">Data Source</label>
          <select
            name="source"
            value={filters.source}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            {renderFilterOptions("source")}
          </select>
        </div>
        <div>
          <label className="block mb-2">Country</label>
          <select
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            {renderFilterOptions("country")}
          </select>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
      {showData && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Filtered Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Topic</th>
                  <th className="py-2 px-4 border-b">Sector</th>
                  <th className="py-2 px-4 border-b">Region</th>
                  <th className="py-2 px-4 border-b">Country</th>
                  <th className="py-2 px-4 border-b">End Year</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item._id}>
                    <td className="py-2 px-4 border-b">{item.title}</td>
                    <td className="py-2 px-4 border-b">{item.topic}</td>
                    <td className="py-2 px-4 border-b">{item.sector}</td>
                    <td className="py-2 px-4 border-b">{item.region}</td>
                    <td className="py-2 px-4 border-b">{item.country}</td>
                    <td className="py-2 px-4 border-b">{item.end_year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
