
/**
 * The intial props passed to the app context provider
 */
export interface IContextProps {
    /**
     * The User's information
     */
    user?: IUser;
    /**
     * Sets the current User in context
     */
    setUser?: Function;
    /**
     * Array of current Todo items
     */
    todos?: ITodo[];
    /**
     * Sets the current Todo's in context
     */
    setTodos?: Function;
}
/**
 * A representation of a User's account
 */
export interface IUser {
    /**
     * The User's unique ID
     */
    id: number;
    /**
     * The User's full name
     */
    name: string;
    /**
     * The User's email
     */
    email: string;
}

/**
 * Represents a Todo item
 */
export interface ITodo {
    /**
     * The unique ID of a Todo
     */
    id: number
    /**
     * The ID of a User this Todo belongs to (should be the same for all todo's)
     */
    userId: number
    /**
     * The Todo's title
     */
    title: string;
    /**
     * The Todo's title
     */
    status: ['complete', 'incomplete'];
    /**
     * The Todo's title
     */
    createdAt: Date;
    /**
     * The Todo's title
     */
    updatedAt: Date;
}
