import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { publicAxios as axios } from '../api'
import Form from '../components/form/Form'
import { CheckboxInput } from '../components/input-item/InputItem'
import { toast } from 'react-toastify'
import AuthService from '../services/AuthService'

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Please fill this field!")
        .min(6, "Username length should be at least 6 characters!"),
    password: yup
        .string()
        .required("Please fill this field!")
        .min(8, "Password length should be at least 8 characters!"),
    rpassword: yup.bool()
})

const SignIn = (props) => {
    const [user] = useState(() => AuthService.getUser() ?? { rpassword: false })
    const [isFetching, setFetching] = useState(false)
    const [fetchingError, setFetchingError] = useState(null)
    const navigate = useNavigate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            rpassword: user.rpassword,
        }
    })

    const inputListProps = useMemo(() => [
        {
            label: 'Username',
            name: "username",
            options: {
                placeholder: "Username",
                type: 'text',
                autoComplete: user.rpassword ? 'on' : 'new-password'
            }
        },
        {
            label: 'Password',
            name: "password",
            options: {
                type: 'password',
                autoComplete: user.rpassword ? 'on' : 'new-password'
            }
        },
    ], [])

    const onSubmit = (data) => {
        setFetching(true)
        axios.post(
            'auth/signin',
            data
        )
            .then(response => {
                setFetching(false)
                AuthService.setUser({
                    username: response.data.username,
                    fullName: response.data.fullName,
                    rpassword: watch('rpassword')
                })
                AuthService.setToken({
                    token: response.data.accessToken,
                    expires: response.data.expires
                })
                props.onSignin()
                navigate('../../')
            })
            .catch(error => {
                setFetching(false)
                setFetchingError(error.response.data)
                toast.error(error.response.data, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            })
    }

    useEffect(() => {
        setFetchingError(null)
    }, [watch('username')])

    return (
        <Form
            type='signin'
            rType='signup'
            text='Sign in'
            rText='Sign up'
            register={register}
            submit={handleSubmit(onSubmit)}
            isFetching={isFetching}
            fetchingError={fetchingError}
            errors={errors}
            inputList={inputListProps}
        >
            <div className='form__item'>
                <CheckboxInput register={register} name="rpassword" label="Remember password" />
                <Link to="/auth/forgotpassword">
                    <span className='form__item__right hover-underline'>Forgot password</span>
                </Link>

            </div>
        </Form>
    )
}

export default SignIn