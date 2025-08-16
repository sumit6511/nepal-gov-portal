import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Menu,
  X,
  Shield,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Government Services", href: "/government" },
    { name: "Payments", href: "/payments" },
    { name: "Medical Claims", href: "/medical" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                NepalGov Portal
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-background">
              <nav className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href)
                        ? "text-primary bg-accent"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex space-x-2 px-4 pt-4 border-t">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">NepalGov Portal</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your gateway to efficient government services in Nepal, secure payments,
                and digital solutions for citizens.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Quick Links</h4>
              <nav className="space-y-2">
                <Link
                  to="/services"
                  className="block text-sm text-muted-foreground hover:text-primary"
                >
                  Services
                </Link>
                <Link
                  to="/government"
                  className="block text-sm text-muted-foreground hover:text-primary"
                >
                  Government Services
                </Link>
                <Link
                  to="/payments"
                  className="block text-sm text-muted-foreground hover:text-primary"
                >
                  Payments
                </Link>
                <Link
                  to="/dashboard"
                  className="block text-sm text-muted-foreground hover:text-primary"
                >
                  Dashboard
                </Link>
              </nav>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Support</h4>
              <nav className="space-y-2">
                <Link
                  to="/contact"
                  className="block text-sm text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </Link>
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-primary"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </a>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Contact Info</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+977-1-4200100</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>support@nepalgovportal.gov.np</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Singha Durbar, Kathmandu, Nepal</span>
                </div>
              </div>
              {/* Social Links */}
              <div className="flex space-x-2 pt-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 CitizenPortal. All rights reserved. | Powered by
              Digital Government Initiative
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
