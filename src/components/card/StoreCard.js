/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { getNumberOfFollowers, checkFollowingStore } from '../../apis/follow'
import { getStoreLevel } from '../../apis/level'
import StoreFollowLabel from '../label/StoreFollowLabel'
import StarRating from '../label/StarRating'
import FollowStoreButton from '../button/FollowStoreButton'
import Skeleton from 'react-loading-skeleton'

const IMG = process.env.REACT_APP_STATIC_URL

const StoreCard = ({ store = {}, onRun }) => {
  const [storeValue, setStoreValue] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const init = async () => {
    let newStore = store

    try {
      const data = await getStoreLevel(store._id)
      newStore.level = data.level
    } catch {}

    try {
      const data = await getNumberOfFollowers(store._id)
      newStore.numberOfFollowers = data.count
    } catch {
      newStore.numberOfFollower = 0
    }

    try {
      const { _id, accessToken } = getToken()
      const data = await checkFollowingStore(_id, accessToken, store._id)
      newStore.isFollowing = data.success ? true : false
    } catch {
      newStore.isFollowing = false
    }

    setStoreValue(newStore)
    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [store])

  const onHandleRun = async (newStore) => {
    if (onRun) onRun(newStore)

    let numberOfFollowers
    try {
      const data = await getNumberOfFollowers(newStore._id)
      numberOfFollowers = data.count
    } catch {
      const currentNumberOfFollowers = storeValue.numberOfFollowers
      numberOfFollowers = newStore.isFollowing
        ? currentNumberOfFollowers + 1
        : currentNumberOfFollowers - 1
    }

    setStoreValue({
      ...storeValue,
      numberOfFollowers
    })
  }

  if (isLoading) {
    return (
      <div className='card border-0 m-auto'>
        <div className='card-img-top cus-card-img-top'>
          <Skeleton height={200} />
        </div>
        <div className='card-body border-top border-value'>
          <Skeleton height={20} width={100} />
          <Skeleton height={15} />
          <Skeleton height={37} />
        </div>
      </div>
    )
  }

  return (
    <div className='card border-0 m-auto'>
      <Link
        className='text-reset text-decoration-none'
        to={`/store/${storeValue._id}`}
        title={storeValue.name}
      >
        <div className='card-img-top cus-card-img-top'>
          <img
            loading='lazy'
            src={IMG + storeValue.avatar}
            className='cus-card-img'
            alt={storeValue.name}
          />
        </div>
      </Link>

      <div className='card-body border-top border-value'>
        <small className='card-subtitle'>
          <div className='d-flex justify-content-between align-items-center'>
            {storeValue.rating ? (
              <StarRating stars={storeValue.rating} />
            ) : (
              <Skeleton width={80} />
            )}
            <span className=''>
              <StoreFollowLabel
                numberOfFollowers={storeValue.numberOfFollowers}
              />
            </span>
          </div>
        </small>

        <Link
          className='text-reset text-decoration-none link-hover d-block mt-1'
          to={`/store/${store._id}`}
          title={storeValue.name}
        >
          <h6
            className='card-title'
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {store.name}
          </h6>
        </Link>

        {getToken() && (
          <FollowStoreButton
            storeId={storeValue._id}
            isFollowing={storeValue.isFollowing}
            className='w-100 mt-1'
            onRun={(store) => onHandleRun(store)}
          />
        )}
      </div>
    </div>
  )
}

export default StoreCard
