import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { publicAxios as axios } from '../api'
import Form from '../components/form/Form'
import { RadioInput } from '../components/input-item/InputItem'
import { toast } from 'react-toastify'

import "react-toastify/dist/ReactToastify.css"

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
    fullname: yup
        .string()
        .required("Please fill this field!"),
    email: yup
        .string()
        .email()
        .required("Please fill this field!"),
    phonenumber: yup
        .string()
        .max(12, 'Phone number has more than 12 digits')
        .matches(phoneRegExp, 'Phone number is not valid'),
    username: yup
        .string()
        .required("Please fill this field!")
        .min(6, "Username length should be at least 6 characters!"),
    password: yup
        .string()
        .required("Please fill this field!")
        .min(8, "Password length should be at least 8 characters!"),
    cpassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Password does not match!'),
})

const SignUp = () => {
    const [isFetching, setFetching] = useState(false)
    const [fetchingError, setFetchingError] = useState(null)
    const navigate = useNavigate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            gender: 'male'
        }
    })

    const inputListProps = useMemo(() => [
        {
            label: 'Username',
            name: "username",
            options: {
                placeholder: "Username",
                type: 'text',
            }
        },
        {
            label: 'Password',
            name: "password",
            options: {
                type: 'password',
            }
        },
        {
            label: 'Confirm password',
            name: "cpassword",
            options: {
                type: 'password',
            }
        },
        {
            label: 'Full name',
            name: "fullname",
            options: {
                placeholder: "Full name",
                type: 'text',
            }
        },
        {
            label: 'Email',
            name: "email",
            options: {
                placeholder: "Email",
                type: 'email',
            }
        },
        {
            label: 'Phone number',
            name: "phonenumber",
            options: {
                placeholder: "Phone number",
                type: 'text',
            }
        },
    ], [])

    const onSubmit = (data) => {
        setFetching(true)
        axios.post(
            'auth/signup',
            data
        )
            .then(response => {
                setFetching(false)
                toast.success('Sign up successfully!\nDirecting to sign in page', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setTimeout(() => {
                    navigate('../signin')
                }, 2000);
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
                });
            })
    }

    useEffect(() => {
        setFetchingError(null)
    }, [watch('username'), watch('password')])

    return (
        <Form
            type='signup'
            rType='signin'
            text='Sign up'
            rText='Sign in'
            register={register}
            submit={handleSubmit(onSubmit)}
            isFetching={isFetching}
            fetchingError={fetchingError}
            errors={errors}
            inputList={inputListProps}
        >
            <RadioInput label='Gender' name="gender" values={['male', 'female', 'others']} register={register} />
        </Form>
    )
}

export default SignUp