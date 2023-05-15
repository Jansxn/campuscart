import React, { useState, createContext } from 'react';

export const personal_info_demo = {
    userid: '1',//userData.fname+' '+userData.lname,
    role: 'Seller'
}

export const personal_info_default = {
    userid: '',
    role: ''
}

export const AppState = createContext({userData: personal_info_default})

const Context = ({ children }) => {
    const [userData, setUserData] = useState(personal_info_default);

    return (
            <AppState.Provider value={{userData, setUserData}}>
                {children}
            </AppState.Provider>
    )
}

export default Context