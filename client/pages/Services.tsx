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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  FileText,
  CreditCard,
  Heart,
  BarChart3,
  CheckCircle,
  Clock,
  Shield,
  Users,
  IdCard,
  Building,
  Zap,
  Droplets,
  Wifi,
  Banknote,
  UserCheck,
  Stethoscope,
  Activity,
  Database,
  TrendingUp,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  const serviceCategories = [
    {
      id: "government",
      title: "Government Services",
      icon: <FileText className="h-6 w-6" />,
      description: "Essential document applications and government procedures",
      color: "bg-blue-500",
      services: [
        {
          title: "Citizenship Certificate",
          description:
            "Apply for or renew your Nepal citizenship certificate online",
          icon: <UserCheck className="h-8 w-8" />,
          features: [
            "Online Application",
            "Document Upload",
            "Status Tracking",
            "Home Delivery",
          ],
          processingTime: "15 business days",
          fee: "NPR 100",
          href: "/government",
        },
        {
          title: "Passport Services",
          description:
            "Apply for new passport or renewal through digital platform",
          icon: <IdCard className="h-8 w-8" />,
          features: [
            "New Passport",
            "Renewal",
            "Appointment Booking",
            "Fee Payment",
          ],
          processingTime: "21 business days",
          fee: "NPR 5,000 - 15,000",
          href: "/government",
        },
        {
          title: "Business Registration",
          description: "Register your business and obtain necessary licenses",
          icon: <Building className="h-8 w-8" />,
          features: [
            "Company Registration",
            "Tax Registration",
            "License Application",
            "Certificate Download",
          ],
          processingTime: "7 business days",
          fee: "NPR 1,000+",
          href: "/government",
        },
      ],
    },
    {
      id: "payments",
      title: "Bill Payment Services",
      icon: <CreditCard className="h-6 w-6" />,
      description:
        "Pay utility bills, taxes, and government fees securely in NPR",
      color: "bg-green-500",
      services: [
        {
          title: "NEA Electricity Bills",
          description: "Pay your Nepal Electricity Authority bills online",
          icon: <Zap className="h-8 w-8" />,
          features: [
            "Monthly Bills",
            "Due Date Reminders",
            "Payment History",
            "Receipt Download",
          ],
          processingTime: "Instant",
          fee: "No service charge",
          href: "/payments",
        },
        {
          title: "Water Bill Payment",
          description: "Pay water supply bills for major municipalities",
          icon: <Droplets className="h-8 w-8" />,
          features: [
            "Municipality Bills",
            "Consumption History",
            "Auto Payment",
            "SMS Alerts",
          ],
          processingTime: "Instant",
          fee: "NPR 5 service charge",
          href: "/payments",
        },
        {
          title: "Internet & Telecom",
          description: "Pay internet, mobile, and landline bills",
          icon: <Wifi className="h-8 w-8" />,
          features: [
            "Multiple Providers",
            "Plan Details",
            "Usage Tracking",
            "Bundle Payments",
          ],
          processingTime: "Instant",
          fee: "NPR 10 service charge",
          href: "/payments",
        },
        {
          title: "Tax Payments",
          description: "Pay income tax, vehicle tax, and other government fees",
          icon: <Banknote className="h-8 w-8" />,
          features: [
            "Income Tax",
            "Vehicle Tax",
            "Property Tax",
            "VAT Payments",
          ],
          processingTime: "Instant",
          fee: "No service charge",
          href: "/payments",
        },
      ],
    },
    {
      id: "health",
      title: "Health Insurance",
      icon: <Heart className="h-6 w-6" />,
      description:
        "Submit and track health insurance claims through SSF system",
      color: "bg-red-500",
      services: [
        {
          title: "SSF Health Claims",
          description:
            "Submit claims to Social Security Fund for medical expenses",
          icon: <Stethoscope className="h-8 w-8" />,
          features: [
            "Claim Submission",
            "Document Upload",
            "Approval Tracking",
            "Direct Reimbursement",
          ],
          processingTime: "10-15 business days",
          fee: "No processing fee",
          href: "/medical",
        },
        {
          title: "Medical Reimbursement",
          description: "Track and manage your medical expense reimbursements",
          icon: <Activity className="h-8 w-8" />,
          features: [
            "Expense Tracking",
            "Receipt Management",
            "Claim History",
            "Payment Status",
          ],
          processingTime: "7-10 business days",
          fee: "No processing fee",
          href: "/medical",
        },
        {
          title: "Digital Health Records",
          description: "Access and manage your digital health records securely",
          icon: <Database className="h-8 w-8" />,
          features: [
            "Medical History",
            "Prescription Records",
            "Lab Reports",
            "Doctor Consultations",
          ],
          processingTime: "Real-time",
          fee: "Free service",
          href: "/medical",
        },
      ],
    },
    {
      id: "dashboard",
      title: "Dashboard & Analytics",
      icon: <BarChart3 className="h-6 w-6" />,
      description: "Monitor applications, payments, and services in one place",
      color: "bg-purple-500",
      services: [
        {
          title: "Application Status",
          description:
            "Track all your government application statuses in real-time",
          icon: <TrendingUp className="h-8 w-8" />,
          features: [
            "Real-time Updates",
            "Progress Tracking",
            "Document Status",
            "Notification Alerts",
          ],
          processingTime: "Real-time",
          fee: "Free service",
          href: "/dashboard",
        },
        {
          title: "Payment History",
          description:
            "View complete history of all bill payments and transactions",
          icon: <BarChart3 className="h-8 w-8" />,
          features: [
            "Transaction History",
            "Payment Analytics",
            "Monthly Reports",
            "Export Data",
          ],
          processingTime: "Real-time",
          fee: "Free service",
          href: "/dashboard",
        },
        {
          title: "Notifications",
          description: "Manage alerts and notifications for all services",
          icon: <Bell className="h-8 w-8" />,
          features: [
            "SMS Alerts",
            "Email Notifications",
            "Due Date Reminders",
            "Status Updates",
          ],
          processingTime: "Instant",
          fee: "Free service",
          href: "/dashboard",
        },
      ],
    },
  ];

  const stats = [
    {
      number: "50K+",
      label: "Active Users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      number: "200+",
      label: "Services Available",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      number: "99.9%",
      label: "Uptime",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    { number: "24/7", label: "Support", icon: <Clock className="h-5 w-5" /> },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              🇳🇵 Government of Nepal Digital Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Complete Digital Services
              <span className="text-primary"> for Nepali Citizens</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Access all government services, pay bills in NPR, manage health
              insurance, and track everything through one comprehensive digital
              platform.
            </p>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Service Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital solutions for all your government, payment,
              and healthcare needs
            </p>
          </div>

          <Tabs defaultValue="government" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {serviceCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center space-x-2"
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {serviceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="text-center mb-8">
                    <div
                      className={`inline-flex items-center justify-center p-3 ${category.color} rounded-full mb-4`}
                    >
                      <div className="text-white">{category.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.services.map((service, index) => (
                      <Card
                        key={index}
                        className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                      >
                        <CardHeader>
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              {service.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {service.title}
                              </CardTitle>
                            </div>
                          </div>
                          <CardDescription className="text-sm">
                            {service.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {/* Features */}
                          <ul className="space-y-2 mb-4">
                            {service.features.map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-center text-xs text-muted-foreground"
                              >
                                <CheckCircle className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>

                          {/* Service Details */}
                          <div className="space-y-2 mb-4 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Processing Time:
                              </span>
                              <span className="font-medium">
                                {service.processingTime}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Fee:
                              </span>
                              <span className="font-medium">{service.fee}</span>
                            </div>
                          </div>

                          <Button className="w-full" asChild>
                            <Link to={service.href}>
                              Access Service{" "}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Security & Support Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Secure & Reliable Platform
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              All services are backed by Nepal government security standards and
              24/7 technical support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="p-4 bg-background rounded-lg shadow-sm border mb-4">
                  <Shield className="h-6 w-6 text-primary mx-auto" />
                </div>
                <h3 className="font-semibold mb-2">Bank-Level Security</h3>
                <p className="text-sm text-muted-foreground">
                  256-bit SSL encryption for all transactions and data
                </p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-background rounded-lg shadow-sm border mb-4">
                  <Clock className="h-6 w-6 text-primary mx-auto" />
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Round-the-clock customer service and technical assistance
                </p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-background rounded-lg shadow-sm border mb-4">
                  <CheckCircle className="h-6 w-6 text-primary mx-auto" />
                </div>
                <h3 className="font-semibold mb-2">Government Certified</h3>
                <p className="text-sm text-muted-foreground">
                  Official Nepal government platform with full compliance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Create your account today and access all Nepal government services
              digitally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Get Help</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
