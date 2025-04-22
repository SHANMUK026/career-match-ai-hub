
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

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
      
      <div className="flex flex-col gap-3">
        <button 
          className={`px-4 py-2 border rounded-lg ${theme === 'light' ? 'bg-blue-100 border-blue-500' : ''}`}
          onClick={() => setTheme('light')}
        >
          Light Mode
        </button>
        
        <button 
          className={`px-4 py-2 border rounded-lg ${theme === 'dark' ? 'bg-blue-100 border-blue-500' : ''}`}
          onClick={() => setTheme('dark')}
        >
          Dark Mode
        </button>
        
        <button 
          className={`px-4 py-2 border rounded-lg ${theme === 'system' ? 'bg-blue-100 border-blue-500' : ''}`}
          onClick={() => setTheme('system')}
        >
          System Preference
        </button>
      </div>
      
      <p className="text-sm text-gray-500 mt-2">
        Current theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </p>
    </div>
  );
};
