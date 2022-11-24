import { useContext, useState } from 'react'
import { Loader } from '@mantine/core';
import { AppContext } from '../context/app.context';
import Login from '../components/login/login';
import Register from '../components/register/register';

const User: React.FC = (): JSX.Element => {
    const { loginOrRegister } = useContext(AppContext);

    return (
        <div >
            <main>
                {loginOrRegister == 0 && <Login />}
                {loginOrRegister == 1 && <Register />}
            </main>
        </div>
    )
}

export default User
