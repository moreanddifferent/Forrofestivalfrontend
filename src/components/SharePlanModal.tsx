import { X, Link as LinkIcon, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface SharePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasAccount: boolean;
}

export function SharePlanModal({ isOpen, onClose, hasAccount }: SharePlanModalProps) {
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareLink = 'https://forroplan.com/shared/abc123xyz';

  if (!isOpen) return null;

  const handleGenerateLink = () => {
    setLinkGenerated(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-card rounded-xl shadow-2xl max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Share your plan</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {!hasAccount ? (
              // Account creation prompt
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Create a free account to generate a shareable link to your festival plan. Your friends will see which festivals you're attending without needing to sign up.
                </p>
                
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Read-only public link</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Updates automatically when you change your plan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>No ads or tracking for viewers</span>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <Button className="w-full" size="lg">
                    Create free account
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={onClose}
                  >
                    Maybe later
                  </Button>
                </div>
              </div>
            ) : !linkGenerated ? (
              // Generate link
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Generate a shareable link to your 2026 festival plan. Anyone with the link can view your saved festivals and their status.
                </p>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleGenerateLink}
                >
                  <LinkIcon className="w-5 h-5 mr-2" />
                  Generate shareable link
                </Button>
              </div>
            ) : (
              // Link generated
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your shareable link is ready:
                </p>

                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-3 bg-muted rounded-lg text-sm font-mono truncate">
                    {shareLink}
                  </div>
                  <Button
                    variant={copied ? 'default' : 'outline'}
                    onClick={handleCopyLink}
                    className="shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      'Copy'
                    )}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  This link updates automatically when you modify your plan. You can revoke access anytime from your account settings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
