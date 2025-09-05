'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  HelpCircle,
  Shield,
  Heart
} from 'lucide-react';

interface ClientFooterProps {
  className?: string;
}

export function ClientFooter({ className }: ClientFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gray-50 border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Client Portal</span>
            </div>
            <p className="text-sm text-gray-600">
              Your secure gateway to manage your account, view documents, and communicate with our team.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-1" />
                Email
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 hover:text-gray-900">
                  Dashboard
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 hover:text-gray-900">
                  Documents
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 hover:text-gray-900">
                  Messages
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 hover:text-gray-900">
                  Billing
                </Button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 hover:text-gray-900">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Help Center
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 hover:text-gray-900">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Live Chat
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 hover:text-gray-900">
                  Contact Support
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 hover:text-gray-900">
                  FAQ
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@clientportal.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Live Chat Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>&copy; {currentYear} Client Portal. All rights reserved.</span>
              <Button variant="ghost" className="p-0 h-auto text-gray-500 hover:text-gray-700">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="p-0 h-auto text-gray-500 hover:text-gray-700">
                Terms of Service
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for our clients</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
