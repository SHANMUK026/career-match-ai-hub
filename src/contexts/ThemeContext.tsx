
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Theme } from '@/types/profile';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'dark' | 'light';
  isDark: boolean;
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
  // Default to system as fallback
  let initialTheme: Theme = 'system';
  
  // Only try to access localStorage when in browser
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

// Get system theme preference safely
const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light'; // Default if SSR
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Store theme preference
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  // Track the actual resolved theme (after system preference is applied)
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>(
    theme === 'system' ? getSystemTheme() : (theme as 'dark' | 'light')
  );
  // Track if the component has mounted
  const [mounted, setMounted] = useState(false);
  
  // Mark as mounted once component mounts
  useEffect(() => {
    console.log("ThemeProvider mounted");
    setMounted(true);
  }, []);

  // Theme change handler
  const setTheme = (newTheme: Theme) => {
    try {
      console.log("Setting theme to:", newTheme);
      setThemeState(newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (mounted) {
        toast.success(`Theme changed to ${newTheme}`);
      }
    } catch (err) {
      console.error('Error saving theme preference:', err);
    }
  };
  
  // Apply theme to document - only when mounted
  useEffect(() => {
    if (!mounted) return;
    
    try {
      console.log("Applying theme to document:", theme);
      const root = window.document.documentElement;
      
      // Remove old theme classes
      root.classList.remove('dark', 'light');
      
      // Handle system preference
      if (theme === 'system') {
        const systemTheme = getSystemTheme();
        root.classList.add(systemTheme);
        setResolvedTheme(systemTheme);
        return;
      }

      // Apply theme directly
      root.classList.add(theme);
      setResolvedTheme(theme);
    } catch (err) {
      console.error('Error applying theme to document:', err);
    }
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;
    
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        if (theme === 'system') {
          const newTheme = mediaQuery.matches ? 'dark' : 'light';
          const root = window.document.documentElement;
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

  // Value for the context
  const contextValue = {
    theme,
    setTheme,
    resolvedTheme,
    isDark: resolvedTheme === 'dark'
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
