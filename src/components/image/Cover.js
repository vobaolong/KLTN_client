import UserCoverUpload from './uploadButton/UserCoverUpload'
import StoreCoverUpload from './uploadButton/StoreCoverUpload'

const IMG = process.env.REACT_APP_STATIC_URL

const Cover = ({
  storeId = '',
  cover = '',
  alt = 'cover',
  isEditable = false
}) => (
  <div className='cus-cover-wrap'>
    <div className='cus-cover'>
      <img
        src={`${IMG + cover}`}
        className='cus-cover-img rounded-1 opacity-50'
        alt={alt}
      />
      {isEditable === 'user' && <UserCoverUpload />}
      {isEditable === 'store' && <StoreCoverUpload storeId={storeId} />}
    </div>
  </div>
)

export default Cover
