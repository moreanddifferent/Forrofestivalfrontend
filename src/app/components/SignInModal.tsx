import { X } from 'lucide-react';
import { Button } from './ui/button';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
  action: 'save' | 'share' | 'alert';
}

export function SignInModal({ isOpen, onClose, onSignIn, action }: SignInModalProps) {
  if (!isOpen) return null;

  const actionText = {
    save: 'save festivals',
    share: 'share your wishlist',
    alert: 'set ticket alerts',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background border border-border rounded-2xl shadow-lg max-w-md w-full mx-4 p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Sign in to continue</h2>
            <p className="text-muted-foreground leading-relaxed">
              Create an account or sign in to {actionText[action]}. Your saved festivals and alerts will sync across devices.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full bg-[#2F5BFF] hover:bg-[#1A44E0] text-white"
              onClick={onSignIn}
            >
              Continue with Email
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full"
              onClick={onSignIn}
            >
              Continue with Google
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            By continuing, you agree to our terms of service and privacy policy. We'll only use your information to save your preferences and send ticket alerts.
          </p>
        </div>
      </div>
    </div>
  );
}