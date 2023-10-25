import React, {useState, useContext, createContext} from 'react';

export const RandomWordContext = createContext();

export const RandomWordProvider = ({children}) => {

    const setupCountWord = 3;

    const [progressbar, setProgressbar] = useState(0); // progressBar line

    const updateProgressbar = () => {
        setProgressbar((prevValue) => {
            // console.log("prevValue " + prevValue);
            const increment = 100 / setupCountWord;
            // console.log("increment " + increment);
            const newValue = prevValue + increment;
            // console.log("newValue " + newValue);
            return newValue;
        });
    };

    return (
        <RandomWordContext.Provider value={{updateProgressbar, progressbar, setupCountWord}}>
            {children}
        </RandomWordContext.Provider>
    );
}

export const useRandomWord = () => useContext(RandomWordContext);