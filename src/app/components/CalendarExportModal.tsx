import { X, Calendar as CalendarIcon, Bell, Download, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface SavedFestival {
  id: string;
  name: string;
  location: string;
  country: string;
  dates: string;
  startDate: Date;
  endDate: Date;
  ticketStatus?: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
  nextOpeningDate?: string;
}

interface CalendarExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedFestivals: SavedFestival[];
}

export function CalendarExportModal({ isOpen, onClose, savedFestivals }: CalendarExportModalProps) {
  const [includeFestivals, setIncludeFestivals] = useState(true);
  const [includeReminders, setIncludeReminders] = useState(true);

  if (!isOpen) return null;

  // Count festivals with ticket opening dates
  const festivalsWithReminders = savedFestivals.filter(f => f.nextOpeningDate).length;
  const totalFestivals = savedFestivals.length;

  // Generate .ics file content
  const generateICS = () => {
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Forró Europe//Calendar Export//EN',
      'CALSCALE:GREGORIAN',
    ];

    if (includeFestivals) {
      savedFestivals.forEach(festival => {
        const startDate = formatDateForICS(festival.startDate);
        const endDate = formatDateForICS(new Date(festival.endDate.getTime() + 24 * 60 * 60 * 1000)); // +1 day for all-day event
        
        icsContent.push(
          'BEGIN:VEVENT',
          `UID:festival-${festival.id}@forroeurope.com`,
          `DTSTAMP:${formatDateForICS(new Date())}`,
          `DTSTART;VALUE=DATE:${startDate}`,
          `DTEND;VALUE=DATE:${endDate}`,
          `SUMMARY:${escapeICS(festival.name)}`,
          `LOCATION:${escapeICS(`${festival.location}, ${festival.country}`)}`,
          `DESCRIPTION:${escapeICS(festival.dates)}`,
          'END:VEVENT'
        );
      });
    }

    if (includeReminders) {
      savedFestivals.forEach(festival => {
        if (festival.nextOpeningDate) {
          const openingDate = new Date(festival.nextOpeningDate);
          const startDateTime = formatDateTimeForICS(openingDate);
          const endDateTime = formatDateTimeForICS(new Date(openingDate.getTime() + 60 * 60 * 1000)); // 1 hour duration

          icsContent.push(
            'BEGIN:VEVENT',
            `UID:reminder-${festival.id}@forroeurope.com`,
            `DTSTAMP:${formatDateForICS(new Date())}`,
            `DTSTART:${startDateTime}`,
            `DTEND:${endDateTime}`,
            `SUMMARY:${escapeICS(`Tickets open: ${festival.name}`)}`,
            `DESCRIPTION:${escapeICS(`Ticket sales open for ${festival.name}`)}`,
            'BEGIN:VALARM',
            'TRIGGER:-PT15M',
            'ACTION:DISPLAY',
            'DESCRIPTION:Tickets opening in 15 minutes',
            'END:VALARM',
            'END:VEVENT'
          );
        }
      });
    }

    icsContent.push('END:VCALENDAR');
    return icsContent.join('\r\n');
  };

  const formatDateForICS = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const formatDateTimeForICS = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };

  const escapeICS = (text: string): string => {
    return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  };

  const handleDownloadICS = () => {
    const icsContent = generateICS();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'forro-europe-festivals.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGoogleCalendar = () => {
    // For Google Calendar, we'll download the ICS and instruct users to import
    // (Direct Google Calendar URL generation is complex for multiple events)
    handleDownloadICS();
    setTimeout(() => {
      window.open('https://calendar.google.com/calendar/r/settings/export', '_blank');
    }, 500);
  };

  // Empty state
  if (totalFestivals === 0) {
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/60 z-50"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl shadow-2xl max-w-md w-full animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-bold">No festivals to export yet</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <CalendarIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Save festivals first, then add them to your calendar.
              </p>
              <Button
                onClick={onClose}
                className="w-full bg-[#3D63FF] hover:bg-[#2952E5] text-white font-bold"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-xl shadow-2xl max-w-lg w-full animate-slide-up max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-background z-10">
            <h2 className="text-lg font-bold">Add saved festivals to calendar</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 space-y-5">
            {/* Export scope summary - more compact */}
            <div className="bg-[#3D63FF]/[0.03] border border-[#3D63FF]/[0.08] rounded-lg px-3 py-2">
              <p className="text-xs font-medium text-foreground">
                All {totalFestivals} saved {totalFestivals === 1 ? 'festival' : 'festivals'} will be exported
              </p>
            </div>

            {/* Intro */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              Export your saved festivals as calendar events to plan the season and keep track of ticket openings.
            </p>

            {/* Include options */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-foreground">Include</h3>
              
              {/* Festival dates checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    checked={includeFestivals}
                    onChange={(e) => setIncludeFestivals(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-[#3D63FF] focus:ring-2 focus:ring-[#3D63FF] focus:ring-offset-0"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Festival dates</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Add one calendar event for each saved festival.
                  </p>
                </div>
              </label>

              {/* Ticket reminders checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    checked={includeReminders}
                    onChange={(e) => setIncludeReminders(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-[#3D63FF] focus:ring-2 focus:ring-[#3D63FF] focus:ring-offset-0"
                    disabled={festivalsWithReminders === 0}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Bell className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className={`text-sm font-medium ${festivalsWithReminders === 0 ? 'text-muted-foreground' : 'text-foreground'}`}>
                      Ticket opening reminders
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {festivalsWithReminders > 0 
                      ? 'Add reminder events for festivals with confirmed ticket opening dates.'
                      : 'No ticket opening reminders available yet. We can still export all saved festival dates.'
                    }
                  </p>
                </div>
              </label>
            </div>

            {/* Count summary */}
            <div className="bg-muted/40 rounded-lg px-3 py-2.5 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Festivals selected</span>
                <span className="font-bold text-foreground">{totalFestivals}</span>
              </div>
              {festivalsWithReminders > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ticket opening reminders available</span>
                  <span className="font-bold text-foreground">{festivalsWithReminders}</span>
                </div>
              )}
            </div>

            {/* Export format */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-foreground">Export format</h3>
              
              <div className="space-y-2.5">
                <Button
                  onClick={handleGoogleCalendar}
                  className="w-full bg-[#3D63FF] hover:bg-[#2952E5] text-white font-bold gap-2 justify-center h-10"
                  disabled={!includeFestivals && !includeReminders}
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Google Calendar
                </Button>
                
                <Button
                  onClick={handleDownloadICS}
                  variant="outline"
                  className="w-full font-bold gap-2 justify-center h-10"
                  disabled={!includeFestivals && !includeReminders}
                >
                  <Download className="w-4 h-4" />
                  Download .ics
                </Button>
              </div>

              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                Compatible with Apple Calendar, Outlook, and most calendar apps.
              </p>
            </div>

            {/* Bottom note */}
            {festivalsWithReminders > 0 && (
              <div className="pt-3 border-t border-border">
                <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                  Ticket opening reminders are only added for festivals with confirmed opening dates.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}