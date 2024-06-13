import "./App.css";
import Home from "./pages/Home";
import Docs from "./pages/Docs";
import { Routes, Route } from "react-router-dom";
import Docs_Home from "./pages/Docs_Home";
import EDocs from "./pages/EDocs";
import Extra from "./pages/Extra";
import Spinner from "./pages/Spinner";
import Profile from "./pages/Profile";
import Share from "./pages/Share";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="docs" element={<Docs_Home />} />
        <Route path="docs/creat" element={<Docs />} />
        <Route path="docs/edit" element={<EDocs />} />
        <Route path="extra" element={<Extra />} />
        <Route path="spinner" element={<Spinner />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/share" element={<Share />} />
      </Routes>
    </>
  );
}

export default App;
