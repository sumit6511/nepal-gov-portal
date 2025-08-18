import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  AlertCircle, 
  CheckCircle, 
  Send,
  FileText,
  Users,
  Shield,
  Headphones,
  Globe,
  Calendar,
  Search,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Building,
  Zap,
  CreditCard,
  Heart,
  Star,
  ThumbsUp,
  ChevronRight
} from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  priority: string;
  message: string;
  attachments: File[];
}

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  helpful: number;
}

export default function Contact() {
  const [activeTab, setActiveTab] = useState('contact-form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
    attachments: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Contact methods data
  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '+977-1-4200100',
      hours: '24/7 Available',
      color: 'from-green-500 to-emerald-600',
      action: 'Call Now'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Support',
      description: 'Send us your questions and concerns',
      contact: 'support@nepalgovportal.gov.np',
      hours: 'Response within 2 hours',
      color: 'from-blue-500 to-cyan-600',
      action: 'Send Email'
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Live Chat',
      description: 'Get instant help from our chat agents',
      contact: 'Available on website',
      hours: '6 AM - 10 PM',
      color: 'from-purple-500 to-indigo-600',
      action: 'Start Chat'
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: 'Visit Office',
      description: 'Meet our team in person for complex issues',
      contact: 'Singha Durbar, Kathmandu',
      hours: 'Sunday-Friday: 10 AM - 5 PM',
      color: 'from-orange-500 to-red-600',
      action: 'Get Directions'
    }
  ];

  // Support categories
  const supportCategories = [
    { value: 'technical', label: 'Technical Issues', icon: <Zap className="h-4 w-4" /> },
    { value: 'billing', label: 'Billing & Payments', icon: <CreditCard className="h-4 w-4" /> },
    { value: 'account', label: 'Account Management', icon: <Users className="h-4 w-4" /> },
    { value: 'documents', label: 'Document Applications', icon: <FileText className="h-4 w-4" /> },
    { value: 'medical', label: 'Health Insurance', icon: <Heart className="h-4 w-4" /> },
    { value: 'general', label: 'General Inquiry', icon: <HelpCircle className="h-4 w-4" /> }
  ];

  // FAQ data
  const faqs: FAQ[] = [
    {
      id: '1',
      category: 'Account',
      question: 'How do I create a new account on NepalGov Portal?',
      answer: 'To create a new account, click the "Register" button in the top navigation, fill out the required information including your name, email, phone number, and address details. You will need to verify your email and phone number to complete the registration.',
      helpful: 45
    },
    {
      id: '2',
      category: 'Payments',
      question: 'What payment methods are accepted for bill payments?',
      answer: 'We accept various payment methods including eSewa, Khalti, bank transfers, and major credit/debit cards. All transactions are secured with 256-bit SSL encryption and processed instantly.',
      helpful: 38
    },
    {
      id: '3',
      category: 'Documents',
      question: 'How long does it take to process citizenship certificate applications?',
      answer: 'Citizenship certificate applications typically take 15 business days to process. You can track the status of your application in real-time through your dashboard. Expedited processing is available for urgent cases.',
      helpful: 52
    },
    {
      id: '4',
      category: 'Technical',
      question: 'Why am I unable to upload documents?',
      answer: 'Document upload issues are usually due to file size or format restrictions. Ensure your files are under 10MB and in PDF, JPG, or PNG format. Clear your browser cache and try again. If the problem persists, contact technical support.',
      helpful: 31
    },
    {
      id: '5',
      category: 'Billing',
      question: 'Can I set up automatic bill payments?',
      answer: 'Yes, you can set up auto-pay for recurring bills like electricity, water, and internet. Go to your dashboard, select the service, and enable auto-pay with your preferred payment method. You will receive notifications before each payment.',
      helpful: 42
    },
    {
      id: '6',
      category: 'Medical',
      question: 'How do I submit health insurance claims?',
      answer: 'To submit health insurance claims, go to the Medical Claims section, upload your medical bills and prescriptions, fill out the claim form with treatment details, and submit. Claims are typically processed within 10-15 business days.',
      helpful: 28
    }
  ];

  // Office locations
  const officeLocations = [
    {
      name: 'Main Office - Singha Durbar',
      address: 'Singha Durbar, Kathmandu, Nepal',
      phone: '+977-1-4200100',
      email: 'main@nepalgovportal.gov.np',
      hours: 'Sunday-Friday: 10:00 AM - 5:00 PM',
      services: ['All Government Services', 'Technical Support', 'Document Verification']
    },
    {
      name: 'Regional Office - Pokhara',
      address: 'Mahendrapul, Pokhara, Kaski',
      phone: '+977-61-465100',
      email: 'pokhara@nepalgovportal.gov.np',
      hours: 'Sunday-Friday: 10:00 AM - 4:00 PM',
      services: ['Payment Support', 'Account Assistance', 'General Inquiries']
    },
    {
      name: 'Regional Office - Biratnagar',
      address: 'Traffic Chowk, Biratnagar, Morang',
      phone: '+977-21-525100',
      email: 'biratnagar@nepalgovportal.gov.np',
      hours: 'Sunday-Friday: 10:00 AM - 4:00 PM',
      services: ['Payment Support', 'Document Services', 'Technical Help']
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!contactForm.name.trim()) newErrors.name = 'Name is required';
    if (!contactForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!contactForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+977-9[78]\d{8}$/.test(contactForm.phone)) {
      newErrors.phone = 'Please enter a valid Nepal mobile number (+977-98XXXXXXXX)';
    }
    if (!contactForm.subject.trim()) newErrors.subject = 'Subject is required';
    if (!contactForm.category) newErrors.category = 'Please select a category';
    if (!contactForm.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contact form submitted:', contactForm);
      setSubmitStatus('success');
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        priority: 'medium',
        message: '',
        attachments: []
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              🤝 We're Here to Help
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contact
              <span className="text-primary"> Support</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Get help with your government services, payments, and account. Our support team is available 24/7 to assist you.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { value: '< 2min', label: 'Avg Response Time' },
                { value: '24/7', label: 'Support Available' },
                { value: '98%', label: 'Issue Resolution' },
                { value: '4.9★', label: 'Customer Rating' }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                  <div className="text-lg font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">Choose the best way to reach us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {method.icon}
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {method.description}
                  </p>
                  <div className="space-y-1 mb-4">
                    <p className="font-medium text-primary">{method.contact}</p>
                    <p className="text-xs text-muted-foreground">{method.hours}</p>
                  </div>
                  <Button className="w-full" variant="outline">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
              <TabsTrigger value="contact-form" className="flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Contact Form</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center space-x-2">
                <HelpCircle className="h-4 w-4" />
                <span>FAQ</span>
              </TabsTrigger>
              <TabsTrigger value="offices" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Office Locations</span>
              </TabsTrigger>
              <TabsTrigger value="emergency" className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>Emergency</span>
              </TabsTrigger>
            </TabsList>

            {/* Contact Form */}
            <TabsContent value="contact-form">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Send className="h-6 w-6 text-primary" />
                        <span>Send us a Message</span>
                      </CardTitle>
                      <CardDescription>
                        Fill out the form below and we'll get back to you as soon as possible.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              value={contactForm.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              placeholder="Enter your full name"
                              className={errors.name ? 'border-destructive' : ''}
                            />
                            {errors.name && (
                              <p className="text-sm text-destructive flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.name}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={contactForm.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="your.email@example.com"
                              className={errors.email ? 'border-destructive' : ''}
                            />
                            {errors.email && (
                              <p className="text-sm text-destructive flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              value={contactForm.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="+977-98XXXXXXXX"
                              className={errors.phone ? 'border-destructive' : ''}
                            />
                            {errors.phone && (
                              <p className="text-sm text-destructive flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.phone}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select 
                              value={contactForm.category} 
                              onValueChange={(value) => handleInputChange('category', value)}
                            >
                              <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select inquiry category" />
                              </SelectTrigger>
                              <SelectContent>
                                {supportCategories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    <div className="flex items-center space-x-2">
                                      {category.icon}
                                      <span>{category.label}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.category && (
                              <p className="text-sm text-destructive flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.category}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject *</Label>
                            <Input
                              id="subject"
                              value={contactForm.subject}
                              onChange={(e) => handleInputChange('subject', e.target.value)}
                              placeholder="Brief description of your issue"
                              className={errors.subject ? 'border-destructive' : ''}
                            />
                            {errors.subject && (
                              <p className="text-sm text-destructive flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.subject}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="priority">Priority Level</Label>
                            <Select 
                              value={contactForm.priority} 
                              onValueChange={(value) => handleInputChange('priority', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low - General inquiry</SelectItem>
                                <SelectItem value="medium">Medium - Standard issue</SelectItem>
                                <SelectItem value="high">High - Urgent matter</SelectItem>
                                <SelectItem value="critical">Critical - Service disruption</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            value={contactForm.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            placeholder="Please describe your issue or question in detail..."
                            rows={6}
                            className={errors.message ? 'border-destructive' : ''}
                          />
                          {errors.message && (
                            <p className="text-sm text-destructive flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.message}
                            </p>
                          )}
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                          <Label htmlFor="attachments">Attachments (Optional)</Label>
                          <Input
                            id="attachments"
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            className="cursor-pointer"
                          />
                          <p className="text-xs text-muted-foreground">
                            Upload relevant documents, screenshots, or files (Max 10MB per file)
                          </p>
                        </div>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                          <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                              Your message has been sent successfully! We'll respond within 2 hours during business hours.
                              Ticket ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </AlertDescription>
                          </Alert>
                        )}

                        {submitStatus === 'error' && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              Failed to send message. Please try again or contact us directly at +977-1-4200100.
                            </AlertDescription>
                          </Alert>
                        )}

                        <Button 
                          type="submit" 
                          className="w-full" 
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Clock className="mr-2 h-4 w-4 animate-spin" />
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Help Sidebar */}
                <div className="space-y-6">
                  {/* Quick Links */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Help</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { title: 'Account Issues', desc: 'Login, registration, password reset' },
                        { title: 'Payment Problems', desc: 'Failed transactions, refunds' },
                        { title: 'Document Status', desc: 'Check application progress' },
                        { title: 'Technical Support', desc: 'Website errors, upload issues' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                          <div>
                            <p className="font-medium text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Emergency Contact */}
                  <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2 text-red-800">
                        <AlertCircle className="h-5 w-5" />
                        <span>Emergency Contact</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-red-700 mb-3">
                        For urgent issues that need immediate attention:
                      </p>
                      <div className="space-y-2">
                        <p className="font-medium text-red-800">+977-1-4200100</p>
                        <p className="text-xs text-red-600">Available 24/7</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* FAQ Section */}
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <span>Frequently Asked Questions</span>
                  </CardTitle>
                  <CardDescription>
                    Find quick answers to common questions
                  </CardDescription>
                  
                  {/* Search FAQ */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search FAQs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredFAQs.map((faq) => (
                      <Card key={faq.id} className="border hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div 
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline" className="text-xs">
                                {faq.category}
                              </Badge>
                              <h4 className="font-medium text-foreground hover:text-primary transition-colors">
                                {faq.question}
                              </h4>
                            </div>
                            {expandedFAQ === faq.id ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          
                          {expandedFAQ === faq.id && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-muted-foreground mb-4">{faq.answer}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Button variant="outline" size="sm">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    Helpful ({faq.helpful})
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    Contact Support
                                  </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Was this helpful?
                                </p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                    
                    {filteredFAQs.length === 0 && (
                      <div className="text-center py-8">
                        <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">No FAQs found</h3>
                        <p className="text-muted-foreground mb-4">
                          Try adjusting your search or contact our support team.
                        </p>
                        <Button>Contact Support</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Office Locations */}
            <TabsContent value="offices">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {officeLocations.map((office, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Building className="h-5 w-5 text-primary" />
                        <span>{office.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                          <p className="text-sm">{office.address}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">{office.phone}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{office.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{office.hours}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium mb-2">Available Services:</h4>
                        <div className="space-y-1">
                          {office.services.map((service, serviceIndex) => (
                            <Badge key={serviceIndex} variant="secondary" className="mr-2 mb-1">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button className="flex-1" variant="outline">
                          <MapPin className="mr-2 h-4 w-4" />
                          Directions
                        </Button>
                        <Button className="flex-1">
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Emergency Contact */}
            <TabsContent value="emergency">
              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="flex items-center space-x-2 text-red-800">
                    <AlertCircle className="h-6 w-6" />
                    <span>Emergency Support</span>
                  </CardTitle>
                  <CardDescription className="text-red-700">
                    For urgent issues that require immediate attention
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Emergency Contacts</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                            <div>
                              <p className="font-medium text-red-800">24/7 Emergency Hotline</p>
                              <p className="text-red-600">Critical system issues, security concerns</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-red-800">+977-1-4200100</p>
                              <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                                <Phone className="mr-2 h-4 w-4" />
                                Call Now
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <div>
                              <p className="font-medium text-orange-800">WhatsApp Support</p>
                              <p className="text-orange-600">Quick response via messaging</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-orange-800">+977-98-4200100</p>
                              <Button size="sm" variant="outline" className="mt-2">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-4">What Constitutes an Emergency?</h3>
                        <div className="space-y-3">
                          {[
                            'Payment system completely down',
                            'Unable to access critical government services',
                            'Security breach or suspicious activity',
                            'Data loss or corruption',
                            'Website completely inaccessible'
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <AlertCircle className="h-4 w-4 text-red-500" />
                              <p className="text-sm">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Note:</strong> For non-emergency issues, please use the regular contact form or call during business hours for faster resolution.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Support Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Support Promise
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Dedicated to providing excellent service for all Nepal citizens
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Headphones className="h-8 w-8" />,
                  title: 'Expert Support Team',
                  description: 'Our trained specialists understand Nepal\'s government services and can help in both English and Nepali.'
                },
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: 'Secure Communication',
                  description: 'All communications are encrypted and handled according to government privacy standards.'
                },
                {
                  icon: <Star className="h-8 w-8" />,
                  title: 'Satisfaction Guarantee',
                  description: 'We\'re committed to resolving your issues promptly and ensuring your satisfaction.'
                }
              ].map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
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
