import React from 'react'

const Header: React.FC = (): JSX.Element => {

    const handleLogout = () => {
        console.log('Handle Logout here');

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
