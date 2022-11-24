import React, { useContext } from 'react'
import { AppContext } from '../../context/app.context';
import { useRouter } from 'next/router'

const Header: React.FC = (): JSX.Element => {
    const { setUser } = useContext(AppContext);
    const router = useRouter()

    const handleLogout = () => {
        setUser && setUser(undefined)
        router.push('/user');
    }

    return (
        <header>
            {/* <!-- Navbar --> */}
            <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-end w-full justify-end">
                <div className="px-6 w-full flex flex-wrap items-end justify-end">
                    <button onClick={handleLogout} className='text-sm'>Logout</button>
                </div>
            </nav>
            {/* <!-- Navbar --> */}

        </header>
    )
}

export default Header
