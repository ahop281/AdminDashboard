import clsx from 'clsx'
import React from 'react'
import './logo.scss'

const Logo = (props) => {
  return (
    <div className='logo'>
      <div className='logo__container'>
        <div className={clsx('logo__circle', props.large && 'large')}></div>
      </div>
    </div>
  )
}

export default Logo