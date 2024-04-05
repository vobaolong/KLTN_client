import { useState, useEffect } from 'react'
import Error from '../ui/Error'
import Loading from '../ui/Loading'
import { getToken } from '../../apis/auth'
import { followProduct, unfollowProduct } from '../../apis/follow'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const FollowProductButton = ({
  productId = '',
  isFollowing = false,
  className = '',
  style = {},
  onRun
}) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [followingFlag, setFollowingFlag] = useState(isFollowing)
  const { _id, accessToken } = getToken()

  useEffect(() => {
    setFollowingFlag(isFollowing)
  }, [isFollowing, productId])

  const handleFollowProduct = () => {
    setIsLoading(true)
    if (!followingFlag) {
      followProduct(_id, accessToken, productId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error)
          } else {
            setFollowingFlag(true)
            if (onRun) {
              data.product.isFollowing = true
              onRun(data.product)
              toast.success(t('toastSuccess.followProduct.follow'))
            }
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Something went wrong')
          setIsLoading(false)
        })
    } else {
      unfollowProduct(_id, accessToken, productId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error)
          } else {
            setFollowingFlag(false)
            if (onRun) {
              data.product.isFollowing = false
              onRun(data.product)
              toast.success(t('toastSuccess.followProduct.unfollow'))
            }
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Something went wrong')
          setIsLoading(false)
        })
    }
  }

  return (
    <div className='d-grid' style={style}>
      <span
        className={`d-flex align-items-center rounded-circle justify-content-center ${
          followingFlag ? 'text-danger' : 'text-secondary'
        } ${className}`}
        onClick={handleFollowProduct}
      >
        {isLoading && <Loading size='small' />}
        {error ? (
          <Error msg={error} />
        ) : (
          <i
            style={{ fontSize: '17px' }}
            className={`pointer fa-heart p-2 rounded-circle shadow ${
              followingFlag
                ? 'bg-danger text-white fa-solid'
                : 'bg-white fa-regular'
            }`}
          ></i>
        )}
      </span>
    </div>
  )
}
export default FollowProductButton
