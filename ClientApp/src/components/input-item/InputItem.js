import React, { useId } from 'react'
import Spinner from '../spinner/Spinner'
import './input-item.scss'

const InputItem = (props) => {
    return (
        <div className='input-item'>
            <label>
                <p className='input-item__title'>{props.label}</p>
                <input className='input-item__field' {...props.register(props.name)} {...props.options} />
                {props.error && <p className='input-item__error txt-danger'>{props.error}</p>}

            </label>
        </div>
    )
}

export default InputItem

export const RadioInput = (props) => {
    return (
        <div className='radio-input'>
            <p className='input-item__title'>{props.label}</p>
            <div className='form__item'>
                {
                    props.values.map(item => (
                        <label key={`radio-item-${item}`}>
                            <input type='radio' {...props.register(props.name)} value={item} />
                            <span className='radio-input__label'>{item}</span>
                        </label>
                    ))
                }
            </div>

        </div>
    )
}

export const SubmitInput = (props) => {
    return (
        <button className='submit-input' type="submit" disabled={props.isFetching}>
            {
                props.isFetching ? <Spinner scale={0.11} color="white" /> : props.text
            }
        </button>
    )
}

export const CheckboxInput = (props) => {
    const id = useId()

    return (
        <label className='checkbox-input' htmlFor={id}>
            <input id={id} className='checkbox-input__box' {...props.register(props.name)} type="checkbox" value={props.value} />
            <span className='checkbox-input__label'>{props.label}</span>
        </label>
    )
}