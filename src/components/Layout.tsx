import React from 'react'
import { Menu } from './Menu'
import { Header } from './Header'

const Layout = ({ children }:{
    children?: React.ReactNode;
}) => {
    return (
        <>
            <div className='flex flex-auto'>
                < Menu/>
                <div className='grow'>
                    <Header />
                    <div className='m-5'>{children}</div>
                </div>
            </div>
        </>
    )
}

export default Layout