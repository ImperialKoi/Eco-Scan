import { Route, Routes } from "react-router-dom";
import CameraPage from "./pages/CameraPage";
import GalleryPage from "./pages/GalleryPage";
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Home from './pages/Home';
import Navbar from './components/Navbar'

function App() {
    return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    );
}

export default App;