'use client';

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Shield, ExternalLink } from 'lucide-react';

interface GoogleOAuthModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export function GoogleOAuthModal({ onClose, onLogin }: GoogleOAuthModalProps) {
  const handleGoogleAuth = () => {
    // Placeholder for Google OAuth integration
    // In a real implementation, this would redirect to Google OAuth
    console.log('Google OAuth integration would be implemented here');
    onLogin();
  };

  return (
    <Modal open={true} onOpenChange={(open) => !open && onClose()}>
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-neutral-200/80 border-2 border-primary-500">
              <Shield className="h-8 w-8 text-primary-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Google Authentication
          </h2>
          <p className="text-muted-foreground">
            This is a placeholder for Google OAuth integration
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-neutral-200/40 border border-neutral-400/40">
            <h3 className="font-semibold text-foreground mb-2">
              Implementation Details:
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Configure NextAuth.js with Google provider</li>
              <li>• Set up OAuth credentials in Google Console</li>
              <li>• Implement callback handling</li>
              <li>• Store user session data</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleGoogleAuth}
              className="flex-1 btn-gradient"
            >
              <Shield className="h-4 w-4 mr-2" />
              Continue with Google
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            This will redirect to Google's OAuth service
          </p>
        </div>
      </div>
    </Modal>
  );
}
