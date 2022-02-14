import React, { createContext, useCallback, useState } from 'react';

export type ThemeType = 'LIGHT' | 'DARK';

export type ThemeContextType = {
  theme: ThemeType;
  handleToggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('LIGHT');

  const handleToggleTheme = useCallback(() => {
    const currentTheme = document.documentElement.getAttribute('theme');

    if (!currentTheme) {
      setTheme('DARK');
      return document.documentElement.setAttribute('theme', 'dark');
    } else {
      setTheme('LIGHT');
      return document.documentElement.removeAttribute('theme');
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        handleToggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
