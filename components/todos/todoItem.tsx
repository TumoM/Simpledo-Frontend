import { Grid } from '@mantine/core'
import Image from 'next/image'
import React, { useState } from 'react'
import axios from 'axios';
import { useSWRConfig } from 'swr';
import { Loader } from '@mantine/core';


import { ITodo } from '../../interfaces'

interface ITodoItemProps {
    todo: ITodo,
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo }: ITodoItemProps) => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const { mutate } = useSWRConfig();
    const [loading, setLoading] = useState<boolean>(false)


    const handleComplete = (id: number, userId: number) => {
        setLoading(true)
        axios.patch(`${url}todo/completed/${id}`, { userId })
            .then(async (res) => {
                if (res.status == 200) {
                    await mutate(`todo/listTodos/${userId}`)
                }
                else {
                    console.log('Error updating status to complete');
                }
            })
            .catch((err: Error) => {
                console.log('API completed patch error', err);
            })
            .finally(() => {
                setLoading(false);
            })
    }
    const handleIncomplete = (id: number, userId: number) => {
        setLoading(true)
        axios.patch(`${url}todo/uncompleted/${id}`, { userId })
            .then(async (res) => {
                if (res.status == 200) {
                    await mutate(`todo/listTodos/${userId}`)
                }
                else {
                    console.log('Error updating status to incomplete');
                }
            })
            .catch((err: Error) => {
                console.log('API uncompleted patch error', err);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleDelete = (id: number, userId: number) => {
        setLoading(true)
        axios.delete(`${url}todo/${id}`)
            .then(async (res) => {
                if (res.status == 200) {
                    console.log('Deleted todo')
                    await mutate(`todo/listTodos/${userId}`)
                }
                else {
                    console.log('Error deleting todo');
                }
            })
            .catch((err: Error) => {
                console.log('API incompleted patch error', err);
            })
            .finally(() => {
                setLoading(false);
            })
    }
    return (
        <Grid>
            <Grid.Col span={1} className='cursor-pointer'>
                {loading ? <Loader color="cyan" size="xs" variant="bars" /> :
                    (todo.status == 'incomplete'
                        ? <div className="Rectangle" onClick={() => {
                            !loading && handleComplete(todo.id, todo.userId)
                        }
                        } />
                        : <div className="Rectangle-Copy" onClick={() => {
                            !loading && handleIncomplete(todo.id, todo.userId)
                        }
                        }>
                            <Image
                                src="/imgs/check.svg"
                                alt='Todo Checked'
                                width={12}
                                height={9}
                            />
                        </div>)
                }
            </Grid.Col>
            <Grid.Col span={10} className='Text-Style-3'>
                {todo.title}
            </Grid.Col>
            <Grid.Col span={1} className='mt-1 cursor-pointer'>
                {loading
                    ? <Loader color="cyan" size="xs" variant="bars" />
                    : <Image
                        alt="Delete"
                        src="/imgs/path-copy.svg"
                        width={11}
                        height={11}
                        onClick={() => {
                            !loading && handleDelete(todo.id, todo.userId)
                        }
                        }
                    />
                }
            </Grid.Col>
        </Grid>
    )
}

export default TodoItem