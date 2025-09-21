import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
