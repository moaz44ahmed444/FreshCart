import { createContext, useState } from "react";


export let counterContext = createContext();

export function CounterContextProvider(props) {
    let [userName, setUserName] = useState('mooooooooooooooooooooooo');

    return <counterContext.Provider value={{userName}}>
        {props.children}
    </counterContext.Provider>
}