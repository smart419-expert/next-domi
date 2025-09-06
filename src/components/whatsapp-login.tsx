'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageSquare, Phone, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useLanguage } from '@/contexts/language-context';

export function WhatsAppLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as +1 (XXX) XXX-XXXX for US numbers
    if (digits.length <= 10) {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    
    // For international numbers, just add + at the beginning
    return `+${digits}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const sendWhatsAppCode = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error(t('whatsapp.error_invalid_phone'));
      return;
    }

    setIsLoading(true);
    
    // Simulate sending WhatsApp code
    setTimeout(() => {
      setIsCodeSent(true);
      setIsLoading(false);
      toast.success(t('whatsapp.success_message'));
    }, 2000);
  };

  const verifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error(t('whatsapp.error_invalid_code'));
      return;
    }

    setIsLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      // Create mock user based on phone number
      const mockUser = {
        id: `whatsapp-${phoneNumber.replace(/\D/g, '')}`,
        email: `${phoneNumber.replace(/\D/g, '')}@whatsapp.local`,
        name: `WhatsApp User (${phoneNumber})`,
        role: 'user' as const,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phoneNumber.replace(/\D/g, '')}`
      };
      
      login(mockUser);
      toast.success(`¡Iniciado sesión por WhatsApp!`);
      
      // Redirect after login
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }, 1500);
  };

  const resendCode = () => {
    setIsCodeSent(false);
    setVerificationCode('');
    sendWhatsAppCode();
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('whatsapp.title')}</h3>
        <p className="text-sm text-gray-600">
          {t('whatsapp.description')}
        </p>
      </div>

      {!isCodeSent ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="phone">{t('whatsapp.phone_label')}</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder={t('whatsapp.phone_placeholder')}
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t('whatsapp.code_description')}
            </p>
          </div>

          <Button
            onClick={sendWhatsAppCode}
            disabled={isLoading || !phoneNumber}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enviando Código...
              </>
            ) : (
              <>
                <MessageSquare className="h-4 w-4 mr-2" />
                {t('whatsapp.send_code')}
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 text-center">
              ✅ Código de verificación enviado a {phoneNumber}
            </p>
          </div>

          <div>
            <Label htmlFor="code">{t('whatsapp.verify_code')}</Label>
            <Input
              id="code"
              type="text"
              placeholder={t('whatsapp.code_placeholder')}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="text-center text-lg tracking-widest"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1 text-center">
              Ingresa el código de 6 dígitos de WhatsApp
            </p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={verifyCode}
              disabled={isLoading || verificationCode.length !== 6}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verificando...
                </>
              ) : (
                'Verificar e Iniciar Sesión'
              )}
            </Button>

            <Button
              onClick={resendCode}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              {t('whatsapp.resend_code')}
            </Button>
          </div>
        </div>
      )}

      <div className="text-center">
        <p className="text-xs text-gray-500">
          {t('whatsapp.disclaimer')}
        </p>
      </div>
    </div>
  );
}
