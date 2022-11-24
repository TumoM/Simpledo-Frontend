import Head from '../components/shared/head'
import Header from '../components/shared/header'
import MainCard from '../components/shared/mainCard'
import { TextInput } from '@mantine/core';
import { FormEventHandler, useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/app.context';
import { useSWRGet } from '../utils/fetcher';
import { FilterOptions, ITodo } from '../interfaces';
import TodosWrapper from '../components/todos/todosWrapper';


const Home: React.FC = (): JSX.Element => {
  const { user, todos, setTodos, state } = useContext(AppContext);

  const {
    data: fetchedTodos,
    isLoading: todosIsLoading = true,
    isError: todosIsError,
  } = useSWRGet(`todo/listTodos/`, 1 as unknown as string);

  // const {
  //   data: fetchedTodos,
  //   isLoading: todosIsLoading = true,
  //   isError: todosIsError,
  // } = useSWRGet(`todo/listTodos/:userId/`, user?.id ? user?.id as unknown as string : undefined);

  // State regarding Todo catagories
  const [completeTodos, setCompleteTodos] = useState<ITodo[]>([]);
  const [incompleteTodos, setIncompleteTodos] = useState<ITodo[]>([]);

  // State regarding the submission of a Todo/Title
  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<string>("")
  const [titleLoading, setTitleLoading] = useState<boolean>(false)

  // Misc state variables
  const [filterSelection, setFilterSelection] = useState<string>('All');

  /**
   * Update todo arrays when the data is fetched.
   */
  useEffect(() => {
    setTodos && setTodos(fetchedTodos?.data || []);
    console.log('fetchedTodos2:', todos)
    const complete: ITodo[] = [];
    const incomplete: ITodo[] = [];
    fetchedTodos?.data?.map((todo: ITodo) => {
      if (todo.status == 'complete') {
        complete.push(todo)
      }
      else if (todo.status == 'incomplete') {
        incomplete.push(todo)
      }
    })
    setCompleteTodos(complete);
    setIncompleteTodos(incomplete);

    return () => {
      setCompleteTodos([]);
      setIncompleteTodos([]);
    }
  }, [fetchedTodos])


  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setTitleLoading(true);
    console.log('Title:', title);
    if (title.length <= 0) {
      return setTitleError('Please check the length of you todo')
    }
    else {
      console.log('Valid title')
      return setTitleError('');

    }
    console.log('Done.')
  }

  return (
    <>
      <Head title='Todo Section' description='Todo list section' />
      <Header />
      <MainCard>
        <span className="Todo-Title Text-Style">
          Todo List
        </span>
        <div className='mt-4'>
          <form onSubmit={submitHandler}>
            <TextInput
              placeholder="Add a new todo"
              label=""
              className='Add-a-new-todo'
              error={titleError}
              value={title}
              onChange={(event) => { setTitle(event.currentTarget.value) }}
            />
          </form>

        </div>
        <div className="Line-Copy"></div>
        <div className='mt-5 flex flex-gap-3 w-80'>
          <p className='Show'>Show:</p>
          <span className={`Show flex-auto ${filterSelection == 'All' ? 'active' : 'inactive'}`} onClick={() => setFilterSelection('All')}>All</span>
          <span className={`Show flex-auto ${filterSelection == 'Completed' ? 'active' : 'inactive'}`} onClick={() => setFilterSelection('Completed')}>Completed</span>
          <span className={`Show flex-auto ${filterSelection == 'Uncompleted' ? 'active' : 'inactive'}`} onClick={() => setFilterSelection('Uncompleted')}>Uncompleted</span>
        </div>
        <TodosWrapper todos={filterSelection == 'All' ? todos as ITodo[] : (filterSelection == 'Completed' ? completeTodos as ITodo[] : incompleteTodos as ITodo[])} />
      </MainCard>
    </>
  )
}

export default Home
