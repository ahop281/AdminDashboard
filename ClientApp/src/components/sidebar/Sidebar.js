import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import sidebarNav from '../../config/sidebarNav'
import AuthService from '../../services/AuthService'
import Logo from '../logo/Logo'
import './sidebar.scss'

const Sidebar = (props) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1]
        const activeItem = sidebarNav.findIndex(item => item.section === curPath)

        setActiveIndex(curPath.length === 0 ? 0 : activeItem)
    }, [location])

    const closeSidebar = () => {
        document.querySelector('.main__content').style.transform = 'scale(1) translateX(0)'
        setTimeout(() => {
            document.body.classList.remove('sidebar-open')
            document.querySelector('.main__content').style = ''
        }, 500);
    }

    const handleLogout = () => {
        props.onLogout()
        AuthService.deleteToken()
        navigate('../auth/signin')
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <Logo />
                <div className="sidebar-close" onClick={closeSidebar}>
                    <i className='bx bx-x'></i>
                </div>
            </div>
            <div className="sidebar__menu">
                {
                    sidebarNav.map((nav, index) => (
                        <Link to={nav.link} key={`nav-${index}`} className={`sidebar__menu__item ${activeIndex === index && 'active'}`} onClick={closeSidebar}>
                            <div className="sidebar__menu__item__icon">
                                {nav.icon}
                            </div>
                            <div className="sidebar__menu__item__txt">
                                {nav.text}
                            </div>
                        </Link>
                    ))
                }
                <div className="sidebar__menu__item">
                    <div className="sidebar__menu__item__icon">
                        <i className='bx bx-log-out'></i>
                    </div>
                    <div className="sidebar__menu__item__txt" onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar