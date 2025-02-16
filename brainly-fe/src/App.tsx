import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;