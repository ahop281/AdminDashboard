import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Logo from '../components/logo/Logo'
import './auth-layout.scss'

const AuthLayout = () => {
  return (
    <div className='auth-wrapper'>
      <div className='row w-full'>
        <div className='col-6 col-md-8 col-sm-12 bg-white m-auto'>
          <div className='col-10 m-auto mb'>
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
            <Outlet />
          </div>
        </div>
        <div className='col-6 hide-md'>
          <div className='right-fixed'>
            <Logo large={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout