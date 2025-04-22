
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

// Get initial theme value without causing hydration mismatch
const getInitialTheme = (): Theme => {
  // Initial value as fallback
  let initialTheme: Theme = 'system';
  
  // Only try to access localStorage and window when in browser
  if (typeof window !== 'undefined') {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme && ['dark', 'light', 'system'].includes(savedTheme)) {
        initialTheme = savedTheme;
      }
    } catch (e) {
      console.error('Failed to get theme from localStorage:', e);
    }
  }
  
  return initialTheme;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Use the initial theme function to avoid hydration mismatch
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('light');
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state once component mounts
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const setTheme = (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Only show toast if component is mounted
      if (mounted) {
        toast.success(`Theme changed to ${newTheme}`);
      }
    } catch (err) {
      console.error('Error saving theme preference:', err);
    }
  };
  
  // Apply theme to document and determine resolved theme - only when mounted
  useEffect(() => {
    if (!mounted) return;
    
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
  }, [theme, mounted]);

  // Listen for system theme changes - only when mounted
  useEffect(() => {
    if (!mounted) return;
    
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
  }, [theme, mounted]);

  // Set initial resolved theme
  useEffect(() => {
    if (mounted && theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setResolvedTheme(systemTheme);
    } else if (mounted) {
      setResolvedTheme(theme as 'dark' | 'light');
    }
  }, [mounted, theme]);

  const isDark = resolvedTheme === 'dark';
  
  // Use a simple render to prevent hydration issues during initial render
  const value = { 
    theme, 
    setTheme, 
    resolvedTheme, 
    isDark 
  };
  
  // Avoid SSR issues by returning children directly before mount
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
