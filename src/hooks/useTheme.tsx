import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useColorScheme, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

type ColorScheme = {
  background: string;
  surface: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  error: string;
  success: string;
  warning: string;
  border: string;
  muted: string;
  card: string;
  shadow: string;
  overlay: string;
  [key: string]: string;
};

type Theme = {
  colors: ColorScheme;
  mode: 'light' | 'dark';
  toggleTheme: () => void;
};

const lightColors: ColorScheme = {
  background: '#F6F8FC',
  surface: '#FFFFFF',
  text: '#1A1A1A',
  primary: '#6366F1',      // Indigo-500
  secondary: '#06B6D4',    // Cyan-500
  accent: '#F59E42',       // Orange-400
  error: '#EF4444',        // Red-500
  success: '#22C55E',      // Green-500
  warning: '#FACC15',      // Yellow-400
  border: '#E5E7EB',       // Gray-200
  muted: '#9CA3AF',        // Gray-400
  card: '#F3F4F6',         // Gray-100
  shadow: Platform.select({ ios: '#00000022', android: '#00000044', default: '#00000022' })!,
  overlay: '#FFFFFFCC',
};

const darkColors: ColorScheme = {
  background: '#181A20',
  surface: '#23262F',
  text: '#F3F4F6',
  primary: '#818CF8',      // Indigo-400
  secondary: '#22D3EE',    // Cyan-400
  accent: '#FDBA74',       // Orange-300
  error: '#F87171',        // Red-400
  success: '#4ADE80',      // Green-400
  warning: '#FDE047',      // Yellow-300
  border: '#374151',       // Gray-700
  muted: '#6B7280',        // Gray-500
  card: '#23262F',         // Same as surface for dark
  shadow: Platform.select({ ios: '#00000099', android: '#000000AA', default: '#00000099' })!,
  overlay: '#23262FCC',
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<'light' | 'dark'>(
    (systemColorScheme as 'light' | 'dark') || 'light'
  );

  // Sync with system theme changes
  React.useEffect(() => {
    if (systemColorScheme && systemColorScheme !== mode) {
      setMode(systemColorScheme as 'light' | 'dark');
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = useMemo(() => (mode === 'light' ? lightColors : darkColors), [mode]);

  return (
    <ThemeContext.Provider value={{ colors, mode, toggleTheme }}>
      <StatusBar style={mode === 'light' ? 'dark' : 'light'} backgroundColor={colors.background} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};


