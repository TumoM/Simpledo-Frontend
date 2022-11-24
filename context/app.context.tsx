import { createContext, useState } from 'react';
import { IContextProps, ITodo, IUser } from '../interfaces';


const initialState: IContextProps = {
    user: undefined,
    todos: [],
    loginOrRegister: 0
};

export const AppContext = createContext<IContextProps>(initialState);

export const AppProvider = ({ children }: any): JSX.Element => {
    const [state, setState] = useState(initialState);

    /**
     * Sets the current logged in User.
     * @param value An object representing a User
     */
    const setUser: Function = (user: IUser) => {
        console.log('Setting a new user:', user)
        if (user == undefined) {
            localStorage.removeItem('user');
        }
        else {
            localStorage.setItem('user', JSON.stringify(user))
        }
        setState((prevValues) => ({
            ...prevValues,
            user
        }));
    };

    /**
     * Sets the current Todo list.
     * @param value An array representing Todos
     */
    const setTodos: Function = (todos: ITodo[]) => {
        setState((prevValues) => ({
            ...prevValues,
            todos
        }));
    };

    /**
     * Sets the current user flow (login or register).
     * @param value number representing the type
     */
    const setLoginOrRegistration: Function = (loginOrRegister: number) => {
        setState((prevValues) => ({
            ...prevValues,
            loginOrRegister
        }));
    };

    return (
        <AppContext.Provider
            value={{
                user: state.user as IUser,
                setUser,
                todos: state.todos as ITodo[],
                setTodos,
                loginOrRegister: state.loginOrRegister,
                setLoginOrRegistration
            }}>
            {children}
        </AppContext.Provider>
    );
};
