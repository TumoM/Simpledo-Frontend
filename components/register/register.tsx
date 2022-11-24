import { Loader, TextInput } from '@mantine/core';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/app.context';
import Head from '../shared/head';
import MainCard from '../shared/mainCard';
import { useRouter } from 'next/router'

const Register: React.FC = (): JSX.Element => {
    const { setLoginOrRegistration, setUser } = useContext(AppContext);
    const router = useRouter()


    const [fullName, setFullName] = useState<string>('');
    const [fullNameError, setFullNameError] = useState<string>('');

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);

    const submitHandler = () => {
        setLoading(true);
        if (fullName.length <= 0) {
            setFullNameError('Please check your full name')
        }
        else {
            setFullNameError('');
        }
        // Normally this email would be validated
        if (email.length <= 0) {
            setEmailError('Please check your email')
        }
        else {
            setEmailError('');
        }
        if (password.length <= 0) {
            setPasswordError('Please check your password')
        }
        else {
            setPasswordError('');
        }
        if (fullNameError.length > 0 || emailError.length > 0 || passwordError.length > 0) setLoading(false);
        else {
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/register`, { name: fullName, email, password })
                .then(async (res) => {
                    if (res.status == 200) {
                        let data = res.data.data;
                        setUser && setUser({ id: data.id, name: data.name, email: data.email })
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
            <Head title='Register' description='Registration section' />
            <MainCard>
                <div className="Welcome-back">
                    Welcome!
                </div>
                <div className="Sign-up-to-start-using Text-Style-4">
                    Sign up to start using Simpledo today.
                </div>
                <form onSubmit={() => console.log('submit')}>
                    <TextInput
                        placeholder="Full Name"
                        label=""
                        className={`Add-a-new-todo`}
                        error={fullNameError}
                        value={fullName}
                        onChange={(event) => { setFullName(event.currentTarget.value) }}
                    />
                    <br />
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
                <span className="Dont-have-an-account mt-5" onClick={() => setLoginOrRegistration && setLoginOrRegistration(0)}>
                    Do have an account? Sign in.
                </span>
                <div className="Rectangle-Login text-center" onClick={submitHandler}>
                    {loading && <Loader className='mx-auto' color="dark" size="sm" variant="bars" />}
                    {!loading && <span className="Log-In Text-Style-2">
                        Sign Up
                    </span>}
                </div>

            </MainCard>
        </>
    )
}

export default Register