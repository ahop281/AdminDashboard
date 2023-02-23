import React from 'react'
import Logo from '../logo/Logo'
import './form-header.scss'

const FormHeader = () => {
    return (
        <div className='form-header'>
            <div className='hide show-md'>
                <Logo />
            </div>
            <h1 className='form-header__title'>Admin Dashboard</h1>
            <p className='form-header__subtitle'>Welcome! Please enter your details.</p>
        </div>
    )
}

export default FormHeader