import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  Bell, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Download,
  Plus,
  ArrowRight,
  Zap,
  Droplets,
  Wifi,
  Car,
  Home,
  Heart,
  Star,
  DollarSign,
  Activity,
  Users,
  BarChart3,
  PieChart,
  RefreshCw,
  Settings,
  Edit3,
  Shield,
  Phone,
  Mail,
  MapPin,
  Upload,
  Search,
  Filter,
  ChevronRight,
  ExternalLink,
  Timer,
  Target,
  Wallet
} from 'lucide-react';

interface Application {
  id: string;
  type: string;
  title: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  submittedDate: string;
  expectedDate: string;
  progress: number;
  referenceId: string;
  icon: JSX.Element;
}

interface Transaction {
  id: string;
  service: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  referenceId: string;
  method: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  // Mock user data
  const userData = {
    name: 'Ram Bahadur Thapa',
    email: 'ram.thapa@email.com',
    phone: '+977-9841234567',
    citizenshipNo: '12-34-56-78901',
    address: 'Ward No. 5, Kathmandu Metropolitan City',
    joinDate: '2023-06-15',
    verificationStatus: 'verified',
    profileImage: '/api/placeholder/100/100'
  };

  // Mock applications data
  const applications: Application[] = [
    {
      id: '1',
      type: 'citizenship',
      title: 'Citizenship Certificate Renewal',
      status: 'processing',
      submittedDate: '2024-01-15',
      expectedDate: '2024-02-15',
      progress: 65,
      referenceId: 'CIT-2024-001',
      icon: <User className="h-5 w-5" />
    },
    {
      id: '2',
      type: 'passport',
      title: 'Passport Application',
      status: 'approved',
      submittedDate: '2024-01-01',
      expectedDate: '2024-01-22',
      progress: 100,
      referenceId: 'PAS-2024-045',
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: '3',
      type: 'business',
      title: 'Business Registration',
      status: 'pending',
      submittedDate: '2024-01-20',
      expectedDate: '2024-02-05',
      progress: 25,
      referenceId: 'BUS-2024-123',
      icon: <FileText className="h-5 w-5" />
    }
  ];

  // Mock transactions data
  const transactions: Transaction[] = [
    {
      id: '1',
      service: 'NEA Electricity Bill',
      amount: 2450,
      date: '2024-01-28',
      status: 'completed',
      referenceId: 'NEA-2024-001',
      method: 'eSewa'
    },
    {
      id: '2',
      service: 'WorldLink Internet',
      amount: 1500,
      date: '2024-01-25',
      status: 'completed',
      referenceId: 'WL-2024-045',
      method: 'Khalti'
    },
    {
      id: '3',
      service: 'Water Bill',
      amount: 800,
      date: '2024-01-20',
      status: 'completed',
      referenceId: 'WB-2024-033',
      method: 'Bank Transfer'
    },
    {
      id: '4',
      service: 'Vehicle Tax',
      amount: 5000,
      date: '2024-01-18',
      status: 'pending',
      referenceId: 'VT-2024-089',
      method: 'eSewa'
    }
  ];

