import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { followProduct, unfollowProduct } from '../../apis/follow'
import Loading from '../ui/Loading'
import Error from '../ui/Error'

const FollowProductButton = ({
  productId = '',
  isFollowing = false,
  className = '',
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
    setError('')
    setIsLoading(true)
    if (!followingFlag) {
      followProduct(_id, accessToken, productId)
        .then((data) => {
          if (data.error) {
            setError(data.error)
            setTimeout(() => {
              setError('')
            }, 3000)
          } else {
            setFollowingFlag(true)
            if (onRun) {
              data.product.isFollowing = true
              onRun(data.product)
            }
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Server Error')
          setIsLoading(false)
          setTimeout(() => {
            setError('')
          }, 3000)
        })
    } else {
      unfollowProduct(_id, accessToken, productId)
        .then((data) => {
          if (data.error) {
            setError(data.error)
            setTimeout(() => {
              setError('')
            }, 3000)
          } else {
            setFollowingFlag(false)
            if (onRun) {
              data.product.isFollowing = false
              onRun(data.product)
            }
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Server Error')
          setIsLoading(false)
          setTimeout(() => {
            setError('')
          }, 3000)
        })
    }
  }

  return (
    <div className='col-1 d-grid'>
      <span
        className={`d-flex align-items-center mt-3 justify-content-center ${
          followingFlag ? 'text-danger' : 'text-secondary'
        } ${className}`}
        onClick={handleFollowProduct}
      >
        {isLoading && <Loading size='large' />}
        {error ? (
          <Error msg={error} />
        ) : followingFlag ? (
          <i style={{ fontSize: '20px' }} className='pointer fas fa-heart'></i>
        ) : (
          <i style={{ fontSize: '20px' }} className='pointer far fa-heart'></i>
        )}
      </span>
    </div>
  )
}
export default FollowProductButton
