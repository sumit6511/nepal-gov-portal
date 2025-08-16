import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Shield,
  Clock,
  Users,
  FileText,
  CreditCard,
  Heart,
  BarChart3,
  CheckCircle,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const services = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Government Services",
      description:
        "Apply for citizenship, passports, and permits online through Nepal government portal.",
      href: "/government",
      features: [
        "Citizenship Certificate",
        "Passport Services",
        "Business Registration",
      ],
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Bill Payment Services",
      description:
        "Pay electricity, water, internet bills and government fees securely in NPR.",
      href: "/payments",
      features: ["NEA Electricity Bills", "Tax Payments", "Municipal Fees"],
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health Insurance",
      description:
        "Submit and track health insurance claims through Nepal's social security system.",
      href: "/medical",
      features: ["SSF Health Claims", "Medical Reimbursement", "Digital Health Records"],
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Dashboard",
      description:
        "Monitor all your applications, payments, and services in one place.",
      href: "/dashboard",
      features: ["Real-time Status", "History Tracking", "Analytics"],
    },
  ];

  const stats = [
    {
      number: "50K+",
      label: "Active Users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      number: "99.9%",
      label: "Uptime",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    { number: "24/7", label: "Support", icon: <Clock className="h-5 w-5" /> },
    {
      number: "4.9★",
      label: "User Rating",
      icon: <Star className="h-5 w-5" />,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
🚀 New: Digital Nepal - Online Health Insurance Claims
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Your Gateway to
              <span className="text-primary"> Digital Nepal</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access all Nepal government services, make secure payments in NPR, and manage
              your digital identity through our comprehensive e-governance platform for Nepali citizens.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Digital Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for Nepal government interactions, bill payments in NPR, and
              healthcare management in one secure, easy-to-use digital platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild>
                    <Link to={service.href}>
                      Access Service <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Secure & Trusted Platform
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your data is protected with enterprise-grade security, Nepal government
              compliance standards, and end-to-end encryption for all
              transactions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="p-4 bg-background rounded-lg shadow-sm border mb-4">
                  <CheckCircle className="h-8 w-8 text-primary mx-auto" />
                </div>
                <h3 className="font-semibold mb-2">Nepal Government Certified</h3>
                <p className="text-sm text-muted-foreground">
                  Fully compliant with Nepal government security standards and
                  regulations.
                </p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-background rounded-lg shadow-sm border mb-4">
                  <Shield className="h-8 w-8 text-primary mx-auto" />
                </div>
                <h3 className="font-semibold mb-2">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  All your personal data and transactions are fully encrypted.
                </p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-background rounded-lg shadow-sm border mb-4">
                  <Clock className="h-8 w-8 text-primary mx-auto" />
                </div>
                <h3 className="font-semibold mb-2">24/7 Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Continuous security monitoring and instant threat detection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of Nepali citizens who have simplified their government
              interactions through our secure digital platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">
                  Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
