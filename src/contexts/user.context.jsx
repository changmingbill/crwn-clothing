import { createContext, useState, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
//as the actual value you want to access
import { createAction } from "../utils/reducer/reducer.utils";
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandle type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    
    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
    }
    
    const value = {currentUser, setCurrentUser};

    useEffect(()=>{//listener would trigger whenever user state changed
        const unsubscribe = onAuthStateChangedListener((user) => {
         if(user) {
            createUserDocumentFromAuth(user);
         }
         setCurrentUser(user);
        });
        return unsubscribe
    }, []);//[] empty means that render once

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}