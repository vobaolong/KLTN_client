import defaultImage from '../../assets/default.png'
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
}) => (
  <div className='cus-avatar-wrap'>
    <div className={`cus-avatar-box ${size && 'cus-avatar-box--small'}`}>
      <div className='cus-avatar'>
        <img
          loading='lazy'
          src={avatar ? IMG + avatar : defaultImage}
          className='cus-avatar-img'
          style={{ borderRadius: `${noRadius && '5px'}` }}
          alt={alt}
        />
        {isEditable === 'user' && <UserAvatarUpload />}
        {isEditable === 'store' && <StoreAvatarUpload storeId={storeId} />}
        {isEditable === 'product' && (
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
        <h1
          className={`cus-avatar-name m-0 p-1 rounded-1 d-inline-block fs-5 ${
            borderName && 'bg-secondary box-shadow'
          }`}
        >
          {name}
        </h1>
        <small className='cus-shop-status'>{status}</small>
      </div>
    )}
  </div>
)

export default Avatar
