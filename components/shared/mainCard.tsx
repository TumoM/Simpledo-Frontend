import React from 'react'
import Image from 'next/image'

const MainCard = ({ children }: any) => {
    return (
        <main className='mainContainer rounded-lg shadow-md max-w-xs min-h-sm'>
            <Image src="/imgs/group.svg"
                alt="Logo"
                width={40}
                height={32}
                className="Group"
            />
            {children}
        </main>
    )
}

export default MainCard