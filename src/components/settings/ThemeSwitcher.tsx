
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ThemeCard label="Light Mode" />
        <ThemeCard label="Dark Mode" />
        <ThemeCard label="System Default" />
      </div>
    </div>
  );
};

