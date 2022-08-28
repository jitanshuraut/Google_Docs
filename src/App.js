
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Docs from './pages/Docs';

import { Routes, Route } from "react-router-dom"
import Docs_Home from './pages/Docs_Home';
import EDocs from './pages/EDocs';
import Extra from './pages/Extra';
import Spinner from './pages/Spinner';

function App() {
  return (
   <>
   <Navbar/>
   <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="docs" element={ <Docs_Home/> } />
        <Route path="docs/creat" element={ <Docs/> } />
        <Route path="docs/edit" element={ <EDocs/> } />
        <Route path="extra" element={ <Extra/> } />
        <Route path="spinner" element={ <Spinner/> } />

      </Routes>
  
   </>
  );
}

export default App;
