import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen " style={{ backgroundColor: "#0f0000" }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
