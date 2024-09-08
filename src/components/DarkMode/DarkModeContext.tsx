import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from './DarkModeProvider';
import { FC } from 'react';

const ThemeToggleButton: FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className='theme-toggle'
      id='theme-toggle'
      title='Toggles light & dark'
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-live='polite'
    >
      {darkMode ? <Moon className='icon' /> : <Sun className='icon' />}
    </button>
  );
};

export default ThemeToggleButton;
