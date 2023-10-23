import React, {useState, useContext, createContext} from 'react';

export const RandomWordContext = createContext();

export const RandomWordProvider = ({children}) => {

    const setupCountWord = 3;

    const [line, setLine] = useState(0); // progressBar line

    const updateLine = () => {
        setLine(prevValue => {
            // console.log('prevValue ' + prevValue);
            const increment = 100 / setupCountWord;
            // console.log('increment ' + increment);
            const newValue = prevValue + increment;
            // console.log('newValue ' + newValue);
            return newValue;
            // setLine(prevValue => prevValue + (100 / (randomWords.length)));
        });
    }

    return (
        <RandomWordContext.Provider value={{updateLine, line}}>
            {children}
        </RandomWordContext.Provider>
    );
}

export const useRandomWord = () => useContext(RandomWordContext);