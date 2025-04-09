
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';

interface ThemeCardProps {
  theme: 'light' | 'dark' | 'system';
  label: string;
  icon: React.ReactNode;
  current: string;
  onClick: () => void;
}

export const ThemeCard = ({ theme, label, icon, current, onClick }: ThemeCardProps) => {
  const isActive = current === theme;
  
  return (
    <motion.div 
      className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
        isActive ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
      }`}
      onClick={onClick}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`h-24 w-full flex items-center justify-center ${
        theme === 'light' ? "bg-white" : 
        theme === 'dark' ? "bg-gray-900 text-white" : 
        "bg-gradient-to-r from-white to-gray-900"
      }`}>
        {icon}
      </div>
      <div className="p-3 text-center">
        <p className="font-medium">{label}</p>
      </div>
    </motion.div>
  );
};

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <ThemeCard 
        theme="light"
        label="Light Mode" 
        icon={<Sun size={32} className="text-yellow-500" />}
        current={theme}
        onClick={() => setTheme('light')}
      />
      <ThemeCard 
        theme="dark" 
        label="Dark Mode"
        icon={<Moon size={32} className="text-blue-400" />}
        current={theme}
        onClick={() => setTheme('dark')}
      />
      <ThemeCard 
        theme="system" 
        label="System Default"
        icon={<Monitor size={32} className="text-gray-600 dark:text-gray-300" />}
        current={theme}
        onClick={() => setTheme('system')}
      />
    </div>
  );
};
