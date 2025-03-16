import { createContext, useContext, useState, ReactNode } from 'react';

type TemperatureUnit = 'C' | 'F';

interface TemperatureContextType {
  unit: TemperatureUnit;
  getDefaultUnit: (country: string) => TemperatureUnit;
  convertTemperature: (celsius: number) => number;
}

const FAHRENHEIT_COUNTRIES = ['US', 'BS', 'KY', 'LR', 'PW', 'FM', 'MH'];

const TemperatureContext = createContext<TemperatureContextType | undefined>(undefined);

export const TemperatureProvider = ({ children }: { children: ReactNode }) => {
  const [unit, setUnit] = useState<TemperatureUnit>('C');

  const getDefaultUnit = (country: string): TemperatureUnit => {
    return FAHRENHEIT_COUNTRIES.includes(country) ? 'F' : 'C';
  };

  const convertTemperature = (celsius: number): number => {
    if (unit === 'C') return celsius;
    return Math.round((celsius * 9/5) + 32);
  };

  return (
    <TemperatureContext.Provider value={{ unit, getDefaultUnit, convertTemperature }}>
      {children}
    </TemperatureContext.Provider>
  );
};

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (context === undefined) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
}; 