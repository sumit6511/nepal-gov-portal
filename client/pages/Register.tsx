import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  User,
  Mail,
  Lock,
  FileText,
} from "lucide-react";

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",

    // Address
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Account
    password: "",
    confirmPassword: "",

    // Agreements
    acceptTerms: false,
    acceptPrivacy: false,
    marketingEmails: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const steps = [
    { number: 1, title: "Personal Info", icon: <User className="h-4 w-4" /> },
    { number: 2, title: "Address", icon: <Mail className="h-4 w-4" /> },
    { number: 3, title: "Security", icon: <Lock className="h-4 w-4" /> },
    { number: 4, title: "Agreements", icon: <FileText className="h-4 w-4" /> },
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+977-9[78]\d{8}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid Nepal mobile number (+977-98XXXXXXXX)";
      }
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
    }

    if (step === 2) {
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zipCode) {
        newErrors.zipCode = "ZIP code is required";
      } else if (!/^\d{5}$/.test(formData.zipCode)) {
        newErrors.zipCode = "Please enter a valid 5-digit postal code";
      }
    }

    if (step === 3) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password =
          "Password must contain uppercase, lowercase, and number";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 4) {
      if (!formData.acceptTerms)
        newErrors.acceptTerms = "You must accept the Terms of Service";
      if (!formData.acceptPrivacy)
        newErrors.acceptPrivacy = "You must accept the Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Replace with actual registration logic
      console.log("Registration data:", formData);

      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+977-98XXXXXXXX"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                className={errors.dateOfBirth ? "border-destructive" : ""}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.dateOfBirth}
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                placeholder="Street Address, Ward No."
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && (
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Kathmandu"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-destructive flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.city}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Province</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleInputChange("state", value)}
                >
                  <SelectTrigger
                    className={errors.state ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Province1">Province No. 1</SelectItem>
                    <SelectItem value="Madhesh">Madhesh Pradesh</SelectItem>
                    <SelectItem value="Bagmati">Bagmati Pradesh</SelectItem>
                    <SelectItem value="Gandaki">Gandaki Pradesh</SelectItem>
                    <SelectItem value="Lumbini">Lumbini Pradesh</SelectItem>
                    <SelectItem value="Karnali">Karnali Pradesh</SelectItem>
                    <SelectItem value="Sudurpashchim">Sudurpashchim Pradesh</SelectItem>
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-sm text-destructive flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">Postal Code</Label>
              <Input
                id="zipCode"
                placeholder="44600"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className={errors.zipCode ? "border-destructive" : ""}
              />
              {errors.zipCode && (
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.zipCode}
                </p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={
                    errors.password ? "border-destructive pr-10" : "pr-10"
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.password}
                </p>
              )}
              <div className="text-xs text-muted-foreground">
                Password must contain at least 8 characters with uppercase,
                lowercase, and number
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={
                    errors.confirmPassword
                      ? "border-destructive pr-10"
                      : "pr-10"
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("acceptTerms", checked as boolean)
                  }
                  className={errors.acceptTerms ? "border-destructive" : ""}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="acceptTerms"
                    className="text-sm font-normal cursor-pointer"
                  >
                    I accept the{" "}
                    <Link to="#" className="text-primary hover:underline">
                      Terms of Service
                    </Link>
                  </Label>
                  {errors.acceptTerms && (
                    <p className="text-sm text-destructive flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.acceptTerms}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked) =>
                    handleInputChange("acceptPrivacy", checked as boolean)
                  }
                  className={errors.acceptPrivacy ? "border-destructive" : ""}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="acceptPrivacy"
                    className="text-sm font-normal cursor-pointer"
                  >
                    I accept the{" "}
                    <Link to="#" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                  {errors.acceptPrivacy && (
                    <p className="text-sm text-destructive flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.acceptPrivacy}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketingEmails"
                  checked={formData.marketingEmails}
                  onCheckedChange={(checked) =>
                    handleInputChange("marketingEmails", checked as boolean)
                  }
                />
                <Label
                  htmlFor="marketingEmails"
                  className="text-sm font-normal cursor-pointer"
                >
                  I would like to receive marketing emails about new services
                  and updates
                </Label>
              </div>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Account created successfully! Please check your email to
                  verify your account.
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Registration failed. Please try again or contact support.
                </AlertDescription>
              </Alert>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Create Your Account
            </h1>
            <p className="text-muted-foreground mt-2">
              Join NepalGov Portal to access all Nepal government services digitally
            </p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl text-center">
                Step {currentStep} of 4: {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-center">
                {currentStep === 1 && "Tell us about yourself"}
                {currentStep === 2 && "Where do you live?"}
                {currentStep === 3 && "Secure your account"}
                {currentStep === 4 && "Review and confirm"}
              </CardDescription>

              {/* Progress Bar */}
              <div className="w-full">
                <Progress value={(currentStep / 4) * 100} className="h-2" />
                <div className="flex justify-between mt-2">
                  {steps.map((step) => (
                    <div
                      key={step.number}
                      className={`flex items-center space-x-1 text-xs ${
                        step.number <= currentStep
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.icon}
                      <span className="hidden sm:inline">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button type="button" onClick={handleNext}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                    </Button>
                  )}
                </div>
              </form>

              {/* Sign In Link */}
              <div className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>🔒 Your information is secure and encrypted</p>
            <p>We never share your personal data with third parties</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
