import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Government from "./pages/Government";
import Payments from "./pages/Payments";
import MedicalClaims from "./pages/MedicalClaims";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/government" element={<Government />} />
        <Route path="/payments" element={<Payments />} />
        <Route
          path="/medical"
          element={
            <PlaceholderPage
              title="Health Insurance Claims"
              description="Submit and track your health insurance claims through Nepal's Social Security Fund (SSF) system."
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
