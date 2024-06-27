import React, { useState } from 'react'
import defaultImage from '../../assets/default.webp'
import ProductUpload from './uploadButton/ProductUpload'
import UserAvatarUpload from './uploadButton/UserAvatarUpload'
import StoreAvatarUpload from './uploadButton/StoreAvatarUpload'
const IMG = process.env.REACT_APP_STATIC_URL

const Avatar = ({
  storeId = '',
  productId = '',
  productIndex = '',
  avatar = '',
  name = '',
  alt = 'avatar',
  borderName = false,
  isEditable = false,
  size = '',
  noRadius = false,
  onRun,
  hide = false,
  status = ''
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className='cus-avatar-wrap'>
      <div className={`cus-avatar-box ${size && 'cus-avatar-box--small'}`}>
        <div
          className='cus-avatar'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            loading='lazy'
            src={avatar ? IMG + avatar : defaultImage}
            className='cus-avatar-img'
            style={{ borderRadius: `${noRadius && '5px'}` }}
            alt={alt}
          />

          {isHovered && isEditable === 'user' && <UserAvatarUpload />}
          {isHovered && isEditable === 'store' && (
            <StoreAvatarUpload storeId={storeId} />
          )}
          {isHovered && isEditable === 'product' && (
            <ProductUpload
              productId={productId}
              index={productIndex}
              storeId={storeId}
              onRun={onRun}
            />
          )}
        </div>
      </div>
      {(size !== 'small' || !hide) && (
        <div className='d-flex'>
          <h6
            className={`cus-avatar-name m-0 p-1 rounded-1 d-inline-block ${
              borderName && 'bg-value box-shadow'
            }`}
          >
            {name}
          </h6>
          <small className='cus-shop-status'>{status}</small>
        </div>
      )}
    </div>
  )
}

export default Avatar
