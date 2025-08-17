import { useState } from 'react';
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
  Eye
} from 'lucide-react';

interface PaymentHistory {
  id: string;
  date: string;
  service: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  referenceId: string;
}

export default function Payments() {
  const [activeTab, setActiveTab] = useState('electricity');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showBillDetails, setShowBillDetails] = useState(false);

  // NEA Electricity Form State
  const [electricityForm, setElectricityForm] = useState({
    customerNumber: '',
    consumerName: '',
    billMonth: '',
    amount: '',
    phoneNumber: '',
    email: ''
  });

  // Water Bill Form State
  const [waterForm, setWaterForm] = useState({
    customerNumber: '',
    municipality: '',
    consumerName: '',
    billMonth: '',
    amount: '',
    phoneNumber: ''
  });

  // Internet/Telecom Form State
  const [internetForm, setInternetForm] = useState({
    provider: '',
    customerNumber: '',
    accountName: '',
    planType: '',
    billMonth: '',
    amount: '',
    phoneNumber: ''
  });

  // Tax Payment Form State
  const [taxForm, setTaxForm] = useState({
    taxType: '',
    panNumber: '',
    taxpayerName: '',
    fiscalYear: '',
    taxAmount: '',
    phoneNumber: '',
    vehicleNumber: '', // for vehicle tax
    propertyId: '' // for property tax
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock payment history
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
    }
  ];

  // Mock bill details
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
      governmentTax: '45.00',
      totalAmount: '1045.00'
    }
  };

  const validateForm = (formType: string, formData: any) => {
    const newErrors: Record<string, string> = {};

    if (formType === 'electricity') {
      if (!formData.customerNumber) newErrors.customerNumber = 'Customer number is required';
      if (!formData.billMonth) newErrors.billMonth = 'Bill month is required';
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    }

    if (formType === 'water') {
      if (!formData.customerNumber) newErrors.customerNumber = 'Customer number is required';
      if (!formData.municipality) newErrors.municipality = 'Municipality is required';
      if (!formData.billMonth) newErrors.billMonth = 'Bill month is required';
    }

    if (formType === 'internet') {
      if (!formData.provider) newErrors.provider = 'Service provider is required';
      if (!formData.customerNumber) newErrors.customerNumber = 'Customer number is required';
      if (!formData.billMonth) newErrors.billMonth = 'Bill month is required';
    }

    if (formType === 'tax') {
      if (!formData.taxType) newErrors.taxType = 'Tax type is required';
      if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
      if (!formData.taxpayerName) newErrors.taxpayerName = 'Taxpayer name is required';
      if (!formData.taxAmount) newErrors.taxAmount = 'Tax amount is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBillLookup = async (formType: string) => {
    // Simulate bill lookup
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (formType === 'electricity' && electricityForm.customerNumber) {
      setElectricityForm(prev => ({
        ...prev,
        consumerName: mockBillDetails.electricity.consumerName,
        amount: mockBillDetails.electricity.totalAmount
      }));
      setShowBillDetails(true);
    }
    
    setIsProcessing(false);
  };

  const handlePayment = async (formType: string) => {
    let formData;
    
    switch (formType) {
      case 'electricity':
        formData = electricityForm;
        break;
      case 'water':
        formData = waterForm;
        break;
      case 'internet':
        formData = internetForm;
        break;
      case 'tax':
        formData = taxForm;
        break;
      default:
        return;
    }

    if (!validateForm(formType, formData)) return;

    setIsProcessing(true);
    setPaymentStatus('idle');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log(`${formType} payment processed:`, formData);
      setPaymentStatus('success');
    } catch (error) {
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              💳 Pay Bills Securely in NPR
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Bill Payment
              <span className="text-primary"> Services</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Pay electricity, water, internet bills and government taxes securely online in Nepali Rupees (NPR).
            </p>
          </div>
        </div>
      </section>

      {/* Payment Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
              <TabsTrigger value="electricity" className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">NEA Electricity</span>
              </TabsTrigger>
              <TabsTrigger value="water" className="flex items-center space-x-2">
                <Droplets className="h-4 w-4" />
                <span className="hidden sm:inline">Water Bills</span>
              </TabsTrigger>
              <TabsTrigger value="internet" className="flex items-center space-x-2">
                <Wifi className="h-4 w-4" />
                <span className="hidden sm:inline">Internet/Telecom</span>
              </TabsTrigger>
              <TabsTrigger value="tax" className="flex items-center space-x-2">
                <Banknote className="h-4 w-4" />
                <span className="hidden sm:inline">Tax Payments</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center space-x-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">Payment History</span>
              </TabsTrigger>
            </TabsList>

            {/* NEA Electricity Bills */}
            <TabsContent value="electricity">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Zap className="h-6 w-6 text-yellow-600" />
                    </div>
                    <span>NEA Electricity Bill Payment</span>
                  </CardTitle>
                  <CardDescription>
                    Pay your Nepal Electricity Authority bills online. No service charges apply.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer-number">Customer Number *</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="customer-number"
                          value={electricityForm.customerNumber}
                          onChange={(e) => setElectricityForm(prev => ({ ...prev, customerNumber: e.target.value }))}
                          placeholder="Enter customer number"
                          className="flex-1"
                        />
                        <Button 
                          variant="outline"
                          onClick={() => handleBillLookup('electricity')}
                          disabled={!electricityForm.customerNumber || isProcessing}
                        >
                          {isProcessing ? <Clock className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.customerNumber && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.customerNumber}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bill-month">Bill Month *</Label>
                      <Select
                        value={electricityForm.billMonth}
                        onValueChange={(value) => setElectricityForm(prev => ({ ...prev, billMonth: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select bill month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024-01">January 2024</SelectItem>
                          <SelectItem value="2023-12">December 2023</SelectItem>
                          <SelectItem value="2023-11">November 2023</SelectItem>
                          <SelectItem value="2023-10">October 2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {showBillDetails && electricityForm.consumerName && (
                    <Card className="bg-muted/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Receipt className="h-5 w-5" />
                          <span>Bill Details</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><strong>Consumer Name:</strong> {mockBillDetails.electricity.consumerName}</p>
                            <p><strong>Address:</strong> {mockBillDetails.electricity.address}</p>
                            <p><strong>Bill Month:</strong> {mockBillDetails.electricity.billMonth}</p>
                            <p><strong>Previous Reading:</strong> {mockBillDetails.electricity.previousReading} kWh</p>
                            <p><strong>Current Reading:</strong> {mockBillDetails.electricity.currentReading} kWh</p>
                          </div>
                          <div>
                            <p><strong>Units Consumed:</strong> {mockBillDetails.electricity.unitsConsumed} kWh</p>
                            <p><strong>Rate per Unit:</strong> NPR {mockBillDetails.electricity.ratePerUnit}</p>
                            <p><strong>Energy Charge:</strong> NPR {mockBillDetails.electricity.energyCharge}</p>
                            <p><strong>Service Charge:</strong> NPR {mockBillDetails.electricity.serviceCharge}</p>
                            <p><strong>Government Tax:</strong> NPR {mockBillDetails.electricity.governmentTax}</p>
                            <Separator className="my-2" />
                            <p className="text-lg font-semibold text-primary">
                              <strong>Total Amount: NPR {mockBillDetails.electricity.totalAmount}</strong>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="consumer-name">Consumer Name</Label>
                      <Input
                        id="consumer-name"
                        value={electricityForm.consumerName}
                        onChange={(e) => setElectricityForm(prev => ({ ...prev, consumerName: e.target.value }))}
                        placeholder="Consumer name (auto-filled)"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (NPR)</Label>
                      <Input
                        id="amount"
                        value={electricityForm.amount}
                        onChange={(e) => setElectricityForm(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="Amount (auto-filled)"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={electricityForm.phoneNumber}
                        onChange={(e) => setElectricityForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        placeholder="+977-98XXXXXXXX"
                      />
                      {errors.phoneNumber && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={electricityForm.email}
                        onChange={(e) => setElectricityForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Status Messages */}
                  {paymentStatus === 'success' && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Payment successful! Reference ID: NEA-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </AlertDescription>
                    </Alert>
                  )}

                  {paymentStatus === 'error' && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Payment failed. Please try again or contact support.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    onClick={() => handlePayment('electricity')}
                    disabled={isProcessing || !electricityForm.amount}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay NPR {electricityForm.amount || '0'}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Water Bills */}
            <TabsContent value="water">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Droplets className="h-6 w-6 text-blue-600" />
                    </div>
                    <span>Water Bill Payment</span>
                  </CardTitle>
                  <CardDescription>
                    Pay water supply bills for major municipalities. Service charge: NPR 5
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="municipality">Municipality *</Label>
                      <Select
                        value={waterForm.municipality}
                        onValueChange={(value) => setWaterForm(prev => ({ ...prev, municipality: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select municipality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kathmandu">Kathmandu Metropolitan City</SelectItem>
                          <SelectItem value="lalitpur">Lalitpur Metropolitan City</SelectItem>
                          <SelectItem value="bhaktapur">Bhaktapur Municipality</SelectItem>
                          <SelectItem value="pokhara">Pokhara Metropolitan City</SelectItem>
                          <SelectItem value="biratnagar">Biratnagar Metropolitan City</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.municipality && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.municipality}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="water-customer">Customer Number *</Label>
                      <Input
                        id="water-customer"
                        value={waterForm.customerNumber}
                        onChange={(e) => setWaterForm(prev => ({ ...prev, customerNumber: e.target.value }))}
                        placeholder="Enter customer number"
                      />
                      {errors.customerNumber && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.customerNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-center py-8">
                    <Droplets className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Water Bill Payment</h3>
                    <p className="text-muted-foreground mb-4">
                      Complete water bill payment form coming soon...
                    </p>
                    <Button variant="outline">
                      <Search className="mr-2 h-4 w-4" />
                      Look Up Bill
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Internet/Telecom Bills */}
            <TabsContent value="internet">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Wifi className="h-6 w-6 text-purple-600" />
                    </div>
                    <span>Internet & Telecom Bills</span>
                  </CardTitle>
                  <CardDescription>
                    Pay internet, mobile, and landline bills. Service charge: NPR 10
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="provider">Service Provider *</Label>
                      <Select
                        value={internetForm.provider}
                        onValueChange={(value) => setInternetForm(prev => ({ ...prev, provider: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="worldlink">WorldLink</SelectItem>
                          <SelectItem value="ntc">Nepal Telecom</SelectItem>
                          <SelectItem value="ncell">Ncell</SelectItem>
                          <SelectItem value="dishhome">Dish Home</SelectItem>
                          <SelectItem value="subisu">Subisu</SelectItem>
                          <SelectItem value="classictech">Classic Tech</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.provider && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.provider}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="internet-customer">Customer Number *</Label>
                      <Input
                        id="internet-customer"
                        value={internetForm.customerNumber}
                        onChange={(e) => setInternetForm(prev => ({ ...prev, customerNumber: e.target.value }))}
                        placeholder="Enter customer/account number"
                      />
                      {errors.customerNumber && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.customerNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-center py-8">
                    <Wifi className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Internet & Telecom Payment</h3>
                    <p className="text-muted-foreground mb-4">
                      Complete telecom bill payment form coming soon...
                    </p>
                    <Button variant="outline">
                      <Search className="mr-2 h-4 w-4" />
                      Look Up Bill
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tax Payments */}
            <TabsContent value="tax">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Banknote className="h-6 w-6 text-green-600" />
                    </div>
                    <span>Tax Payments</span>
                  </CardTitle>
                  <CardDescription>
                    Pay income tax, vehicle tax, and property tax. No service charges for government payments.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tax-type">Tax Type *</Label>
                      <Select
                        value={taxForm.taxType}
                        onValueChange={(value) => setTaxForm(prev => ({ ...prev, taxType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select tax type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Income Tax</SelectItem>
                          <SelectItem value="vehicle">Vehicle Tax</SelectItem>
                          <SelectItem value="property">Property Tax</SelectItem>
                          <SelectItem value="vat">VAT Payment</SelectItem>
                          <SelectItem value="business">Business Tax</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.taxType && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.taxType}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pan-number">PAN Number *</Label>
                      <Input
                        id="pan-number"
                        value={taxForm.panNumber}
                        onChange={(e) => setTaxForm(prev => ({ ...prev, panNumber: e.target.value }))}
                        placeholder="Enter PAN number"
                      />
                      {errors.panNumber && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.panNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="text-center p-4">
                      <Car className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Vehicle Tax</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pay annual vehicle tax and renew registration
                      </p>
                      <Button variant="outline" size="sm">Pay Vehicle Tax</Button>
                    </Card>
                    <Card className="text-center p-4">
                      <Home className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Property Tax</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pay property tax to local municipalities
                      </p>
                      <Button variant="outline" size="sm">Pay Property Tax</Button>
                    </Card>
                    <Card className="text-center p-4">
                      <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Income Tax</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        File and pay individual income tax returns
                      </p>
                      <Button variant="outline" size="sm">Pay Income Tax</Button>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment History */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <History className="h-6 w-6 text-gray-600" />
                    </div>
                    <span>Payment History</span>
                  </CardTitle>
                  <CardDescription>
                    View all your payment transactions and download receipts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <Card key={payment.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              {payment.service.includes('NEA') && <Zap className="h-5 w-5 text-yellow-600" />}
                              {payment.service.includes('Worldlink') && <Wifi className="h-5 w-5 text-purple-600" />}
                              {payment.service.includes('Vehicle') && <Car className="h-5 w-5 text-green-600" />}
                            </div>
                            <div>
                              <h4 className="font-semibold">{payment.service}</h4>
                              <p className="text-sm text-muted-foreground">
                                {payment.date} • Ref: {payment.referenceId}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">NPR {payment.amount.toLocaleString()}</p>
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Security & Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Secure & Convenient Payment Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Bank-Level Security</h3>
                  <p className="text-sm text-muted-foreground">
                    256-bit SSL encryption and secure payment processing
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Smartphone className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">SMS Confirmations</h3>
                  <p className="text-sm text-muted-foreground">
                    Instant SMS notifications for all successful payments
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Receipt className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Digital Receipts</h3>
                  <p className="text-sm text-muted-foreground">
                    Download and save payment receipts for your records
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
