import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from 'react';

type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export const DarkModeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const storageKey = 'theme-preference';
  const getColorPreference = () => {
    const storedPreference = localStorage.getItem(storageKey);
    if (storedPreference) return storedPreference === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [darkMode, setDarkMode] = useState(getColorPreference());

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem(storageKey, newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  useEffect(() => {
    const handleSystemPreferenceChange = (event: MediaQueryListEvent) => {
      setDarkMode(event.matches);
    };

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQueryList.addEventListener('change', handleSystemPreferenceChange);

    return () => {
      mediaQueryList.removeEventListener(
        'change',
        handleSystemPreferenceChange
      );
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
