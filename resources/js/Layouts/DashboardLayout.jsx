import React, { useState, useContext, useEffect } from 'react';
import Sidenav from '@/Components/Sidenav';
import Navbar from '@/Components/Navbar';

const DashboardLayout = ({children}) => {

    const [active, setActive] = useState(1)

    const handleOnActive = () => {
        active === 1 ? setActive(0) : setActive(1)
    }

    return (
        <>
        <div className="absolute w-full bg-gradient-to-b from-orange-600 to-orange-500  dark:hidden min-h-25"></div>
        <Sidenav active={active} onChangeAct={handleOnActive}  />
        <main className='relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-60 rounded-x'>
            <Navbar onChangeAct={handleOnActive}/>
            <div className="w-full pr-6 py-6 mx-auto">
                {children}
            </div>
        </main>
        </>

    )
}

export default DashboardLayout
