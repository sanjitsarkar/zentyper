import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="grid place-content-center h-screen">
      <Link to="/practice">
        <button className="px-3 py-2 bg-slate-900 text-white rounded-sm">
          Start Practice
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
