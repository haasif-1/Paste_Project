import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Pastes from "./components/Pastes";
import ViewPaste from "./components/ViewPaste";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pastes" element={<Pastes />} />
        <Route path="/paste/:id" element={<ViewPaste />} />
      </Routes>
    </div>
  );
}

export default App;
