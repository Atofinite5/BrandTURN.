// Routes configuration
import { Routes, Route } from "react-router-dom";
import Home from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Clients from "../components/sections/Clients";
import About from "../components/sections/About";
import Partners from "../components/sections/Contact";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home onAuthClick={() => {}} />} />
    <Route path="/partners" element={<Partners />} />
    <Route path="/services" element={<Services />} />
    <Route path="/clients" element={<Clients />} />
    <Route path="/about" element={<About />} />
  </Routes>
);
