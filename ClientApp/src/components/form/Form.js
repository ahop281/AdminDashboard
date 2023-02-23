import React from 'react'
import { Link } from 'react-router-dom'
import FormHeader from '../form-header/FormHeader'
import InputItem, { SubmitInput } from '../input-item/InputItem'
import './form.scss'

const Form = (props) => {
    return (
        <div className='form'>
            <div className='form__container'>
                <FormHeader />
                <form onSubmit={props.submit}>
                    {
                        props.inputList.map((item, index) => (
                            <div key={`form-item-${props.type}-${index}`}>
                                <InputItem {...item} register={props.register} error={props.errors[item.name]?.message} />
                            </div>
                        ))
                    }

                    {props.children}

                    {props.fetchingError && <p className='input-item__error txt-danger'>{props.fetchingError}</p>}
                    <SubmitInput isFetching={props.isFetching} text={props.text} />
                </form>

                <div className='form__bottom'>
                    <span>{props.type === 'signin' ? "Don't have account yet?" : "Already have an account?"}</span>
                    <Link to={`/auth/${props.rType}`}>
                        <span className='form__bottom__text hover-underline'>{props.rText}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Form