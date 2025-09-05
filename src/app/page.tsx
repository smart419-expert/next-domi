'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { 
  Users, 
  MessageSquare, 
  CreditCard, 
  TrendingUp, 
  Settings,
  ArrowRight,
  Shield,
  BarChart3,
  Loader2,
  CheckCircle,
  Star,
  Zap,
  Globe,
  Lock,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Client Management",
    description: "Comprehensive client database with detailed profiles, interaction history, and relationship tracking.",
    color: "blue"
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-green-600" />,
    title: "Communication Hub",
    description: "Integrated chat system with real-time messaging, notifications, and multi-channel support.",
    color: "green"
  },
  {
    icon: <CreditCard className="h-8 w-8 text-purple-600" />,
    title: "Payment Processing",
    description: "Secure payment handling with multiple providers including PayPal, ATH Móvil, and more.",
    color: "purple"
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
    title: "Investment Analytics",
    description: "Advanced data visualization and investment tracking with dynamic charts and reports.",
    color: "orange"
  },
  {
    icon: <Shield className="h-8 w-8 text-red-600" />,
    title: "Security & Privacy",
    description: "Enterprise-grade security with role-based access control and data encryption.",
    color: "red"
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
    title: "Analytics Dashboard",
    description: "Real-time insights and performance metrics to help you make informed decisions.",
    color: "indigo"
  }
];

const stats = [
  { label: "Active Users", value: "10,000+" },
  { label: "Messages Sent", value: "1M+" },
  { label: "Payments Processed", value: "$50M+" },
  { label: "Client Satisfaction", value: "99.9%" }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Business Owner",
    content: "This platform has revolutionized how we manage our client relationships. The communication tools are incredible.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Financial Advisor",
    content: "The investment analytics features help me provide better insights to my clients. Highly recommended!",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Customer Success Manager",
    content: "The payment processing is seamless and secure. Our clients love the convenience.",
    rating: 5
  }
];

export default function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && isAuthenticated) {
      // Redirect authenticated users to their appropriate dashboard
      if (user) {
        if (user.role === 'admin' || user.role === 'agent' || user.role === 'viewer') {
          router.push('/admin/dashboard');
        } else {
          router.push('/user/dashboard');
        }
      }
    }
  }, [mounted, isAuthenticated, isLoading, user, router]);

  if (isLoading || !mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">VPS Domi</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/login')}>
                Sign In
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/login')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Customer Communication
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Platform
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your client relationships with our comprehensive platform. 
              Manage communications, process payments, and track investments all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3" onClick={() => router.push('/login')}>
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage clients
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to build and maintain strong client relationships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4 mb-4">
                    {feature.icon}
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What our users say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers who trust our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to transform your client relationships?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses already using our platform to manage their clients more effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3" onClick={() => router.push('/login')}>
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">VPS Domi</span>
              </div>
              <p className="text-gray-400">
                The complete platform for managing client relationships and communications.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#about" className="hover:text-white">About</Link></li>
                <li><Link href="#contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="#careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VPS Domi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}