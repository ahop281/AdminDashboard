import React from 'react'
import './main-layout.scss'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import TopNav from '../components/topnav/TopNav'
import { ToastContainer } from 'react-toastify'

const MainLayout = (props) => {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Sidebar {...props} />
            <div className="main">
                <div className="main__content">
                    <TopNav />
                    <Outlet context={{...props}} />
                </div>
            </div>
        </>
    )
}

export default MainLayout
