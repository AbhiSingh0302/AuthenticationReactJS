import { createContext, useState } from "react";

const Context = createContext({
    isLoggedIn: "",
    token: "",
    login: (token) => {},
    logout: () => {}
})

const ContextProvider = props => {
    const [token, setToken] = useState(null);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
    }

    const logoutHandler = () => {
        setToken(null);
    }

    const context = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <Context.Provider value={context}>
        {props.children}
    </Context.Provider>
}

export {Context, ContextProvider};