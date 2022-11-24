import { createContext, useState } from 'react';
import { IContextProps, ITodo, IUser } from '../interfaces';


const initialState: IContextProps = {
    user: undefined,
    todos: [],
};

export const AppContext = createContext<IContextProps>(initialState);

export const AppProvider = ({ children }: any): JSX.Element => {
    const [state, setState] = useState(initialState);

    /**
     * Sets the current logged in User.
     * @param value An object representing a User
     */
    const setUser: Function = (user: IUser) => {
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
        console.log('Setting todos to:', todos);

        setState((prevValues) => ({
            ...prevValues,
            todos
        }));
    };

    // setState(prev => {
    //     return {
    //         ...prev,
    //         setUser,
    //         setTodos
    //     }
    // })

    return (
        <AppContext.Provider
            value={{
                user: state.user as IUser,
                setUser: setUser,
                todos: state.todos as ITodo[],
                setTodos: setTodos,
                state
            }}>
            {children}
        </AppContext.Provider>
    );
};
