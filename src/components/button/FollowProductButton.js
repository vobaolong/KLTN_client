import { useState, useEffect } from 'react'
import Error from '../ui/Error'
import Loading from '../ui/Loading'
import { getToken } from '../../apis/auth'
import { followProduct, unfollowProduct } from '../../apis/follow'
import { toast } from 'react-toastify'

const FollowProductButton = ({
  productId = '',
  isFollowing = false,
  className = '',
  style = {},
  onRun
}) => {
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
              toast.success(data.success)
            }
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
          setTimeout(() => {
            setError('')
          }, 3000)
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
              toast.success(data.success)
            }
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
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
