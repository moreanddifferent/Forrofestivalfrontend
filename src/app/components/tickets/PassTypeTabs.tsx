import { useState, ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export interface PassTypeTab {
  id: string;
  label: string; // "Full Pass", "School Pass", "Night Pass"
  description?: string;
  content: ReactNode;
}

interface PassTypeTabsProps {
  tabs: PassTypeTab[];
  defaultTab?: string;
}

export function PassTypeTabs({ tabs, defaultTab }: PassTypeTabsProps) {
  const [selectedTab, setSelectedTab] = useState(defaultTab || tabs[0]?.id || '');

  if (tabs.length === 0) {
    return null;
  }

  // Single tab: render without tabs UI
  if (tabs.length === 1) {
    const tab = tabs[0];
    return (
      <div className="space-y-4">
        {tab.description && (
          <p className="text-sm text-muted-foreground">{tab.description}</p>
        )}
        {tab.content}
      </div>
    );
  }

  // Multiple tabs: render tabs UI
  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <TabsList 
        className="w-full grid mb-6" 
        style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
      >
        {tabs.map(tab => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(tab => (
        <TabsContent key={tab.id} value={tab.id} className="space-y-4">
          {tab.description && (
            <p className="text-sm text-muted-foreground">{tab.description}</p>
          )}
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
