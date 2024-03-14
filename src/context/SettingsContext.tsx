import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  numberRange: number;
  setNumberRange: (range: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [numberRange, setNumberRange] = useState<number>(75);
  

  const value = {
    numberRange,
    setNumberRange,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
