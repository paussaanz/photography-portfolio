import { createContext, useContext, useState, useEffect } from 'react';
import Loader from '../components/TransitionOverlay/Loader';

const LoaderContext = createContext();

export const LoaderContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [showBg, setShowBg] = useState(false);

    useEffect(() => {
        // Simulate loading time or replace with actual loading logic
        const timer = setTimeout(() => setIsLoading(false), 5000); // Adjust time as needed

        const timer2 = setTimeout(() => setShowBg(true), 3000);
        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        }
    }, []);

    return (

        // <div className="background--light d--vh-100">
            <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
                {isLoading && <Loader />}
                {showBg && children}
            </LoaderContext.Provider>
        // </div>
    );
};

// Custom hook for accessing loader context
export const useLoader = () => useContext(LoaderContext);