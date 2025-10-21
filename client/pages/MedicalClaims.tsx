import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Upload,
  Heart,
  Pill,
  ClipboardList,
  AlertCircle,
  CheckCircle,
  Clock,
  Shield,
  X,
  Plus,
  Download,
  TrendingUp,
  Stethoscope,
  Hospital,
  FileCheck,
  BarChart3,
  Bell,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Activity,
  Zap,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface FileUpload {
  id: string;
  name: string;
  file: File | null;
  required: boolean;
  uploaded: boolean;
}

interface ClaimHistory {
  id: string;
  date: string;
  claimType: string;
  provider: string;
  amount: number;
  status: "approved" | "pending" | "rejected";
  referenceId: string;
}

export default function MedicalClaims() {
  const [activeTab, setActiveTab] = useState("submit-claim");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [expandedClaim, setExpandedClaim] = useState<string | null>(null);

  // Claim Form State
  const [claimForm, setClaimForm] = useState({
    patientName: "",
    ssf: "",
    dateOfService: "",
    hospitalName: "",
    doctorName: "",
    procedureType: "",
    diagnosis: "",
    billAmount: "",
    claimAmount: "",
    contactNumber: "",
    email: "",
    description: "",
    insuranceId: "",
  });

  const [claimFiles, setClaimFiles] = useState<FileUpload[]>([
    {
      id: "hospital_bill",
      name: "Hospital Bill/Invoice",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "prescription",
      name: "Prescription & Medical Report",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "ssf_form",
      name: "SSF Health Claim Form (IF-10)",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "identity_proof",
      name: "Identity Proof (Citizenship/ID)",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "prescription_slip",
      name: "Pharmacy Receipt",
      file: null,
      required: false,
      uploaded: false,
    },
    {
      id: "lab_report",
      name: "Lab Test Reports",
      file: null,
      required: false,
      uploaded: false,
    },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock Claim History Data
  const claimHistory: ClaimHistory[] = [
    {
      id: "1",
      date: "2024-01-20",
      claimType: "Hospitalization",
      provider: "Nepal Medical College Hospital",
      amount: 45000,
      status: "approved",
      referenceId: "SSF-2024-012001",
    },
    {
      id: "2",
      date: "2024-01-10",
      claimType: "Surgical Procedure",
      provider: "Kathmandu Model Hospital",
      amount: 75000,
      status: "approved",
      referenceId: "SSF-2024-011001",
    },
    {
      id: "3",
      date: "2024-01-05",
      claimType: "Outpatient Treatment",
      provider: "Apollo Hospitals",
      amount: 12500,
      status: "pending",
      referenceId: "SSF-2024-010501",
    },
    {
      id: "4",
      date: "2023-12-28",
      claimType: "Pharmacy",
      provider: "Apollo Pharmacy",
      amount: 5600,
      status: "approved",
      referenceId: "SSF-2023-122801",
    },
  ];

  // Mock Digital Health Records
  const healthRecords = [
    {
      date: "2024-01-20",
      type: "Hospitalization",
      hospital: "Nepal Medical College Hospital",
      diagnosis: "Type 2 Diabetes Management",
      doctor: "Dr. Ram Bahadur Singh",
      tests: ["Blood Sugar Test", "Kidney Function Test"],
    },
    {
      date: "2024-01-10",
      type: "Surgery",
      hospital: "Kathmandu Model Hospital",
      diagnosis: "Appendix Removal",
      doctor: "Dr. Sita Sharma",
      tests: ["Pre-operative Blood Test", "ECG"],
    },
    {
      date: "2023-12-15",
      type: "Checkup",
      hospital: "Apollo Clinics",
      diagnosis: "Annual Health Checkup",
      doctor: "Dr. Rajesh Poudel",
      tests: ["General Health Screening", "Blood Pressure Check"],
    },
  ];

  // Mock Coverage Info
  const coverageInfo = {
    member: "Bishwor Kumar Thapa",
    ssf: "SSF-2024-123456",
    category: "Contributor",
    status: "Active",
    joinDate: "2020-03-15",
    familyMembers: 4,
    availableBenefit: 150000,
    utilizedBenefit: 52500,
    renewalDate: "2024-12-31",
    coveragePlans: [
      {
        name: "Hospitalization",
        limit: 500000,
        covered: true,
        coinsurance: "80-20",
      },
      {
        name: "Outpatient Treatment",
        limit: 100000,
        covered: true,
        coinsurance: "70-30",
      },
      {
        name: "Surgical Procedures",
        limit: 300000,
        covered: true,
        coinsurance: "100%",
      },
      {
        name: "Pharmacy",
        limit: 50000,
        covered: true,
        coinsurance: "50-50",
      },
      {
        name: "Mental Health",
        limit: 30000,
        covered: true,
        coinsurance: "60-40",
      },
      {
        name: "Preventive Care",
        limit: "Unlimited",
        covered: true,
        coinsurance: "100%",
      },
    ],
  };

  const handleFileUpload = (
    fileId: string,
    file: File | null,
  ) => {
    setClaimFiles((prev) =>
      prev.map((item) =>
        item.id === fileId ? { ...item, file, uploaded: !!file } : item,
      ),
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!claimForm.patientName) newErrors.patientName = "Patient name is required";
    if (!claimForm.ssf) newErrors.ssf = "SSF number is required";
    if (!claimForm.dateOfService)
      newErrors.dateOfService = "Date of service is required";
    if (!claimForm.hospitalName)
      newErrors.hospitalName = "Hospital name is required";
    if (!claimForm.billAmount) newErrors.billAmount = "Bill amount is required";
    if (!claimForm.contactNumber)
      newErrors.contactNumber = "Contact number is required";

    // Check required files
    claimFiles.forEach((file) => {
      if (file.required && !file.uploaded) {
        newErrors[file.id] = `${file.name} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Claim submitted:", claimForm);
      setSubmitStatus("success");

      // Reset form
      setTimeout(() => {
        setClaimForm({
          patientName: "",
          ssf: "",
          dateOfService: "",
          hospitalName: "",
          doctorName: "",
          procedureType: "",
          diagnosis: "",
          billAmount: "",
          claimAmount: "",
          contactNumber: "",
          email: "",
          description: "",
          insuranceId: "",
        });
        setClaimFiles(
          claimFiles.map((f) => ({ ...f, file: null, uploaded: false })),
        );
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFileUpload = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground">Required Documents</h4>
      {claimFiles.map((fileItem) => (
        <div key={fileItem.id} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Label className="font-medium">
              {fileItem.name}
              {fileItem.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            {fileItem.uploaded && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleFileUpload(fileItem.id, file);
              }}
              className="flex-1"
            />
            {fileItem.file && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFileUpload(fileItem.id, null)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {errors[fileItem.id] && (
            <p className="text-sm text-destructive mt-1 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors[fileItem.id]}
            </p>
          )}
          {fileItem.file && (
            <p className="text-sm text-muted-foreground mt-1">
              Selected: {fileItem.file.name}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              🏥 Nepal Social Security Fund (SSF) Health Claims
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Health Insurance
              <span className="text-primary"> Claims & Records</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Submit medical claims, track reimbursements, and access your
              digital health records through Nepal's Social Security Fund system.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                {
                  icon: <Clock className="h-5 w-5" />,
                  value: "< 48h",
                  label: "Claim Processing",
                },
                {
                  icon: <CheckCircle className="h-5 w-5" />,
                  value: "98%",
                  label: "Approval Rate",
                },
                {
                  icon: <Shield className="h-5 w-5" />,
                  value: "24/7",
                  label: "Support Available",
                },
                {
                  icon: <Activity className="h-5 w-5" />,
                  value: "10K+",
                  label: "Lives Protected",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 animate-in slide-in-from-bottom duration-1000"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex items-center justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-6xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
              <TabsTrigger
                value="submit-claim"
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Submit Claim</span>
              </TabsTrigger>
              <TabsTrigger
                value="claim-status"
                className="flex items-center space-x-2"
              >
                <ClipboardList className="h-4 w-4" />
                <span>Claim Status</span>
              </TabsTrigger>
              <TabsTrigger
                value="health-records"
                className="flex items-center space-x-2"
              >
                <Heart className="h-4 w-4" />
                <span>Health Records</span>
              </TabsTrigger>
              <TabsTrigger
                value="coverage"
                className="flex items-center space-x-2"
              >
                <Shield className="h-4 w-4" />
                <span>Coverage Details</span>
              </TabsTrigger>
            </TabsList>

            {/* Submit Claim Tab */}
            <TabsContent value="submit-claim">
              <Card>
                <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b">
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-6 w-6 text-primary" />
                    <span>Submit Health Insurance Claim</span>
                  </CardTitle>
                  <CardDescription>
                    File a new claim for medical expenses and reimbursement
                    through the SSF system. Processing time: 48 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Patient Information</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patient-name">Patient Name *</Label>
                        <Input
                          id="patient-name"
                          value={claimForm.patientName}
                          onChange={(e) =>
                            setClaimForm((prev) => ({
                              ...prev,
                              patientName: e.target.value,
                            }))
                          }
                          placeholder="Enter patient's full name"
                        />
                        {errors.patientName && (
                          <p className="text-sm text-destructive flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.patientName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ssf-number">SSF Number *</Label>
                        <Input
                          id="ssf-number"
                          value={claimForm.ssf}
                          onChange={(e) =>
                            setClaimForm((prev) => ({
                              ...prev,
                              ssf: e.target.value,
                            }))
                          }
                          placeholder="SSF-2024-XXXXXX"
                        />
                        {errors.ssf && (
                          <p className="text-sm text-destructive flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.ssf}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center space-x-2">
                      <Stethoscope className="h-5 w-5" />
                      <span>Service Details</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date-of-service">
                          Date of Service *
                        </Label>
                        <Input
                          id="date-of-service"
                          type="date"
                          value={claimForm.dateOfService}
                          onChange={(e) =>
                            setClaimForm((prev) => ({
                              ...prev,
                              dateOfService: e.target.value,
                            }))
                          }
                        />
                        {errors.dateOfService && (
                          <p className="text-sm text-destructive flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.dateOfService}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="procedure-type">Procedure Type</Label>
                        <Select
                          value={claimForm.procedureType}
                          onValueChange={(value) =>
                            setClaimForm((prev) => ({
                              ...prev,
                              procedureType: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select procedure type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consultation">
                              Consultation
                            </SelectItem>
                            <SelectItem value="surgery">Surgery</SelectItem>
                            <SelectItem value="hospitalization">
                              Hospitalization
                            </SelectItem>
                            <SelectItem value="pharmacy">Pharmacy</SelectItem>
                            <SelectItem value="diagnostic">
                              Diagnostic Tests
                            </SelectItem>
                            <SelectItem value="emergency">
                              Emergency Treatment
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hospital-name">Hospital/Clinic Name *</Label>
                        <Input
                          id="hospital-name"
                          value={claimForm.hospitalName}
                          onChange={(e) =>
                            setClaimForm((prev) => ({
                              ...prev,
                              hospitalName: e.target.value,
                            }))
                          }
                          placeholder="Enter hospital or clinic name"
                        />
                        {errors.hospitalName && (
                          <p className="text-sm text-destructive flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.hospitalName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doctor-name">Doctor's Name</Label>
                        <Input
                          id="doctor-name"
                          value={claimForm.doctorName}
                          onChange={(e) =>
                            setClaimForm((prev) => ({
                              ...prev,
                              doctorName: e.target.value,
                            }))
                          }
                          placeholder="Enter attending doctor's name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center space-x-2">
                      <Pill className="h-5 w-5" />
                      <span>Medical Information</span>
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Diagnosis/Condition</Label>
                      <Textarea
                        id="diagnosis"
                        value={claimForm.diagnosis}
                        onChange={(e) =>
                          setClaimForm((prev) => ({
                            ...prev,
                            diagnosis: e.target.value,
                          }))
                        }
                        placeholder="Describe the diagnosis or medical condition"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Treatment Details/Description
                      </Label>
                      <Textarea
                        id="description"
                        value={claimForm.description}
                        onChange={(e) =>
                          setClaimForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Provide detailed information about the treatment received"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Bill Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Bill & Claim Amount</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bill-amount">Total Bill Amount (NPR) *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-muted-foreground">
                            NPR
                          </span>
                          <Input
                            id="bill-amount"
                            type="number"
                            value={claimForm.billAmount}
                            onChange={(e) =>
                              setClaimForm((prev) => ({
                                ...prev,
                                billAmount: e.target.value,
                                claimAmount:
                                  e.target.value.length > 0
                                    ? (parseFloat(e.target.value) * 0.8).toString()
                                    : "",
                              }))
                            }
                            placeholder="Enter total bill amount"
                            className="pl-10"
                          />
                        </div>
                        {errors.billAmount && (
                          <p className="text-sm text-destructive flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.billAmount}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="claim-amount">
                          Claim Amount (NPR)
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-muted-foreground">
                            NPR
                          </span>
                          <Input
                            id="claim-amount"
                            type="number"
                            value={claimForm.claimAmount}
                            onChange={(e) =>
                              setClaimForm((prev) => ({
                                ...prev,
                                claimAmount: e.target.value,
                              }))
                            }
                            placeholder="Calculated as 80% of bill"
                            className="pl-10"
                            disabled
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Calculated as 80% coverage of bill amount
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center space-x-2">
                      <Phone className="h-5 w-5" />
                      <span>Contact Information</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Contact Number *</Label>
                        <Input
                          id="phone"
                          value={claimForm.contactNumber}
                          onChange={(e) =>
                            setClaimForm((prev) => ({
                              ...prev,
                              contactNumber: e.target.value,
                            }))
                          }
                          placeholder="+977-98XXXXXXXX"
                        />
                        {errors.contactNumber && (
                          <p className="text-sm text-destructive flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.contactNumber}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={claimForm.email}
                          onChange={(e) =>
                            setClaimForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* File Upload Section */}
                  {renderFileUpload()}

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Claim submitted successfully! Reference ID: SSF-2024-
                        {Math.random().toString(36).substr(2, 9).toUpperCase()}.
                        Check your email for confirmation.
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === "error" && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Claim submission failed. Please try again or contact
                        support at +977-1-4200100.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Submitting Claim...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Health Claim
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Claim Status Tab */}
            <TabsContent value="claim-status">
              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                  <CardTitle className="flex items-center space-x-2">
                    <ClipboardList className="h-6 w-6 text-primary" />
                    <span>Claim Status & History</span>
                  </CardTitle>
                  <CardDescription>
                    Track your submitted claims and view reimbursement status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Status Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <CardContent className="p-6 text-center">
                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                        <h4 className="font-semibold mb-1">Approved</h4>
                        <p className="text-2xl font-bold text-green-600">2</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                      <CardContent className="p-6 text-center">
                        <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                        <h4 className="font-semibold mb-1">Pending</h4>
                        <p className="text-2xl font-bold text-yellow-600">1</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
                      <CardContent className="p-6 text-center">
                        <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-3" />
                        <h4 className="font-semibold mb-1">Total Claimed</h4>
                        <p className="text-2xl font-bold text-red-600">
                          NPR 138.1K
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Claims List */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Recent Claims</h4>
                    {claimHistory.map((claim) => (
                      <Card
                        key={claim.id}
                        className="group transition-all duration-300 hover:shadow-md border"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-primary/10 rounded-lg">
                                <Heart className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold group-hover:text-primary transition-colors">
                                  {claim.claimType}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {claim.provider} •{" "}
                                  {new Date(claim.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <p className="font-semibold text-lg">
                                  NPR {claim.amount.toLocaleString()}
                                </p>
                                <Badge className={getStatusColor(claim.status)}>
                                  {claim.status.charAt(0).toUpperCase() +
                                    claim.status.slice(1)}
                                </Badge>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setExpandedClaim(
                                    expandedClaim === claim.id ? null : claim.id,
                                  )
                                }
                              >
                                {expandedClaim === claim.id ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {expandedClaim === claim.id && (
                            <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-top duration-300">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="font-medium text-muted-foreground">
                                    Reference ID
                                  </p>
                                  <p className="font-mono">{claim.referenceId}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-muted-foreground">
                                    Submitted Date
                                  </p>
                                  <p>{new Date(claim.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-muted-foreground">
                                    Claim Amount
                                  </p>
                                  <p className="font-semibold">
                                    NPR {claim.amount.toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium text-muted-foreground">
                                    Status
                                  </p>
                                  <p className="font-semibold text-primary">
                                    {claim.status === "approved"
                                      ? "Approved"
                                      : "Under Review"}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-4 space-y-2">
                                <Button
                                  variant="outline"
                                  className="w-full"
                                  size="sm"
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Receipt
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Health Records Tab */}
            <TabsContent value="health-records">
              <Card>
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-6 w-6 text-primary" />
                    <span>Digital Health Records</span>
                  </CardTitle>
                  <CardDescription>
                    Access your medical history and health information from
                    partner hospitals and clinics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Health Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                      <CardContent className="p-6 text-center">
                        <Stethoscope className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                        <h4 className="font-semibold mb-1">
                          Medical Records
                        </h4>
                        <p className="text-2xl font-bold text-blue-600">
                          {healthRecords.length}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <CardContent className="p-6 text-center">
                        <Pill className="h-8 w-8 text-green-600 mx-auto mb-3" />
                        <h4 className="font-semibold mb-1">
                          Active Prescriptions
                        </h4>
                        <p className="text-2xl font-bold text-green-600">3</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                      <CardContent className="p-6 text-center">
                        <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                        <h4 className="font-semibold mb-1">Lab Results</h4>
                        <p className="text-2xl font-bold text-orange-600">8</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Medical Records List */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Recent Medical Records</h4>
                    {healthRecords.map((record, index) => (
                      <Card
                        key={index}
                        className="group transition-all duration-300 hover:shadow-md border"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <Hospital className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold group-hover:text-primary transition-colors">
                                  {record.type} - {record.hospital}
                                </h4>
                                <Badge variant="outline">
                                  {new Date(record.date).toLocaleDateString()}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {record.diagnosis}
                              </p>
                              <p className="text-sm text-muted-foreground mb-3">
                                Doctor: {record.doctor}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {record.tests.map((test, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {test}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Coverage Details Tab */}
            <TabsContent value="coverage">
              <Card>
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span>Coverage & Benefits Details</span>
                  </CardTitle>
                  <CardDescription>
                    View your SSF health insurance coverage details and benefits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Member Information */}
                  <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Member Name
                          </p>
                          <p className="font-semibold text-lg">
                            {coverageInfo.member}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            SSF Number
                          </p>
                          <p className="font-mono font-semibold">
                            {coverageInfo.ssf}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Status
                          </p>
                          <Badge className="bg-green-100 text-green-800">
                            {coverageInfo.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Category
                          </p>
                          <p className="font-semibold">{coverageInfo.category}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Benefit Usage */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <span>Benefit Usage</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Annual Benefit Limit</span>
                          <span className="font-semibold">
                            NPR {coverageInfo.availableBenefit.toLocaleString()}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <Progress
                            value={
                              (coverageInfo.utilizedBenefit /
                                coverageInfo.availableBenefit) *
                              100
                            }
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>
                              Used: NPR{" "}
                              {coverageInfo.utilizedBenefit.toLocaleString()}
                            </span>
                            <span>
                              Remaining: NPR{" "}
                              {(
                                coverageInfo.availableBenefit -
                                coverageInfo.utilizedBenefit
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Coverage Plans */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <FileCheck className="h-5 w-5 text-primary" />
                        <span>Covered Services</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {coverageInfo.coveragePlans.map((plan, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              {plan.covered && (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              )}
                              <div>
                                <p className="font-medium">{plan.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Co-insurance: {plan.coinsurance}
                                </p>
                              </div>
                            </div>
                            <Badge variant="secondary">
                              {typeof plan.limit === "string"
                                ? plan.limit
                                : `NPR ${plan.limit.toLocaleString()}`}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Important Information */}
                  <Alert className="bg-blue-50 border-blue-200">
                    <Bell className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Renewal Date:</strong> Your coverage renews on{" "}
                      {coverageInfo.renewalDate}. Visit your nearest SSF office
                      for renewal at least 30 days before expiration.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Need Help with Your Health Claims?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our support team is available 24/7 to assist you with health
              insurance claims and coverage inquiries.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Secure Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    All claims are encrypted and processed securely through the
                    official SSF system
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Quick Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Most claims are processed within 48 hours with instant email
                    notifications
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact us at +977-1-4200100 or support@ssf.gov.np
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Missing icon import - adding it here
const User = Heart; // Using Heart as a placeholder since we don't have User icon
