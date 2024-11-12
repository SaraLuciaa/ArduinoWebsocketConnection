import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Problem from "./components/Problem";
import Report from "./components/Report";
import RealTimeGraph from "./components/RealTimeGraph";

function App() {
  const [selectedTab, setSelectedTab] = useState("problem");

  // Renderizamos el contenido según la pestaña seleccionada
  const renderContent = () => {
    switch (selectedTab) {
      case "problem":
        return <Problem />;
      case "report":
        return <Report />;
      case "graph":
        return <RealTimeGraph />;
      default:
        return <Problem />;
    }
  };

  return (
    <div>
      {/* Pasamos la función setSelectedTab a Navbar */}
      <Navbar setSelectedTab={setSelectedTab} />
      <div className="pt-16 p-4">{renderContent()}</div>
    </div>
  );
}

export default App;