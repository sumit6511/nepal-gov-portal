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
  UserCheck,
  IdCard,
  Building,
  AlertCircle,
  CheckCircle,
  Clock,
  Shield,
  X,
  Plus,
  Download,
} from "lucide-react";

interface FileUpload {
  id: string;
  name: string;
  file: File | null;
  required: boolean;
  uploaded: boolean;
}

export default function Government() {
  const [activeTab, setActiveTab] = useState("citizenship");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Citizenship Certificate Form State
  const [citizenshipForm, setCitizenshipForm] = useState({
    applicationType: "",
    fullName: "",
    fatherName: "",
    motherName: "",
    grandfatherName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    permanentAddress: "",
    temporaryAddress: "",
    contactNumber: "",
    email: "",
    maritalStatus: "",
    occupation: "",
    previousCitizenshipNumber: "",
  });

  const [citizenshipFiles, setCitizenshipFiles] = useState<FileUpload[]>([
    {
      id: "birth_certificate",
      name: "Birth Certificate",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "father_citizenship",
      name: "Father's Citizenship",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "mother_citizenship",
      name: "Mother's Citizenship",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "passport_photo",
      name: "Passport Size Photo",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "marriage_certificate",
      name: "Marriage Certificate (if applicable)",
      file: null,
      required: false,
      uploaded: false,
    },
  ]);

  // Passport Form State
  const [passportForm, setPassportForm] = useState({
    applicationType: "",
    serviceType: "",
    fullName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    citizenshipNumber: "",
    fatherName: "",
    motherName: "",
    permanentAddress: "",
    contactNumber: "",
    email: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    previousPassportNumber: "",
    passportOffice: "",
  });

  const [passportFiles, setPassportFiles] = useState<FileUpload[]>([
    {
      id: "citizenship_copy",
      name: "Citizenship Certificate Copy",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "passport_photo",
      name: "Passport Size Photo (2 copies)",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "old_passport",
      name: "Old Passport (for renewal)",
      file: null,
      required: false,
      uploaded: false,
    },
    {
      id: "recommendation_letter",
      name: "Recommendation Letter",
      file: null,
      required: false,
      uploaded: false,
    },
  ]);

  // Business Registration Form State
  const [businessForm, setBusinessForm] = useState({
    businessType: "",
    businessName: "",
    businessNameNepali: "",
    businessAddress: "",
    ownerName: "",
    ownerCitizenship: "",
    contactNumber: "",
    email: "",
    capital: "",
    numberOfEmployees: "",
    businessCategory: "",
    businessDescription: "",
    panNumber: "",
  });

  const [businessFiles, setBusinessFiles] = useState<FileUpload[]>([
    {
      id: "owner_citizenship",
      name: "Owner's Citizenship Certificate",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "passport_photo",
      name: "Passport Size Photo",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "business_plan",
      name: "Business Plan",
      file: null,
      required: true,
      uploaded: false,
    },
    {
      id: "office_rental",
      name: "Office Rental Agreement",
      file: null,
      required: false,
      uploaded: false,
    },
    {
      id: "pan_certificate",
      name: "PAN Certificate",
      file: null,
      required: false,
      uploaded: false,
    },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileUpload = (
    fileArray: FileUpload[],
    setFileArray: React.Dispatch<React.SetStateAction<FileUpload[]>>,
    fileId: string,
    file: File | null,
  ) => {
    setFileArray((prev) =>
      prev.map((item) =>
        item.id === fileId ? { ...item, file, uploaded: !!file } : item,
      ),
    );
  };

  const validateForm = (
    formType: string,
    formData: any,
    files: FileUpload[],
  ) => {
    const newErrors: Record<string, string> = {};

    // Check required fields based on form type
    if (formType === "citizenship") {
      if (!formData.applicationType)
        newErrors.applicationType = "Application type is required";
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.fatherName)
        newErrors.fatherName = "Father's name is required";
      if (!formData.motherName)
        newErrors.motherName = "Mother's name is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.contactNumber)
        newErrors.contactNumber = "Contact number is required";
    }

    // Check required files
    files.forEach((file) => {
      if (file.required && !file.uploaded) {
        newErrors[file.id] = `${file.name} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (formType: string) => {
    let formData, files;

    switch (formType) {
      case "citizenship":
        formData = citizenshipForm;
        files = citizenshipFiles;
        break;
      case "passport":
        formData = passportForm;
        files = passportFiles;
        break;
      case "business":
        formData = businessForm;
        files = businessFiles;
        break;
      default:
        return;
    }

    if (!validateForm(formType, formData, files)) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log(`${formType} application submitted:`, { formData, files });
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFileUpload = (
    files: FileUpload[],
    setFiles: React.Dispatch<React.SetStateAction<FileUpload[]>>,
  ) => (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground">Required Documents</h4>
      {files.map((fileItem) => (
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
                handleFileUpload(files, setFiles, fileItem.id, file);
              }}
              className="flex-1"
            />
            {fileItem.file && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleFileUpload(files, setFiles, fileItem.id, null)
                }
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              🏛️ Nepal Government Document Applications
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Apply for
              <span className="text-primary"> Government Documents</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Submit applications for citizenship certificates, passports, and
              business registration through our secure digital platform.
            </p>
          </div>
        </div>
      </section>

      {/* Application Forms */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-6xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
              <TabsTrigger
                value="citizenship"
                className="flex items-center space-x-2"
              >
                <UserCheck className="h-4 w-4" />
                <span>Citizenship Certificate</span>
              </TabsTrigger>
              <TabsTrigger
                value="passport"
                className="flex items-center space-x-2"
              >
                <IdCard className="h-4 w-4" />
                <span>Passport Services</span>
              </TabsTrigger>
              <TabsTrigger
                value="business"
                className="flex items-center space-x-2"
              >
                <Building className="h-4 w-4" />
                <span>Business Registration</span>
              </TabsTrigger>
            </TabsList>

            {/* Citizenship Certificate Form */}
            <TabsContent value="citizenship">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserCheck className="h-6 w-6 text-primary" />
                    <span>Citizenship Certificate Application</span>
                  </CardTitle>
                  <CardDescription>
                    Apply for new citizenship certificate or renewal. Processing
                    time: 15 business days. Fee: NPR 100
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Application Type */}
                  <div className="space-y-2">
                    <Label htmlFor="citizenship-type">Application Type *</Label>
                    <Select
                      value={citizenshipForm.applicationType}
                      onValueChange={(value) =>
                        setCitizenshipForm((prev) => ({
                          ...prev,
                          applicationType: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select application type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Application</SelectItem>
                        <SelectItem value="renewal">Renewal</SelectItem>
                        <SelectItem value="duplicate">
                          Duplicate Copy
                        </SelectItem>
                        <SelectItem value="correction">
                          Name Correction
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.applicationType && (
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.applicationType}
                      </p>
                    )}
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">
                        Full Name (as per birth certificate) *
                      </Label>
                      <Input
                        id="full-name"
                        value={citizenshipForm.fullName}
                        onChange={(e) =>
                          setCitizenshipForm((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        placeholder="Enter full name"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="father-name">Father's Name *</Label>
                      <Input
                        id="father-name"
                        value={citizenshipForm.fatherName}
                        onChange={(e) =>
                          setCitizenshipForm((prev) => ({
                            ...prev,
                            fatherName: e.target.value,
                          }))
                        }
                        placeholder="Enter father's name"
                      />
                      {errors.fatherName && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.fatherName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mother-name">Mother's Name *</Label>
                      <Input
                        id="mother-name"
                        value={citizenshipForm.motherName}
                        onChange={(e) =>
                          setCitizenshipForm((prev) => ({
                            ...prev,
                            motherName: e.target.value,
                          }))
                        }
                        placeholder="Enter mother's name"
                      />
                      {errors.motherName && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.motherName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grandfather-name">
                        Grandfather's Name
                      </Label>
                      <Input
                        id="grandfather-name"
                        value={citizenshipForm.grandfatherName}
                        onChange={(e) =>
                          setCitizenshipForm((prev) => ({
                            ...prev,
                            grandfatherName: e.target.value,
                          }))
                        }
                        placeholder="Enter grandfather's name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={citizenshipForm.dateOfBirth}
                        onChange={(e) =>
                          setCitizenshipForm((prev) => ({
                            ...prev,
                            dateOfBirth: e.target.value,
                          }))
                        }
                      />
                      {errors.dateOfBirth && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.dateOfBirth}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pob">Place of Birth</Label>
                      <Input
                        id="pob"
                        value={citizenshipForm.placeOfBirth}
                        onChange={(e) =>
                          setCitizenshipForm((prev) => ({
                            ...prev,
                            placeOfBirth: e.target.value,
                          }))
                        }
                        placeholder="District, Municipality"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number *</Label>
                      <Input
                        id="contact"
                        value={citizenshipForm.contactNumber}
                        onChange={(e) =>
                          setCitizenshipForm((prev) => ({
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
                        value={citizenshipForm.email}
                        onChange={(e) =>
                          setCitizenshipForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="permanent-address">
                        Permanent Address
                      </Label>
                      <Textarea
                        id="permanent-address"
                        value={citizenshipForm.permanentAddress}
                        onChange={(e) =>
                          setCitizenshipForm((prev) => ({
                            ...prev,
                            permanentAddress: e.target.value,
                          }))
                        }
                        placeholder="Ward No., Municipality/VDC, District"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temporary-address">
                        Temporary Address
                      </Label>
                      <Textarea
                        id="temporary-address"
                        value={citizenshipForm.temporaryAddress}
                        onChange={(e) =>
                          setCitizenshipForm((prev) => ({
                            ...prev,
                            temporaryAddress: e.target.value,
                          }))
                        }
                        placeholder="Ward No., Municipality/VDC, District"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="marital-status">Marital Status</Label>
                      <Select
                        value={citizenshipForm.maritalStatus}
                        onValueChange={(value) =>
                          setCitizenshipForm((prev) => ({
                            ...prev,
                            maritalStatus: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select marital status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married">Married</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        value={citizenshipForm.occupation}
                        onChange={(e) =>
                          setCitizenshipForm((prev) => ({
                            ...prev,
                            occupation: e.target.value,
                          }))
                        }
                        placeholder="Enter occupation"
                      />
                    </div>
                  </div>

                  {/* File Upload Section */}
                  {renderFileUpload(citizenshipFiles, setCitizenshipFiles)}

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Application submitted successfully! Reference ID:
                        CIT-2024-
                        {Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === "error" && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Application submission failed. Please try again or
                        contact support.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    onClick={() => handleSubmit("citizenship")}
                    disabled={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Submit Citizenship Application
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Passport Services Form - Placeholder for now */}
            <TabsContent value="passport">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <IdCard className="h-6 w-6 text-primary" />
                    <span>Passport Application</span>
                  </CardTitle>
                  <CardDescription>
                    Apply for new passport or renewal. Processing time: 21
                    business days. Fee: NPR 5,000 - 15,000
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <IdCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Passport Application Form
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive passport application form coming soon...
                    </p>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Application Form
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Business Registration Form - Placeholder for now */}
            <TabsContent value="business">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-6 w-6 text-primary" />
                    <span>Business Registration</span>
                  </CardTitle>
                  <CardDescription>
                    Register your business and obtain licenses. Processing time:
                    7 business days. Fee: NPR 1,000+
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Business Registration Form
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Business registration form coming soon...
                    </p>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Registration Form
                    </Button>
                  </div>
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
              Need Help with Your Application?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our support team is available 24/7 to assist you with document
              applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Secure Process</h3>
                  <p className="text-sm text-muted-foreground">
                    All applications are encrypted and securely processed
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Track Status</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your application status in real-time
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Quick Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Fast-track processing for urgent applications
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
