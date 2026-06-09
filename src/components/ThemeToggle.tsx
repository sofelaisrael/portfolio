import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  setCursorHovered?: (hovered: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ setCursorHovered }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setCursorHovered?.(true)}
      onMouseLeave={() => setCursorHovered?.(false)}
      className="interactive-link p-2 rounded-lg w-fit transition-all duration-300"
      style={{
        backgroundColor: 'hsl(var(--surface))',
        color: 'hsl(var(--text-main))',
        cursor: 'none',
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-500 absolute inset-0"
          style={{ 
            transform: theme === 'dark' ? 'rotate(-180deg) scale(0)' : 'rotate(0deg) scale(1)',
            opacity: theme === 'light' ? 1 : 0,
          }}
        >
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-500 absolute inset-0"
          style={{ 
            transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(180deg) scale(0)',
            opacity: theme === 'dark' ? 1 : 0,
          }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
};

export default ThemeToggle;
