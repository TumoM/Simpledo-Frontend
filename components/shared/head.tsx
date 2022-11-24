import React from 'react'
import NextHead from 'next/head'
import Image from 'next/image'

interface IHeadProps {
    title: string,
    description: string
}

const Head: React.FC<IHeadProps> = ({ title, description }: IHeadProps): JSX.Element => {
    return (
        <NextHead>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/imgs/group.svg" />
        </NextHead>
    )
}

export default Head