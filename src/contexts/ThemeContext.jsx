import { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const availableThemes = ['light-theme', 'dark-theme', 'green-theme', 'purple-theme'];

    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && availableThemes.includes(savedTheme)) {
            return savedTheme;
        }

        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDarkMode ? 'dark-theme' : 'light-theme';
    };

    const [theme, setTheme] = useState(getPreferredTheme);

    const setThemeMode = (themeName) => {
        if (availableThemes.includes(themeName)) {
            setTheme(themeName);
            localStorage.setItem('theme', themeName);
        } else {
            console.warn(`Theme "${themeName}" is not a valid theme.`);
        }
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
