
import React from 'react';

export const ThemeCard = ({ label }: { label: string }) => {
  return (
    <div className="border rounded-lg p-4">
      <p className="font-medium">{label}</p>
    </div>
  );
};

export const ThemeSwitcher = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Theme Settings</h3>
      <p className="text-sm text-gray-500">Theme functionality will be implemented in a future update</p>
    </div>
  );
};
