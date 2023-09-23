import { createContext, useState } from "react";

const Context = createContext({
    isLoggedIn: "",
    token: "",
    login: (token) => {},
    logout: () => {}
})

const ContextProvider = props => {
    const initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem("token",token);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");
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