import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { resInterceptor } from './api'
import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import AuthLayout from './layout/AuthLayout'
import MainLayout from './layout/MainLayout'
import Blank from './pages/Blank'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Suppliers from './pages/Suppliers'
import './scss/App.scss'
import AuthService from './services/AuthService'
import NotFound from './pages/NotFound'

const App = () => {
	const [isLogged, setLogged] = useState(() => AuthService.getToken() !== null)

	const onSignin = () => setLogged(true)
	const onLogout = () => setLogged(false)


	useEffect(() => {
		resInterceptor(onLogout)
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={isLogged ? <MainLayout onLogout={onLogout} /> : <Navigate to='/auth/signin' />}>
					<Route index element={<Dashboard />} />
					<Route path='/orders' element={<Orders />} />
					<Route path='/products' element={<Products />} />
					<Route path='/suppliers' element={<Suppliers />} />
					<Route path='/customers' element={<Customers />} />
					<Route path='/settings' element={<Blank />} />
					<Route path='/stats' element={<Blank />} />
					<Route path='*' element={<NotFound />} />
				</Route>
				<Route path='/auth' element={isLogged ? <Navigate to='/' /> : <AuthLayout />}>
					<Route path='/auth/signin' element={<SignIn onSignin={onSignin} />} />
					<Route path='/auth/signup' element={<SignUp />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App