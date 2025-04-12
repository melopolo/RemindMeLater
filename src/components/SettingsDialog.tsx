
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings } from 'lucide-react';
import { getUserSettings, saveUserSettings } from '../data/settings';
import { UserSettings } from '../types';
import { useToast } from '../hooks/use-toast';

const SettingsDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<UserSettings>(getUserSettings());
  const { toast } = useToast();

  useEffect(() => {
    setSettings(getUserSettings());
  }, [isOpen]);

  const handleSave = () => {
    // Validate email
    if (settings.weeklyDigestEnabled && (!settings.email || !settings.email.includes('@'))) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address for the weekly digest",
        variant: "destructive",
      });
      return;
    }

    saveUserSettings(settings);
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
    });
    setIsOpen(false);
  };

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings size={20} />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email for Weekly Digest</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={settings.email}
              onChange={(e) => setSettings({...settings, email: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="digestDay">Send Weekly Digest On</Label>
            <Select 
              value={settings.weeklyDigestDay} 
              onValueChange={(value) => setSettings({...settings, weeklyDigestDay: value as any})}
            >
              <SelectTrigger id="digestDay">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {weekdays.map(day => (
                  <SelectItem key={day} value={day}>{day}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="digestEnabled">Enable Weekly Digest</Label>
            <Switch
              id="digestEnabled"
              checked={settings.weeklyDigestEnabled}
              onCheckedChange={(checked) => setSettings({...settings, weeklyDigestEnabled: checked})}
            />
          </div>
          
          <div className="pt-4">
            <Button onClick={handleSave} className="w-full">
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
