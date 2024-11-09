import { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDarkMode ? 'dark-theme' : 'light-theme';
    };

    const [theme, setTheme] = useState(getPreferredTheme);

    const toggleTheme = () => {
        const newTheme = theme === 'light-theme' ? 'dark-theme' : 'light-theme';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
