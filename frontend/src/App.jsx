import React from "react";
import Layout from "./components/Layout";
import Component from "./Data/Component";

const App = () => {
  return (
    <Layout>
      {/* Your main content goes here */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <Component />
      </div>
    </Layout>
  );
};

export default App;


