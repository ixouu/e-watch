import React, { createContext, useContext, useState } from "react";


const Context = createContext();

export const DataContext = ({ children }) => {
    const [data, setData] = useState(undefined);
    
    return(
        <Context.Provider value={{ data, setData }}>
            {children}
        </Context.Provider>
    )
};




export const useDataContext = () => useContext(Context)