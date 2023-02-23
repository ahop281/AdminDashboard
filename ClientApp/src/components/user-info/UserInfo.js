import React from 'react'
import './user-info.scss'
import images from '../../constants/images'

const UserInfo = ({ user }) => {
    return (
        <div className='user-info'>
            <div className="user-info__img">
                <img src={images.avt} alt="" />
            </div>
            <div className="user-info__name">
                <span>{user.fullName}</span>
            </div>
        </div>
    )
}

export default UserInfo
