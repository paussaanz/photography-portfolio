import { createContext, useContext, useState, useEffect } from 'react';
import Loader from '../components/TransitionOverlay/Loader';

const LoaderContext = createContext();

export const LoaderContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showBg, setShowBg] = useState(false);

    useEffect(() => {
        const loadingDuration = 4000; // Define loading duration
        const bgDelay = 3000; // Delay before showing background

        const loadingTimer = setTimeout(() => setIsLoading(false), loadingDuration);
        const bgTimer = setTimeout(() => setShowBg(true), bgDelay);

        return () => {
            clearTimeout(loadingTimer);
            clearTimeout(bgTimer);
        };
    }, []);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading ? <Loader /> : showBg && children}
        </LoaderContext.Provider>
    );
};

// Custom hook for accessing loader context
export const useLoader = () => useContext(LoaderContext);
