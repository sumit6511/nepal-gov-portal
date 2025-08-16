import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { PlaceholderPage } from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/services"
              element={
                <PlaceholderPage
                  title="Services Overview"
                  description="Explore our comprehensive range of digital government services designed to make your life easier."
                />
              }
            />
            <Route
              path="/government"
              element={
                <PlaceholderPage
                  title="Government Services"
                  description="Apply for documents, permits, and licenses through our secure digital platform."
                />
              }
            />
            <Route
              path="/payments"
              element={
                <PlaceholderPage
                  title="Payment Services"
                  description="Pay utility bills, taxes, and government fees securely online."
                />
              }
            />
            <Route
              path="/medical"
              element={
                <PlaceholderPage
                  title="Medical Claims"
                  description="Submit and track your medical insurance claims with ease."
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <PlaceholderPage
                  title="User Dashboard"
                  description="Track your applications, payments, and services in one centralized location."
                />
              }
            />
            <Route
              path="/contact"
              element={
                <PlaceholderPage
                  title="Contact Support"
                  description="Get in touch with our support team for assistance with any service."
                />
              }
            />
            <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
