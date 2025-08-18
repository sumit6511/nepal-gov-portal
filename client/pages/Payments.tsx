import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, 
  Zap, 
  Droplets, 
  Wifi, 
  Banknote, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Receipt,
  History,
  Smartphone,
  Car,
  Home,
  Building2,
  Shield,
  ArrowRight,
  Download,
  Search,
  Eye,
  TrendingUp,
  Calculator,
  Bell,
  Star,
  Wallet,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap as Lightning,
  Timer
} from 'lucide-react';

interface PaymentHistory {
  id: string;
  date: string;
  service: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  referenceId: string;
}

interface QuickPayment {
  id: string;
  service: string;
  provider: string;
  amount: number;
  dueDate: string;
  icon: JSX.Element;
  color: string;
}

export default function Payments() {
  const [activeTab, setActiveTab] = useState('quick-pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showBillDetails, setShowBillDetails] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [loadingBill, setLoadingBill] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);

  // Enhanced form states with validation
  const [electricityForm, setElectricityForm] = useState({
    customerNumber: '',
    consumerName: '',
    billMonth: '',
    amount: '',
    phoneNumber: '',
    email: '',
    autoFill: false
  });

  const [waterForm, setWaterForm] = useState({
    customerNumber: '',
    municipality: '',
    consumerName: '',
    billMonth: '',
    amount: '',
    phoneNumber: '',
    estimatedUsage: ''
  });

  const [internetForm, setInternetForm] = useState({
    provider: '',
    customerNumber: '',
    accountName: '',
    planType: '',
    billMonth: '',
    amount: '',
    phoneNumber: '',
    dataUsage: '',
    speedPlan: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});

  // Quick payment suggestions
  const quickPayments: QuickPayment[] = [
    {
      id: '1',
      service: 'NEA Electricity',
      provider: 'Nepal Electricity Authority',
      amount: 2450,
      dueDate: '2024-02-15',
      icon: <Zap className="h-6 w-6" />,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: '2',
      service: 'WorldLink Internet',
      provider: 'WorldLink Communications',
      amount: 1500,
      dueDate: '2024-02-10',
      icon: <Wifi className="h-6 w-6" />,
      color: 'from-blue-400 to-purple-500'
    },
    {
      id: '3',
      service: 'Water Bill',
      provider: 'Kathmandu Metropolitan',
      amount: 800,
      dueDate: '2024-02-20',
      icon: <Droplets className="h-6 w-6" />,
      color: 'from-cyan-400 to-blue-500'
    }
  ];

  // Enhanced payment history with more details
  const paymentHistory: PaymentHistory[] = [
    {
      id: '1',
      date: '2024-01-15',
      service: 'NEA Electricity',
      amount: 2500,
      status: 'completed',
      referenceId: 'NEA2024011501'
    },
    {
      id: '2',
      date: '2024-01-10',
      service: 'Worldlink Internet',
      amount: 1500,
      status: 'completed',
      referenceId: 'WL2024011001'
    },
    {
      id: '3',
      date: '2024-01-05',
      service: 'Vehicle Tax',
      amount: 5000,
      status: 'pending',
      referenceId: 'VT2024010501'
    },
    {
      id: '4',
      date: '2024-01-01',
      service: 'Water Bill',
      amount: 750,
      status: 'completed',
      referenceId: 'WB2024010101'
    }
  ];

  // Mock data for interactive features
  const mockBillDetails = {
    electricity: {
      customerNumber: '123456789',
      consumerName: 'Ram Bahadur Thapa',
      address: 'Ward No. 5, Kathmandu Metropolitan City',
      billMonth: 'January 2024',
      previousReading: '1250',
      currentReading: '1350',
      unitsConsumed: '100',
      ratePerUnit: '9.50',
      energyCharge: '950.00',
      serviceCharge: '50.00',
      governmentTax: '95.00',
      totalAmount: '1095.00',
      dueDate: '2024-02-15',
      lateFee: '0.00'
    },
    suggestions: [
      'Enable auto-pay to avoid late fees',
      'Your usage is 15% higher than last month',
      'Consider energy-saving appliances to reduce costs'
    ]
  };

  // Animation and interactive effects
  useEffect(() => {
    setAnimateCards(true);
    const timer = setTimeout(() => {
      setAnimateCards(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgressValue(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    } else {
      setProgressValue(0);
    }
  }, [isProcessing]);

  // Real-time validation
  const validateField = (field: string, value: string, formType: string) => {
    let isValid = false;
    let errorMessage = '';

    switch (field) {
      case 'customerNumber':
        isValid = /^\d{8,12}$/.test(value);
        errorMessage = isValid ? '' : 'Customer number must be 8-12 digits';
        break;
      case 'phoneNumber':
        isValid = /^\+977-9[78]\d{8}$/.test(value);
        errorMessage = isValid ? '' : 'Enter valid Nepal mobile (+977-98XXXXXXXX)';
        break;
      case 'email':
        isValid = !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        errorMessage = isValid ? '' : 'Enter valid email address';
        break;
      case 'amount':
        isValid = parseFloat(value) > 0;
        errorMessage = isValid ? '' : 'Amount must be greater than 0';
        break;
      default:
        isValid = value.trim().length > 0;
        errorMessage = isValid ? '' : 'This field is required';
    }

    setValidFields(prev => ({ ...prev, [`${formType}_${field}`]: isValid }));
    if (!isValid && value) {
      setErrors(prev => ({ ...prev, [`${formType}_${field}`]: errorMessage }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${formType}_${field}`];
        return newErrors;
      });
    }

    return isValid;
  };

  // Smart bill lookup with animations
  const handleBillLookup = async (formType: string) => {
    setLoadingBill(true);
    setProgressValue(0);

    // Simulate progressive loading
    const steps = [
      { progress: 20, message: 'Connecting to server...' },
      { progress: 40, message: 'Validating customer number...' },
      { progress: 60, message: 'Fetching bill details...' },
      { progress: 80, message: 'Calculating charges...' },
      { progress: 100, message: 'Bill loaded successfully!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setProgressValue(step.progress);
    }

    if (formType === 'electricity' && electricityForm.customerNumber) {
      setElectricityForm(prev => ({
        ...prev,
        consumerName: mockBillDetails.electricity.consumerName,
        amount: mockBillDetails.electricity.totalAmount,
        autoFill: true
      }));
      setShowBillDetails(true);
    }

    setLoadingBill(false);
  };

  // Enhanced payment processing
  const handleQuickPayment = async (payment: QuickPayment) => {
    setIsProcessing(true);
    setPaymentStatus('idle');
    setProgressValue(0);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Quick payment processed:', payment);
      setPaymentStatus('success');
    } catch (error) {
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async (formType: string) => {
    setIsProcessing(true);
    setPaymentStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setPaymentStatus('success');
    } catch (error) {
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Interactive utility functions
  const calculateBillEstimate = (usage: number, rate: number) => {
    return (usage * rate).toFixed(2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              💳 Smart Bill Payments in NPR
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pay Bills
              <span className="text-primary"> Instantly</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Smart, secure, and instant bill payments for all your Nepal utilities and services.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: <Lightning className="h-5 w-5" />, value: "< 30s", label: "Payment Time" },
                { icon: <Shield className="h-5 w-5" />, value: "99.9%", label: "Success Rate" },
                { icon: <CheckCircle className="h-5 w-5" />, value: "24/7", label: "Available" },
                { icon: <Star className="h-5 w-5" />, value: "4.9★", label: "User Rating" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                  <div className="flex items-center justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Payment Services with Modern Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="quick-pay" className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Lightning className="h-4 w-4" />
                <span className="hidden sm:inline">Quick Pay</span>
              </TabsTrigger>
              <TabsTrigger value="electricity" className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">NEA</span>
              </TabsTrigger>
              <TabsTrigger value="water" className="flex items-center space-x-2">
                <Droplets className="h-4 w-4" />
                <span className="hidden sm:inline">Water</span>
              </TabsTrigger>
              <TabsTrigger value="internet" className="flex items-center space-x-2">
                <Wifi className="h-4 w-4" />
                <span className="hidden sm:inline">Internet</span>
              </TabsTrigger>
              <TabsTrigger value="tax" className="flex items-center space-x-2">
                <Banknote className="h-4 w-4" />
                <span className="hidden sm:inline">Taxes</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center space-x-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
            </TabsList>

            {/* Quick Pay - New Interactive Dashboard */}
            <TabsContent value="quick-pay">
              <div className="space-y-8">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {quickPayments.map((payment, index) => (
                    <Card 
                      key={payment.id} 
                      className={`group hover:shadow-xl transition-all duration-500 cursor-pointer border-2 hover:border-primary/50 bg-gradient-to-br ${payment.color} p-1 ${animateCards ? 'animate-in slide-in-from-left duration-1000' : ''}`}
                      style={{ animationDelay: `${index * 150}ms` }}
                      onClick={() => handleQuickPayment(payment)}
                    >
                      <div className="bg-background rounded-lg p-6 h-full">
                        <CardHeader className="p-0 mb-4">
                          <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-full bg-gradient-to-br ${payment.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              {payment.icon}
                            </div>
                            <Badge className={`${getDaysUntilDue(payment.dueDate) <= 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                              {getDaysUntilDue(payment.dueDate)} days
                            </Badge>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {payment.service}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {payment.provider}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-primary">
                              NPR {payment.amount.toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Due: {new Date(payment.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay Now
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Recent Activity & Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Spending Overview */}
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <span>This Month's Spending</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-3xl font-bold text-primary">NPR 8,750</div>
                        <div className="flex items-center space-x-2 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm">12% less than last month</span>
                        </div>
                        <div className="space-y-3">
                          {[
                            { name: 'Electricity', amount: 2450, percentage: 28 },
                            { name: 'Internet', amount: 1500, percentage: 17 },
                            { name: 'Water', amount: 800, percentage: 9 },
                            { name: 'Vehicle Tax', amount: 4000, percentage: 46 }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">{item.name}</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={item.percentage} className="w-16 h-2" />
                                <span className="text-sm font-medium">NPR {item.amount}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Smart Suggestions */}
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span>Smart Suggestions</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockBillDetails.suggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="p-1 rounded-full bg-primary/10">
                              <Bell className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">{suggestion}</span>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full">
                          <Timer className="mr-2 h-4 w-4" />
                          Set Up Auto-Pay
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Enhanced NEA Electricity Bills */}
            <TabsContent value="electricity">
              <Card className="hover:shadow-xl transition-shadow duration-500">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg text-white shadow-lg">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <span>NEA Electricity Bill Payment</span>
                      <p className="text-sm text-muted-foreground font-normal">
                        Smart bill lookup with instant calculations
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Enhanced Customer Number Input */}
                  <div className="space-y-2">
                    <Label htmlFor="customer-number" className="text-base font-medium">Customer Number</Label>
                    <div className="flex space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          id="customer-number"
                          value={electricityForm.customerNumber}
                          onChange={(e) => {
                            setElectricityForm(prev => ({ ...prev, customerNumber: e.target.value }));
                            validateField('customerNumber', e.target.value, 'electricity');
                          }}
                          placeholder="Enter 8-12 digit customer number"
                          className={`pr-10 ${validFields.electricity_customerNumber ? 'border-green-500' : errors.electricity_customerNumber ? 'border-red-500' : ''}`}
                        />
                        {validFields.electricity_customerNumber && (
                          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => handleBillLookup('electricity')}
                        disabled={!electricityForm.customerNumber || loadingBill}
                        className="px-6 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        {loadingBill ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                        <span className="ml-2 hidden sm:inline">Lookup</span>
                      </Button>
                    </div>
                    {errors.electricity_customerNumber && (
                      <p className="text-sm text-destructive flex items-center animate-in slide-in-from-left duration-300">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.electricity_customerNumber}
                      </p>
                    )}
                  </div>

                  {/* Loading Progress */}
                  {loadingBill && (
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 animate-in slide-in-from-top duration-500">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                          <span className="font-medium">Looking up your bill...</span>
                        </div>
                        <Progress value={progressValue} className="h-2 mb-2" />
                        <p className="text-sm text-muted-foreground">This usually takes a few seconds</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Enhanced Bill Details */}
                  {showBillDetails && electricityForm.consumerName && (
                    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200 animate-in slide-in-from-top duration-500">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Receipt className="h-5 w-5 text-green-600" />
                          <span>Bill Details</span>
                          <Badge className="bg-green-100 text-green-800">Verified</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="font-medium">Consumer Name:</span>
                              <span className="text-primary font-semibold">{mockBillDetails.electricity.consumerName}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="font-medium">Bill Month:</span>
                              <span>{mockBillDetails.electricity.billMonth}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="font-medium">Previous Reading:</span>
                              <span>{mockBillDetails.electricity.previousReading} kWh</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="font-medium">Current Reading:</span>
                              <span>{mockBillDetails.electricity.currentReading} kWh</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="font-medium">Units Consumed:</span>
                              <span className="font-semibold">{mockBillDetails.electricity.unitsConsumed} kWh</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="font-medium">Energy Charge:</span>
                              <span>NPR {mockBillDetails.electricity.energyCharge}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="font-medium">Service Charge:</span>
                              <span>NPR {mockBillDetails.electricity.serviceCharge}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="font-medium">Government Tax:</span>
                              <span>NPR {mockBillDetails.electricity.governmentTax}</span>
                            </div>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                          <span className="text-lg font-bold">Total Amount:</span>
                          <span className="text-2xl font-bold text-primary">NPR {mockBillDetails.electricity.totalAmount}</span>
                        </div>
                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <p className="text-sm text-yellow-800">
                            <Clock className="inline h-4 w-4 mr-1" />
                            Due Date: {mockBillDetails.electricity.dueDate} (No late fee applied)
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Enhanced Payment Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={electricityForm.phoneNumber}
                        onChange={(e) => {
                          setElectricityForm(prev => ({ ...prev, phoneNumber: e.target.value }));
                          validateField('phoneNumber', e.target.value, 'electricity');
                        }}
                        placeholder="+977-98XXXXXXXX"
                        className={validFields.electricity_phoneNumber ? 'border-green-500' : errors.electricity_phoneNumber ? 'border-red-500' : ''}
                      />
                      {errors.electricity_phoneNumber && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.electricity_phoneNumber}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={electricityForm.email}
                        onChange={(e) => {
                          setElectricityForm(prev => ({ ...prev, email: e.target.value }));
                          validateField('email', e.target.value, 'electricity');
                        }}
                        placeholder="your.email@example.com"
                        className={validFields.electricity_email ? 'border-green-500' : errors.electricity_email ? 'border-red-500' : ''}
                      />
                    </div>
                  </div>

                  {/* Status Messages */}
                  {paymentStatus === 'success' && (
                    <Alert className="border-green-200 bg-green-50 animate-in slide-in-from-top duration-500">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <strong>Payment Successful!</strong><br />
                        Reference ID: NEA-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}<br />
                        SMS confirmation sent to {electricityForm.phoneNumber}
                      </AlertDescription>
                    </Alert>
                  )}

                  {paymentStatus === 'error' && (
                    <Alert variant="destructive" className="animate-in slide-in-from-top duration-500">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Payment failed. Please check your details and try again, or contact support at +977-1-4200100.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Enhanced Payment Button */}
                  <div className="space-y-4">
                    {isProcessing && (
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                            <span className="font-medium">Processing your payment...</span>
                          </div>
                          <Progress value={progressValue} className="h-2" />
                          <p className="text-sm text-muted-foreground mt-2">
                            Please don't close this window. This may take up to 30 seconds.
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    <Button 
                      onClick={() => handlePayment('electricity')}
                      disabled={isProcessing || !electricityForm.amount || !electricityForm.phoneNumber}
                      className="w-full h-12 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <Wallet className="mr-2 h-5 w-5" />
                          Pay NPR {electricityForm.amount || '0'} 
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        <Shield className="inline h-4 w-4 mr-1" />
                        Secured by 256-bit SSL encryption
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Water Bills - More Interactive */}
            <TabsContent value="water">
              <Card className="hover:shadow-xl transition-shadow duration-500">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg text-white shadow-lg">
                      <Droplets className="h-6 w-6" />
                    </div>
                    <div>
                      <span>Municipal Water Bill Payment</span>
                      <p className="text-sm text-muted-foreground font-normal">
                        Pay water bills for major Nepal municipalities
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="municipality">Municipality *</Label>
                      <Select
                        value={waterForm.municipality}
                        onValueChange={(value) => setWaterForm(prev => ({ ...prev, municipality: value }))}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your municipality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kathmandu">
                            <div className="flex items-center space-x-2">
                              <Building2 className="h-4 w-4" />
                              <span>Kathmandu Metropolitan City</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="lalitpur">Lalitpur Metropolitan City</SelectItem>
                          <SelectItem value="bhaktapur">Bhaktapur Municipality</SelectItem>
                          <SelectItem value="pokhara">Pokhara Metropolitan City</SelectItem>
                          <SelectItem value="biratnagar">Biratnagar Metropolitan City</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="water-customer">Customer Number *</Label>
                      <Input
                        id="water-customer"
                        value={waterForm.customerNumber}
                        onChange={(e) => setWaterForm(prev => ({ ...prev, customerNumber: e.target.value }))}
                        placeholder="Enter customer number"
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Water Usage Calculator */}
                  <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <Calculator className="h-5 w-5 text-cyan-600" />
                        <span>Usage Calculator</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="estimated-usage">Estimated Usage (Liters)</Label>
                          <Input
                            id="estimated-usage"
                            value={waterForm.estimatedUsage}
                            onChange={(e) => setWaterForm(prev => ({ ...prev, estimatedUsage: e.target.value }))}
                            placeholder="e.g., 15000"
                            type="number"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button variant="outline" className="w-full">
                            <Calculator className="mr-2 h-4 w-4" />
                            Calculate Bill
                          </Button>
                        </div>
                        <div className="flex items-end">
                          <div className="w-full p-3 bg-primary/10 rounded-lg border">
                            <p className="text-sm text-muted-foreground">Estimated Amount</p>
                            <p className="text-lg font-bold text-primary">
                              NPR {waterForm.estimatedUsage ? calculateBillEstimate(parseInt(waterForm.estimatedUsage), 0.05) : '0'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center p-6 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full mb-4">
                      <Droplets className="h-16 w-16 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Water Bill Payment</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Complete integration with municipal water systems coming soon. Advanced usage tracking and smart billing features.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button variant="outline" size="lg">
                        <Search className="mr-2 h-4 w-4" />
                        Look Up Bill
                      </Button>
                      <Button size="lg">
                        <Bell className="mr-2 h-4 w-4" />
                        Notify When Ready
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Internet/Telecom */}
            <TabsContent value="internet">
              <Card className="hover:shadow-xl transition-shadow duration-500">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-3 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg text-white shadow-lg">
                      <Wifi className="h-6 w-6" />
                    </div>
                    <div>
                      <span>Internet & Telecom Bills</span>
                      <p className="text-sm text-muted-foreground font-normal">
                        Pay for all major Nepal ISPs and telecom providers
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Provider Selection with Enhanced UI */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { id: 'worldlink', name: 'WorldLink', logo: '🌐', color: 'from-blue-500 to-purple-600' },
                      { id: 'ntc', name: 'Nepal Telecom', logo: '📡', color: 'from-red-500 to-pink-600' },
                      { id: 'ncell', name: 'Ncell', logo: '📱', color: 'from-purple-500 to-indigo-600' },
                      { id: 'dishhome', name: 'Dish Home', logo: '📺', color: 'from-orange-500 to-red-600' },
                      { id: 'subisu', name: 'Subisu', logo: '🔗', color: 'from-green-500 to-teal-600' },
                      { id: 'classictech', name: 'Classic Tech', logo: '💻', color: 'from-gray-500 to-gray-700' }
                    ].map((provider, index) => (
                      <Card 
                        key={provider.id} 
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${internetForm.provider === provider.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                        onClick={() => setInternetForm(prev => ({ ...prev, provider: provider.id }))}
                      >
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${provider.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                            {provider.logo}
                          </div>
                          <h4 className="font-medium text-sm">{provider.name}</h4>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {internetForm.provider && (
                    <Card className="animate-in slide-in-from-top duration-500 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {internetForm.provider.charAt(0).toUpperCase() + internetForm.provider.slice(1)} Bill Payment
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="internet-customer">Customer/Account Number *</Label>
                            <Input
                              id="internet-customer"
                              value={internetForm.customerNumber}
                              onChange={(e) => setInternetForm(prev => ({ ...prev, customerNumber: e.target.value }))}
                              placeholder="Enter customer number"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="plan-type">Service Type</Label>
                            <Select
                              value={internetForm.planType}
                              onValueChange={(value) => setInternetForm(prev => ({ ...prev, planType: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select service type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="broadband">Broadband Internet</SelectItem>
                                <SelectItem value="mobile">Mobile Postpaid</SelectItem>
                                <SelectItem value="landline">Landline</SelectItem>
                                <SelectItem value="iptv">IPTV/Cable TV</SelectItem>
                                <SelectItem value="bundle">Bundle Package</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white">
                            <Search className="mr-2 h-5 w-5" />
                            Look Up Bill Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {!internetForm.provider && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center p-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-4">
                        <Wifi className="h-16 w-16 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Select Your Provider</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Choose your internet or telecom service provider from the options above to continue with bill payment.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tax Payments - Enhanced */}
            <TabsContent value="tax">
              <Card className="hover:shadow-xl transition-shadow duration-500">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg text-white shadow-lg">
                      <Banknote className="h-6 w-6" />
                    </div>
                    <div>
                      <span>Government Tax Payments</span>
                      <p className="text-sm text-muted-foreground font-normal">
                        Pay all government taxes securely online
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { 
                        id: 'vehicle', 
                        title: 'Vehicle Tax', 
                        description: 'Annual vehicle tax and registration renewal',
                        icon: <Car className="h-8 w-8" />,
                        color: 'from-blue-500 to-cyan-600',
                        amount: 'NPR 3,000 - 15,000',
                        deadline: '2024-03-31'
                      },
                      { 
                        id: 'property', 
                        title: 'Property Tax', 
                        description: 'Municipal property tax payments',
                        icon: <Home className="h-8 w-8" />,
                        color: 'from-green-500 to-emerald-600',
                        amount: 'NPR 5,000 - 50,000',
                        deadline: '2024-04-15'
                      },
                      { 
                        id: 'income', 
                        title: 'Income Tax', 
                        description: 'Individual and business income tax',
                        icon: <Building2 className="h-8 w-8" />,
                        color: 'from-purple-500 to-indigo-600',
                        amount: 'Calculated based on income',
                        deadline: '2024-07-15'
                      }
                    ].map((tax, index) => (
                      <Card 
                        key={tax.id} 
                        className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50"
                      >
                        <CardContent className="p-6">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${tax.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {tax.icon}
                          </div>
                          <h3 className="font-semibold text-lg text-center mb-2 group-hover:text-primary transition-colors">
                            {tax.title}
                          </h3>
                          <p className="text-sm text-muted-foreground text-center mb-4">
                            {tax.description}
                          </p>
                          <div className="space-y-2 text-center">
                            <p className="text-sm font-medium text-primary">{tax.amount}</p>
                            <p className="text-xs text-muted-foreground">Due: {tax.deadline}</p>
                          </div>
                          <Button className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            Pay {tax.title}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Secure Government Portal:</strong> All tax payments are processed through the official 
                      Nepal government secure payment gateway with instant confirmation and digital receipts.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Payment History */}
            <TabsContent value="history">
              <Card className="hover:shadow-xl transition-shadow duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <History className="h-6 w-6 text-gray-600" />
                      </div>
                      <span>Payment History</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export All
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    View all your payment transactions and download receipts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <Card 
                        key={payment.id} 
                        className={`group transition-all duration-300 hover:shadow-md border ${expandedHistory === payment.id ? 'border-primary/50 bg-primary/5' : 'border-border'}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-primary/10 rounded-lg">
                                {payment.service.includes('NEA') && <Zap className="h-6 w-6 text-yellow-600" />}
                                {payment.service.includes('Worldlink') && <Wifi className="h-6 w-6 text-purple-600" />}
                                {payment.service.includes('Vehicle') && <Car className="h-6 w-6 text-green-600" />}
                                {payment.service.includes('Water') && <Droplets className="h-6 w-6 text-blue-600" />}
                              </div>
                              <div>
                                <h4 className="font-semibold group-hover:text-primary transition-colors">
                                  {payment.service}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(payment.date).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <p className="font-semibold text-lg">NPR {payment.amount.toLocaleString()}</p>
                                <Badge className={getStatusColor(payment.status)}>
                                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setExpandedHistory(expandedHistory === payment.id ? null : payment.id)}
                                >
                                  {expandedHistory === payment.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {expandedHistory === payment.id && (
                            <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-top duration-300">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="font-medium text-muted-foreground">Reference ID</p>
                                  <p className="font-mono">{payment.referenceId}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-muted-foreground">Payment Method</p>
                                  <p>eSewa / Khalti</p>
                                </div>
                                <div>
                                  <p className="font-medium text-muted-foreground">Processing Time</p>
                                  <p>Instant</p>
                                </div>
                                <div>
                                  <p className="font-medium text-muted-foreground">Service Charge</p>
                                  <p>NPR 0</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button variant="outline">
                      <History className="mr-2 h-4 w-4" />
                      Load More Transactions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Enhanced Security & Features */}
      <section className="py-16 bg-gradient-to-br from-muted/50 to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose Our Payment Platform?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced security, instant processing, and smart features designed for Nepal's digital future.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: 'Bank-Level Security',
                  description: '256-bit SSL encryption with multi-factor authentication and fraud detection.',
                  color: 'from-green-500 to-emerald-600'
                },
                {
                  icon: <Lightning className="h-8 w-8" />,
                  title: 'Instant Processing',
                  description: 'Lightning-fast payments with real-time confirmation and SMS notifications.',
                  color: 'from-blue-500 to-cyan-600'
                },
                {
                  icon: <Smartphone className="h-8 w-8" />,
                  title: 'Smart Features',
                  description: 'Auto-pay, usage tracking, smart suggestions, and predictive billing.',
                  color: 'from-purple-500 to-indigo-600'
                },
                {
                  icon: <Receipt className="h-8 w-8" />,
                  title: 'Digital Receipts',
                  description: 'Instant digital receipts with QR codes for easy verification and storage.',
                  color: 'from-orange-500 to-red-600'
                },
                {
                  icon: <TrendingUp className="h-8 w-8" />,
                  title: 'Analytics Dashboard',
                  description: 'Track spending patterns, set budgets, and get insights on your payments.',
                  color: 'from-pink-500 to-rose-600'
                },
                {
                  icon: <Star className="h-8 w-8" />,
                  title: '24/7 Support',
                  description: 'Round-the-clock customer support with live chat and phone assistance.',
                  color: 'from-yellow-500 to-orange-600'
                }
              ].map((feature, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20"
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
