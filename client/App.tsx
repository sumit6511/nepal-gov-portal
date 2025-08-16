import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
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
                  title="Nepal Government Services"
                  description="Apply for citizenship certificates, passports, business registration and permits through our secure digital platform."
                />
              }
            />
            <Route
              path="/payments"
              element={
                <PlaceholderPage
                  title="Bill Payment Services"
                  description="Pay electricity, water, internet bills and government fees securely in NPR through our digital platform."
                />
              }
            />
            <Route
              path="/medical"
              element={
                <PlaceholderPage
                  title="Health Insurance Claims"
                  description="Submit and track your health insurance claims through Nepal's Social Security Fund (SSF) system."
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
