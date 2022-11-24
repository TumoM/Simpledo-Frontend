import React from 'react'
import { ITodo } from '../../interfaces'
import TodoItem from './todoItem'

interface ITodosWrapperProps {
    todos: ITodo[],
}

const TodosWrapper: React.FC<ITodosWrapperProps> = ({ todos }) => {
    return (
        <div className='mt-5'>
            {todos?.map((todo) => (
                <TodoItem todo={todo} key={todo.id} />
            ))}
        </div>
    )
}

export default TodosWrapper