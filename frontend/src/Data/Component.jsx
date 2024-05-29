import React from "react";
import Intensity from "./DataCompnent/Intensity";
import Likelihood from "./DataCompnent/Likelihood";
import Relevance from "./DataCompnent/Relevance";
import CountryCharts from "./DataCompnent/CountryCharts";
import TopicChart from "./DataCompnent/TopicChart";
import RegionChart from "./DataCompnent/RegionChart";
import Dashboard from "./DataCompnent/Dashboard";

const Component = () => {
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        <Intensity />
        <Likelihood />
        <Relevance />
        <CountryCharts />
        <TopicChart />
        <RegionChart />
      </div>
      <Dashboard />
    </>
  );
};

export default Component;
