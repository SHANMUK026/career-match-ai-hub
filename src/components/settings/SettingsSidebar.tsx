
import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { User, Lock, Bell, Shield, Palette, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ id, label, icon, active, onClick }: NavItemProps) => (
  <motion.button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-5 py-4 text-left rounded-md transition-all",
      active ? "bg-blue-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"
    )}
    whileHover={!active ? { x: 5 } : {}}
    whileTap={{ scale: 0.98 }}
  >
    <div className="w-6 h-6 flex items-center justify-center">
      {icon}
    </div>
    <span className={active ? "font-medium" : ""}>{label}</span>
  </motion.button>
);

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const SettingsSidebar = ({ activeTab, setActiveTab }: SettingsSidebarProps) => {
  return (
    <div className="md:w-64 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
      <div className="p-3">
        <NavItem 
          id="profile" 
          label="Profile" 
          icon={<User size={18} />} 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        />
        <NavItem 
          id="account" 
          label="Account Security" 
          icon={<Lock size={18} />} 
          active={activeTab === 'account'} 
          onClick={() => setActiveTab('account')}
        />
        <NavItem 
          id="notifications" 
          label="Notifications" 
          icon={<Bell size={18} />} 
          active={activeTab === 'notifications'} 
          onClick={() => setActiveTab('notifications')}
        />
        <NavItem 
          id="privacy" 
          label="Privacy" 
          icon={<Shield size={18} />} 
          active={activeTab === 'privacy'} 
          onClick={() => setActiveTab('privacy')}
        />
        <NavItem 
          id="appearance" 
          label="Appearance" 
          icon={<Palette size={18} />} 
          active={activeTab === 'appearance'} 
          onClick={() => setActiveTab('appearance')}
        />
      </div>
      
      <div className="border-t border-gray-100 dark:border-gray-800 mt-2 p-3">
        <Card className="border border-red-100 bg-red-50 dark:bg-red-900/30 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Trash2 className="h-6 w-6 text-red-500 dark:text-red-400 mb-2" />
              <h3 className="font-semibold text-red-700 dark:text-red-300">Delete Account</h3>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 mb-3">This action is irreversible.</p>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => toast.error("Account deletion is currently disabled.")}
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
