'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
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
import { VirginMoneyLogo } from '@/components/ui/virgin-money-logo';
import { LanguageSelector } from '@/components/ui/language-selector';

const getFeatures = (t: (key: string) => string) => [
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: t('home.features.clients.title'),
    description: t('home.features.clients.description'),
    color: "blue"
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-green-600" />,
    title: t('home.features.communication.title'),
    description: t('home.features.communication.description'),
    color: "green"
  },
  {
    icon: <CreditCard className="h-8 w-8 text-purple-600" />,
    title: t('home.features.payments.title'),
    description: t('home.features.payments.description'),
    color: "purple"
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
    title: t('home.features.analytics.title'),
    description: t('home.features.analytics.description'),
    color: "orange"
  },
  {
    icon: <Shield className="h-8 w-8 text-red-600" />,
    title: t('home.features.security.title'),
    description: t('home.features.security.description'),
    color: "red"
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
    title: t('home.features.dashboard.title'),
    description: t('home.features.dashboard.description'),
    color: "indigo"
  }
];

const getStats = (t: (key: string) => string) => [
  { label: "Usuarios Activos", value: "10,000+" },
  { label: "Mensajes Enviados", value: "1M+" },
  { label: "Pagos Procesados", value: "$50M+" },
  { label: "Satisfacción del Cliente", value: "99.9%" }
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
  const { t, language } = useLanguage();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  
  const features = getFeatures(t);
  const stats = getStats(t);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && isAuthenticated) {
      // Redirect authenticated users to their appropriate dashboard
      if (user) {
        if (user.email === 'admin@example.com') {
          router.push('/admin/dashboard');
        } else {
          router.push('/client/dashboard');
        }
      }
    }
  }, [mounted, isAuthenticated, isLoading, user, router]);

  if (isLoading || !mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Cargando...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Redirigiendo a tu panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <VirginMoneyLogo 
              size="lg" 
              text="domi" 
              onClick={() => router.push('/')}
            />
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button variant="ghost" onClick={() => router.push('/login')} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                Iniciar Sesión
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" onClick={() => router.push('/login')}>
                Comenzar
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-lg px-8 py-3" onClick={() => router.push('/login')}>
                {t('home.hero.get_started')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Saber Más
              </Button>
            </div>
            
            {/* Demo Instructions */}
            <div className="mt-12 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🚀 {t('home.demo.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('home.demo.subtitle')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">👑 {t('home.demo.admin.title')}</h3>
                  <p className="text-sm text-red-700 dark:text-red-400 mb-3">
                    {t('home.demo.admin.description')}
                  </p>
                  <Button 
                    className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white w-full"
                    onClick={() => router.push('/admin/dashboard')}
                  >
                    {t('home.demo.admin.button')}
                  </Button>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">👤 {t('home.demo.client.title')}</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                    {t('home.demo.client.description')}
                  </p>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white w-full"
                    onClick={() => router.push('/client/dashboard')}
                  >
                    {t('home.demo.client.button')}
                  </Button>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>Nota:</strong> {t('home.demo.note')}
                </p>
              </div>
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
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.features.subtitle')}
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
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-gray-600">
              Únete a miles de clientes satisfechos que confían en nuestra plataforma.
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
      <footer className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <VirginMoneyLogo 
                  size="lg" 
                  text="domi"
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.footer.description')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('home.footer.product')}</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link href="#features" className="hover:text-gray-900 dark:hover:text-white">{t('home.footer.features')}</Link></li>
                <li><Link href="#pricing" className="hover:text-gray-900 dark:hover:text-white">{t('home.footer.pricing')}</Link></li>
                <li><Link href="#security" className="hover:text-gray-900 dark:hover:text-white">{t('home.footer.security')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('home.footer.company')}</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link href="#about" className="hover:text-gray-900 dark:hover:text-white">{t('home.footer.about')}</Link></li>
                <li><Link href="#contact" className="hover:text-gray-900 dark:hover:text-white">{t('home.footer.contact')}</Link></li>
                <li><Link href="#careers" className="hover:text-gray-900 dark:hover:text-white">{t('home.footer.careers')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('home.footer.support')}</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link href="#help" className="hover:text-gray-900 dark:hover:text-white">{t('home.footer.help_center')}</Link></li>
                <li><Link href="#docs" className="hover:text-gray-900 dark:hover:text-white">{t('home.footer.documentation')}</Link></li>
                <li><Link href="#status" className="hover:text-gray-900 dark:hover:text-white">{t('home.footer.status')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>{t('home.footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}