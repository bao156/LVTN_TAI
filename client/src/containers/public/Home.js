import React, { useEffect, useRef } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer, Navigation, Search } from './index'
import { Intro, Contact } from '../../components'
import { useSelector } from 'react-redux'
import { path } from '../../ultils/constant'


const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const location = useLocation()



    return (
        <div className='w-full flex gap-5 flex-col items-center h-full'>
            <Header />

            <Navigation />
            {isLoggedIn && location.pathname !== `/${path.CONTACT}` && !location.pathname?.includes(path.DETAIL) && <Search />}
            <div className='w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3'>
                <Outlet />
            </div>
            <Intro />
            <Contact />
            <Footer />

        </div>
    )
}

export default Home