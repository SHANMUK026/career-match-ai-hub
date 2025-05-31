
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Theme } from '@/types/profile';

export const ThemeCard = ({ label }: { label: string }) => {
  return (
    <div className="border rounded-lg p-4">
      <p className="font-medium">{label}</p>
    </div>
  );
};

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  
  // Validate theme to prevent potential XSS vulnerabilities
  const validThemes: Theme[] = ['light', 'dark', 'system'];
  const safeTheme: Theme = validThemes.includes(theme as Theme) 
    ? theme as Theme 
    : 'system';
  
  // Further sanitize for display
  const displayTheme = safeTheme.replace(/[<>]/g, '').charAt(0).toUpperCase() + safeTheme.slice(1);
  
  const handleThemeChange = (newTheme: Theme) => {
    // Validate the theme before setting it
    if (validThemes.includes(newTheme)) {
      console.log('Changing theme to:', newTheme);
      setTheme(newTheme);
    } else {
      console.error('Invalid theme attempted:', newTheme);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Theme Settings</h3>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant={safeTheme === 'light' ? 'default' : 'outline'}
          className="px-4 py-2 flex items-center justify-center"
          onClick={() => handleThemeChange('light')}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light Mode
        </Button>
        
        <Button 
          variant={safeTheme === 'dark' ? 'default' : 'outline'}
          className="px-4 py-2 flex items-center justify-center"
          onClick={() => handleThemeChange('dark')}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark Mode
        </Button>
        
        <Button 
          variant={safeTheme === 'system' ? 'default' : 'outline'}
          className="px-4 py-2 flex items-center justify-center"
          onClick={() => handleThemeChange('system')}
        >
          <Monitor className="mr-2 h-4 w-4" />
          System Preference
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Current theme: {displayTheme}
      </p>
    </div>
  );
};
