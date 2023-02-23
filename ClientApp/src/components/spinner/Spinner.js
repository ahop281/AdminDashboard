import React from 'react'
import './spinner.scss'

const Spinner = (props) => {
    return (
        <svg className='spinner' style={{ width: `${props.scale * 200}px`, height: `${props.scale * 200}px` }} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio='xMidYMid'>
            <circle cx="50" cy="50" fill="none" stroke={props.color} strokeWidth={props.width ?? 6} r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
        </svg>
    )
}

export default Spinner