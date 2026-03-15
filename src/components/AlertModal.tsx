import { useState } from 'react';
import { X, Bell, Clock, Mail, Smartphone, Check } from 'lucide-react';
import { Button } from './ui/button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  festivalName: string;
  nextOpeningDate?: string;
  nextOpeningTime?: string;
  onConfirm: (options: AlertOptions) => void;
  isAlreadySet?: boolean;
}

export interface AlertOptions {
  notifyAtOpening: boolean;
  reminder24h: boolean;
  channels: {
    email: boolean;
    inApp: boolean;
  };
}

export function AlertModal({
  isOpen,
  onClose,
  festivalName,
  nextOpeningDate,
  nextOpeningTime,
  onConfirm,
  isAlreadySet = false,
}: AlertModalProps) {
  const [notifyAtOpening, setNotifyAtOpening] = useState(true);
  const [reminder24h, setReminder24h] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [inAppEnabled, setInAppEnabled] = useState(true);

  if (!isOpen) return null;

  const formattedDate = nextOpeningDate
    ? new Date(nextOpeningDate).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const handleConfirm = () => {
    onConfirm({
      notifyAtOpening,
      reminder24h,
      channels: {
        email: emailEnabled,
        inApp: inAppEnabled,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md mx-0 sm:mx-4 animate-slide-up sm:animate-none">
        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0E7C66]/10 rounded-full flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-[#0E7C66]" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Ticket alerts</h2>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {festivalName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Next opening info */}
        {formattedDate && (
          <div className="mx-5 mt-4 p-3 bg-[#2F5BFF]/5 border border-[#2F5BFF]/15 rounded-lg">
            <p className="text-sm">
              <span className="font-bold text-[#2F5BFF]">Next opening: </span>
              <span>
                {formattedDate}
                {nextOpeningTime && ` at ${nextOpeningTime}`}
              </span>
            </p>
          </div>
        )}

        {/* Alert options */}
        <div className="p-5 space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
            When to notify
          </p>

          {/* Notify at opening */}
          <button
            onClick={() => setNotifyAtOpening(!notifyAtOpening)}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
              notifyAtOpening
                ? 'border-[#0E7C66] bg-[#0E7C66]/5'
                : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors shrink-0 ${
                notifyAtOpening
                  ? 'bg-[#0E7C66] border-[#0E7C66]'
                  : 'border-muted-foreground/40'
              }`}
            >
              {notifyAtOpening && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold">Notify at opening</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Get notified the moment tickets go on sale
              </p>
            </div>
            <Bell className="w-4 h-4 text-muted-foreground shrink-0" />
          </button>

          {/* 24h reminder */}
          <button
            onClick={() => setReminder24h(!reminder24h)}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
              reminder24h
                ? 'border-[#0E7C66] bg-[#0E7C66]/5'
                : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors shrink-0 ${
                reminder24h
                  ? 'bg-[#0E7C66] border-[#0E7C66]'
                  : 'border-muted-foreground/40'
              }`}
            >
              {reminder24h && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold">24h reminder</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                A heads-up the day before tickets open
              </p>
            </div>
            <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
          </button>
        </div>

        {/* Channels */}
        <div className="px-5 pb-2">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
            How to notify
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setEmailEnabled(!emailEnabled)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm transition-all ${
                emailEnabled
                  ? 'border-[#0E7C66] bg-[#0E7C66]/5 text-[#0E7C66] font-bold'
                  : 'border-border text-muted-foreground hover:border-muted-foreground/30'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
            <button
              onClick={() => setInAppEnabled(!inAppEnabled)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm transition-all ${
                inAppEnabled
                  ? 'border-[#0E7C66] bg-[#0E7C66]/5 text-[#0E7C66] font-bold'
                  : 'border-border text-muted-foreground hover:border-muted-foreground/30'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>In-app</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="p-5 pt-4 space-y-2">
          {isAlreadySet ? (
            <>
              <Button
                size="lg"
                className="w-full bg-[#2F5BFF] hover:bg-[#1A44E0] text-white font-bold"
                onClick={handleConfirm}
              >
                Update alert
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="w-full text-destructive hover:text-destructive"
                onClick={onClose}
              >
                Remove alert
              </Button>
            </>
          ) : (
            <>
              <Button
                size="lg"
                className="w-full bg-[#2F5BFF] hover:bg-[#1A44E0] text-white font-bold gap-2"
                onClick={handleConfirm}
                disabled={!notifyAtOpening && !reminder24h}
              >
                <Bell className="w-4 h-4" />
                Set alert
              </Button>
              <p className="text-[11px] text-center text-muted-foreground">
                Service alerts only — no marketing, ever.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}