import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { followStore, unfollowStore } from '../../apis/follow'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import { useTranslation } from 'react-i18next'

const FollowStoreButton = ({
  storeId = '',
  isFollowing = false,
  className = '',
  onRun
}) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [followingFlag, setFollowingFlag] = useState(isFollowing)

  const { _id, accessToken } = getToken()

  useEffect(() => {
    setFollowingFlag(isFollowing)
  }, [isFollowing, storeId])

  const handleFollowStore = () => {
    setError('')
    setIsLoading(true)
    if (!followingFlag) {
      followStore(_id, accessToken, storeId)
        .then((data) => {
          if (data.error) {
            setError(data.error)
            setTimeout(() => {
              setError('')
            }, 3000)
          } else {
            setFollowingFlag(true)
            if (onRun) {
              data.store.isFollowing = true
              onRun(data.store)
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
      unfollowStore(_id, accessToken, storeId)
        .then((data) => {
          if (data.error) {
            setError(data.error)
            setTimeout(() => {
              setError('')
            }, 3000)
          } else {
            setFollowingFlag(false)
            if (onRun) {
              data.store.isFollowing = false
              onRun(data.store)
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
    <button
      type='button'
      className={`btn rounded-1 ${
        followingFlag ? 'btn-pink' : 'btn-outline-pink'
      } ripple ${className}`}
      onClick={handleFollowStore}
    >
      {isLoading && <Loading size='small' />}
      {error ? (
        <Error msg={error} />
      ) : followingFlag ? (
        <span>
          <i class='fa-solid fa-check'></i>
          <span className='ms-2 res-hide-md'>{t('storeDetail.following')}</span>
        </span>
      ) : (
        <span>
          <i class='fa-solid fa-plus'></i>
          <span className='ms-2 res-hide-md'>{t('storeDetail.follow')}</span>
        </span>
      )}
    </button>
  )
}
export default FollowStoreButton
