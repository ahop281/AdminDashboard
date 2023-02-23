import clsx from 'clsx'
import React from 'react'
import './box.scss'

const Box = (props) => {
    return (
        <div className={clsx('box', props.purple && 'box-purple', props.fullheight && 'box-fullheight', props.className)}>
            {props.children}
        </div>
    )
}

export default Box