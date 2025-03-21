import React from "react";

const Loader = () => (
  <div className="text-center my-4">
    <div className="loader animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto" />
    <p className="text-sm mt-2">Analyzing emotions...</p>
  </div>
);

export default Loader;