  // Mock notifications
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Citizenship Certificate Update',
      message: 'Your citizenship certificate renewal is 65% complete. Expected completion: Feb 15, 2024.',
      type: 'info',
      timestamp: '2024-01-28T10:30:00',
      read: false
    },
    {
      id: '2',
      title: 'Payment Successful',
      message: 'Your NEA electricity bill payment of NPR 2,450 has been processed successfully.',
      type: 'success',
      timestamp: '2024-01-28T09:15:00',
      read: false
    },
    {
      id: '3',
      title: 'Passport Ready for Collection',
      message: 'Your passport is ready for collection at the Department of Passports.',
      type: 'success',
      timestamp: '2024-01-22T14:20:00',
      read: true
    },
    {
      id: '4',
      title: 'Bill Due Reminder',
      message: 'Your water bill of NPR 850 is due on February 5, 2024.',
      type: 'warning',
      timestamp: '2024-01-20T08:00:00',
      read: true
    }
  ];

  // Quick actions data
  const quickActions = [
    {
      title: 'Pay Electricity Bill',
      description: 'Pay your NEA electricity bill',
      icon: <Zap className="h-6 w-6" />,
      color: 'from-yellow-400 to-orange-500',
      href: '/payments'
    },
    {
      title: 'Apply for Passport',
      description: 'New passport application',
      icon: <FileText className="h-6 w-6" />,
      color: 'from-blue-400 to-purple-500',
      href: '/government'
    },
    {
      title: 'Check Bill Status',
      description: 'View payment history',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'from-green-400 to-teal-500',
      href: '/payments'
    },
    {
      title: 'Health Insurance',
      description: 'Submit medical claims',
      icon: <Heart className="h-6 w-6" />,
      color: 'from-red-400 to-pink-500',
      href: '/medical'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome back, {userData.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-lg text-muted-foreground">
                Here's what's happening with your government services
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Shield className="h-4 w-4 mr-1" />
                Verified Account
              </Badge>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Applications</p>
                        <p className="text-2xl font-bold text-foreground">3</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          2 approved this month
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">This Month's Payments</p>
                        <p className="text-2xl font-bold text-foreground">NPR 9,750</p>
                        <p className="text-xs text-red-600 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          15% higher than last month
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <CreditCard className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Unread Notifications</p>
                        <p className="text-2xl font-bold text-foreground">2</p>
                        <p className="text-xs text-blue-600 flex items-center mt-1">
                          <Bell className="h-3 w-3 mr-1" />
                          1 important update
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-100 rounded-full">
                        <Bell className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Account Score</p>
                        <p className="text-2xl font-bold text-foreground">98%</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <Star className="h-3 w-3 mr-1" />
                          Excellent standing
                        </p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription>
                    Common tasks and services you might need
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                      <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {action.icon}
                          </div>
                          <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {action.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-3">
                            {action.description}
                          </p>
                          <Button size="sm" variant="outline" className="w-full">
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Applications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Activity className="h-5 w-5 text-primary" />
                        <span>Recent Applications</span>
                      </span>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applications.slice(0, 3).map((app) => (
                        <div key={app.id} className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {app.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{app.title}</h4>
                            <p className="text-xs text-muted-foreground">Ref: {app.referenceId}</p>
                            <Progress value={app.progress} className="h-1 mt-2" />
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(app.status)}>
                              {app.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {app.progress}% complete
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Payments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Wallet className="h-5 w-5 text-primary" />
                        <span>Recent Payments</span>
                      </span>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.slice(0, 3).map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              {transaction.service.includes('NEA') && <Zap className="h-4 w-4 text-yellow-600" />}
                              {transaction.service.includes('WorldLink') && <Wifi className="h-4 w-4 text-purple-600" />}
                              {transaction.service.includes('Water') && <Droplets className="h-4 w-4 text-blue-600" />}
                              {transaction.service.includes('Vehicle') && <Car className="h-4 w-4 text-green-600" />}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{transaction.service}</h4>
                              <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">NPR {transaction.amount.toLocaleString()}</p>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Spending Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>Monthly Spending Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Your government service payments over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: 'Jan 2024', amount: 9750, percentage: 85 },
                      { month: 'Dec 2023', amount: 8200, percentage: 71 },
                      { month: 'Nov 2023', amount: 7500, percentage: 65 },
                      { month: 'Oct 2023', amount: 11200, percentage: 97 },
                      { month: 'Sep 2023', amount: 6800, percentage: 59 },
                      { month: 'Aug 2023', amount: 9100, percentage: 79 }
                    ].map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium w-20">{data.month}</span>
                        <div className="flex-1 mx-4">
                          <Progress value={data.percentage} className="h-2" />
                        </div>
                        <span className="text-sm font-semibold w-24 text-right">NPR {data.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Application Status</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Application
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            {app.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{app.title}</h3>
                            <p className="text-sm text-muted-foreground">Reference: {app.referenceId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(app.status)}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {app.progress}% Complete
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                          <p className="text-sm">{formatDate(app.submittedDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Expected Completion</p>
                          <p className="text-sm">{formatDate(app.expectedDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Processing Time</p>
                          <p className="text-sm">{
                            Math.ceil((new Date(app.expectedDate).getTime() - new Date(app.submittedDate).getTime()) / (1000 * 60 * 60 * 24))
                          } days</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{app.progress}%</span>
                        </div>
                        <Progress value={app.progress} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                        {app.status === 'processing' && (
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Track Status
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Payment History</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Make Payment
                  </Button>
                </div>
              </div>

              {/* Payment Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Paid This Month</p>
                        <p className="text-2xl font-bold">NPR 9,750</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                        <p className="text-2xl font-bold">NPR 5,000</p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Saved This Year</p>
                        <p className="text-2xl font-bold">NPR 2,400</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction List */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your payment history and transaction details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {transaction.service.includes('NEA') && <Zap className="h-5 w-5 text-yellow-600" />}
                            {transaction.service.includes('WorldLink') && <Wifi className="h-5 w-5 text-purple-600" />}
                            {transaction.service.includes('Water') && <Droplets className="h-5 w-5 text-blue-600" />}
                            {transaction.service.includes('Vehicle') && <Car className="h-5 w-5 text-green-600" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{transaction.service}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(transaction.date)} • {transaction.method}
                            </p>
                            <p className="text-xs text-muted-foreground">Ref: {transaction.referenceId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">NPR {transaction.amount.toLocaleString()}</p>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                          <div className="flex space-x-2 mt-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Notifications</h2>
                <Button variant="outline" size="sm">
                  Mark All as Read
                </Button>
              </div>

              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card key={notification.id} className={`hover:shadow-lg transition-shadow ${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                {notification.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {formatTime(notification.timestamp)}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              {!notification.read && (
                                <Badge variant="default" className="bg-primary">
                                  New
                                </Badge>
                              )}
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Profile Settings</h2>
                <Button>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Information */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your account details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                        <p className="text-lg font-medium">{userData.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Citizenship Number</Label>
                        <p className="text-lg font-medium">{userData.citizenshipNo}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
                        <p className="text-lg font-medium">{userData.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Phone Number</Label>
                        <p className="text-lg font-medium">{userData.phone}</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                        <p className="text-lg font-medium">{userData.address}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Member Since</Label>
                        <p className="text-lg font-medium">{formatDate(userData.joinDate)}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Verification Status</Label>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Security */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Update Phone
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Change Email
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Documents
                      </Button>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Security Score</h4>
                      <Progress value={85} className="h-2 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Your account security is strong. Consider enabling two-factor authentication for better protection.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
