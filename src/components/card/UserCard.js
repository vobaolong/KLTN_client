/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getUserLevel } from '../../apis/level'
import { Link } from 'react-router-dom'
import UserRoleLabel from '../label/UserRoleLabel'
import UserLevelLabel from '../label/UserLevelLabel'

const IMG = process.env.REACT_APP_STATIC_URL

const UserCard = ({ user = {} }) => {
  const [userValue, setUserValue] = useState({})

  const init = async () => {
    let newUser = user
    try {
      const data = await getUserLevel(user._id)
      newUser.level = data.level
    } catch {}
    setUserValue(newUser)
  }

  useEffect(() => {
    init()
  }, [user])

  return (
    <div className='card shadow border-0'>
      <Link
        className='text-reset text-decoration-none'
        title={userValue.firstName + ' ' + userValue.lastName}
        to={`/user/${userValue._id}`}
      >
        <div className='card-img-top cus-card-img-top'>
          <img
            loading='lazy'
            src={IMG + userValue.avatar}
            className='cus-card-img'
            alt={userValue.firstName + ' ' + userValue.lastName}
          />
        </div>
      </Link>

      <div className='card-body border-top border-secondary'>
        <small className='card-subtitle'>
          <div className='d-flex align-items-center'>
            <span className='me-1'>
              <UserRoleLabel role={userValue.role} detail={false} />
            </span>

            <span className=''>
              <UserLevelLabel level={userValue.level} detail={false} />
            </span>
          </div>
        </small>

        <Link
          className='text-reset text-decoration-none link-hover d-block mt-2'
          title={userValue.firstName + ' ' + userValue.lastName}
          to={`/user/${userValue._id}`}
        >
          <h6
            className='card-title'
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {userValue.firstName + ' ' + userValue.lastName}
          </h6>
        </Link>
      </div>
    </div>
  )
}

export default UserCard
