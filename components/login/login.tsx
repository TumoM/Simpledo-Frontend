import { Loader, TextInput } from '@mantine/core'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'

import { AppContext } from '../../context/app.context'
import Head from '../shared/head'
import MainCard from '../shared/mainCard'

const Login: React.FC = (): JSX.Element => {
    const { setLoginOrRegistration, setUser } = useContext(AppContext);
    const router = useRouter()

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);

    const submitHandler = () => {
        setLoading(true);
        console.log('Submit Click');
        // Normally this email would be validated
        if (email.length <= 0) {
            setEmailError('Please check your email')
        }
        else {
            console.log('Valid email')
            setEmailError('');
        }
        if (password.length <= 0) {
            setPasswordError('Please check your password')
        }
        else {
            console.log('Valid password')
            setPasswordError('');
        }
        if (emailError.length > 0 || passwordError.length > 0) setLoading(false);
        else {
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/login`, { email, password })
                .then(async (res) => {
                    if (res.status == 200) {
                        const user = res.data.data;
                        setUser && setUser({ id: user.id, name: user.name, email: user.email })
                        router.push('/');
                    }
                    else {
                        console.log('Error logging in');
                    }
                })
                .catch((err: Error) => {
                    console.log('API completed login error', err);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }
    return (
        <>
            <Head title='Login' description='Login section' />
            <MainCard>
                <div className="Welcome-back">
                    Welcome back!
                </div>
                <div className="Log-in-to-continue Text-Style-4">
                    Log in to continue.
                </div>
                <form onSubmit={() => console.log('submit')}>
                    <TextInput
                        placeholder="Email"
                        label=""
                        className={`Add-a-new-todo`}
                        error={emailError}
                        value={email}
                        onChange={(event) => { setEmail(event.currentTarget.value) }}
                    />
                    <br />
                    <TextInput
                        placeholder="Password"
                        label=""
                        type='password'
                        className='Add-a-new-todo mt-3'
                        error={passwordError}
                        value={password}
                        onChange={(event) => { setPassword(event.currentTarget.value) }}
                    />
                </form>
                <br />
                <br />
                <span className="Dont-have-an-account mt-5" onClick={() => setLoginOrRegistration && setLoginOrRegistration(1)}>
                    Don’t have an account? Sign up.
                </span>
                <div className="Rectangle-Login text-center" onClick={submitHandler}>
                    {loading && <Loader className='mx-auto' color="dark" size="sm" variant="bars" />}
                    {!loading && <span className="Log-In Text-Style-2">
                        Log In
                    </span>}
                </div>

            </MainCard>
        </>
    )
}

export default Login