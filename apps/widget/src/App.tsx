import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Widget } from "./features/Widget/Widget.tsx";

const App = () => {
  return (
    <div className="w-full h-screen">
      <Widget />
    </div>
  );
};

export default App;
