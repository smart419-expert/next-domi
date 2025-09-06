'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  HelpCircle, 
  Search, 
  MessageSquare, 
  Phone, 
  Mail, 
  FileText, 
  Video,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function ClientHelp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const faqs = [
    {
      id: 1,
      question: 'How do I view my account balance?',
      answer: 'You can view your account balance on the Dashboard page. It\'s displayed prominently at the top of the page along with recent changes and trends.'
    },
    {
      id: 2,
      question: 'How do I download my documents?',
      answer: 'Go to the Documents page and click the download button next to any document. You can also filter documents by type or date to find what you\'re looking for.'
    },
    {
      id: 3,
      question: 'How do I schedule a meeting with my advisor?',
      answer: 'Visit the Schedule page and click "Schedule Meeting". Choose your preferred date, time, and meeting type (video, phone, or in-person).'
    },
    {
      id: 4,
      question: 'How do I make a payment?',
      answer: 'Go to the Payments page and click "New Payment". You can pay by credit card, bank transfer, or set up automatic payments.'
    },
    {
      id: 5,
      question: 'How do I update my contact information?',
      answer: 'Go to Settings > Profile Information and click "Edit Profile". Update your information and click "Save Changes".'
    },
    {
      id: 6,
      question: 'How do I change my password?',
      answer: 'Go to Settings > Security Settings and scroll down to the password section. Enter your current password and new password, then click "Save Security Settings".'
    }
  ];

  const helpTopics = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using your client portal',
      icon: HelpCircle,
      articles: [
        'How to navigate the portal',
        'Setting up your profile',
        'Understanding your dashboard'
      ]
    },
    {
      title: 'Account Management',
      description: 'Manage your account and personal information',
      icon: FileText,
      articles: [
        'Updating contact information',
        'Changing passwords',
        'Managing notifications'
      ]
    },
    {
      title: 'Payments & Billing',
      description: 'Handle payments and view billing information',
      icon: MessageSquare,
      articles: [
        'Making payments',
        'Viewing payment history',
        'Setting up automatic payments'
      ]
    },
    {
      title: 'Documents & Reports',
      description: 'Access and manage your documents',
      icon: FileText,
      articles: [
        'Downloading documents',
        'Understanding reports',
        'Document security'
      ]
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSubmit = () => {
    // In a real app, this would send the message to support
    console.log('Contact form submitted:', contactForm);
    setShowContactForm(false);
    setContactForm({ subject: '', message: '', priority: 'medium' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">
          Find answers to common questions and get the help you need.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search help articles and FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowContactForm(true)}>
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-sm text-gray-500">Send us a message and we&apos;ll get back to you</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-sm text-gray-500">Speak directly with our support team</p>
            <p className="text-sm font-medium text-green-600 mt-2">+1 (555) 123-4567</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Video Call</h3>
            <p className="text-sm text-gray-500">Schedule a video meeting with support</p>
          </CardContent>
        </Card>
      </div>

      {/* Help Topics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Help Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpTopics.map((topic, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <topic.icon className="h-8 w-8 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{topic.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{topic.description}</p>
                    <ul className="space-y-1">
                      {topic.articles.map((article, articleIndex) => (
                        <li key={articleIndex} className="text-sm text-gray-600 flex items-center">
                          <ChevronRight className="h-3 w-3 mr-2 text-gray-400" />
                          {article}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <Card key={faq.id}>
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                >
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  {expandedFaq === faq.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">Try searching with different keywords.</p>
          </div>
        )}
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Send us a message and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  placeholder="Brief description of your issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={contactForm.priority}
                  onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  placeholder="Describe your issue in detail..."
                  rows={4}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleContactSubmit} className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" onClick={() => setShowContactForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Additional Resources */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Documentation</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li className="flex items-center">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  User Guide
                </li>
                <li className="flex items-center">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  API Documentation
                </li>
                <li className="flex items-center">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Security Best Practices
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Community</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li className="flex items-center">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Community Forum
                </li>
                <li className="flex items-center">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Video Tutorials
                </li>
                <li className="flex items-center">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Status Page
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
