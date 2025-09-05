'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, X, Chrome, Mail, Shield } from 'lucide-react';

interface GoogleOAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GoogleOAuthModal({ isOpen, onClose }: GoogleOAuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    
    // Simulate Google OAuth process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    onClose();
    
    // In a real implementation, this would redirect to Google OAuth
    console.log('Google OAuth initiated');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-center">Sign in with Google</CardTitle>
          <CardDescription className="text-center">
            Choose your preferred sign-in method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full h-12 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Chrome className="h-5 w-5 mr-2" />
              )}
              {isLoading ? 'Connecting...' : 'Continue with Google'}
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              or
            </div>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full h-12"
            >
              <Mail className="h-5 w-5 mr-2" />
              Use Email Instead
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
