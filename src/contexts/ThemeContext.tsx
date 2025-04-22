
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'dark' | 'light'; // The actual theme after system preferences are applied
  isDark: boolean; // Convenience boolean for dark mode checks
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize with a safe default that won't cause render errors
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('light');
  
  // Initialize theme from localStorage safely
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme && ['dark', 'light', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    } catch (err) {
      console.error('Error accessing localStorage:', err);
    }
  }, []);
  
  const setTheme = (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      localStorage.setItem('theme', newTheme);
      toast.success(`Theme changed to ${newTheme}`);
    } catch (err) {
      console.error('Error saving theme preference:', err);
    }
  };
  
  // Apply theme to document and determine resolved theme
  useEffect(() => {
    try {
      const root = window.document.documentElement;
      
      // Remove old classes
      root.classList.remove('dark', 'light');
      
      // Handle system preference
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
        setResolvedTheme(systemTheme);
        return;
      }

      // Add chosen theme class
      root.classList.add(theme);
      setResolvedTheme(theme);
    } catch (err) {
      console.error('Error applying theme to document:', err);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        if (theme === 'system') {
          const root = window.document.documentElement;
          const newTheme = mediaQuery.matches ? 'dark' : 'light';
          root.classList.remove('dark', 'light');
          root.classList.add(newTheme);
          setResolvedTheme(newTheme);
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (err) {
      console.error('Error setting up system theme listener:', err);
    }
  }, [theme]);

  const isDark = resolvedTheme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
