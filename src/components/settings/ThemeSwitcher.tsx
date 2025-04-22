
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Monitor } from 'lucide-react';

export const ThemeCard = ({ label }: { label: string }) => {
  return (
    <div className="border rounded-lg p-4">
      <p className="font-medium">{label}</p>
    </div>
  );
};

export const ThemeSwitcher = () => {
  // Get theme functions from context
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Theme Settings</h3>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant={theme === 'light' ? 'default' : 'outline'}
          className={`px-4 py-2 flex items-center justify-center ${theme === 'light' ? 'bg-blue-600 text-white' : ''}`}
          onClick={() => setTheme('light')}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light Mode
        </Button>
        
        <Button 
          variant={theme === 'dark' ? 'default' : 'outline'}
          className={`px-4 py-2 flex items-center justify-center ${theme === 'dark' ? 'bg-blue-600 text-white' : ''}`}
          onClick={() => setTheme('dark')}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark Mode
        </Button>
        
        <Button 
          variant={theme === 'system' ? 'default' : 'outline'}
          className={`px-4 py-2 flex items-center justify-center ${theme === 'system' ? 'bg-blue-600 text-white' : ''}`}
          onClick={() => setTheme('system')}
        >
          <Monitor className="mr-2 h-4 w-4" />
          System Preference
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 mt-2">
        Current theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </p>
    </div>
  );
};
