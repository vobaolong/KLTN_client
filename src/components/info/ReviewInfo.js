import { useState } from 'react'
import { getToken } from '../../apis/auth'
import { removeReview } from '../../apis/review'
import StarRating from '../label/StarRating'
import Paragraph from '../ui/Paragraph'
import UserSmallCard from '../card/UserSmallCard'
import ProductSmallCard from '../card/ProductSmallCard'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import ConfirmDialog from '../ui/ConfirmDialog'
import EditReviewItem from '../item/EditReviewItem'
import { humanReadableDate } from '../../helper/humanReadable'
import { useTranslation } from 'react-i18next'

const ReviewInfo = ({ review = {}, about = true, onRun }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  console.log(review.userId)
  const handleRemove = () => {
    setIsConfirming(true)
  }

  const onSubmit = () => {
    const { _id, accessToken } = getToken()
    setError('')
    setIsLoading(true)
    removeReview(_id, accessToken, review._id)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setTimeout(() => {
            setError('')
          }, 3000)
        } else if (onRun) onRun()
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server error')
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='row py-2 border-bottom position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={t('reviewDetail.delete')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <div className='col-12 mx-2 d-flex justify-content-between align-items-center'>
        <div className='d-flex justify-content-between  flex-grow-1 me-3'>
          <UserSmallCard user={review.userId} />
          {about && (
            <>
              <i className='fas fa-comment-dots text-primary mx-4'></i>
              <ProductSmallCard product={review.productId} />
            </>
          )}
          <span style={{ fontSize: '0.8rem', top: '0px', color: '#555' }}>
            {humanReadableDate(review.createdAt)}
          </span>
        </div>

        {getToken() && review.userId && getToken()._id === review.userId._id && (
          <div className='d-flex justify-content-end flex-wrap me-2'>
            <div className='mb-1'>
              <EditReviewItem oldReview={review} onRun={onRun} />
            </div>

            <div className='d-inline-block position-relative ms-1'>
              <button
                type='button'
                className='btn btn-outline-danger rounded-1 btn-sm ripple cus-tooltip'
                onClick={handleRemove}
              >
                <i className='fas fa-trash-alt'></i>
              </button>

              <small className='cus-tooltip-msg'>
                {t('reviewDetail.delete')}
              </small>
            </div>
          </div>
        )}
      </div>

      <div className='col-12'>
        <div className='row'>
          <small>
            <StarRating stars={review.rating} />
          </small>
        </div>
        {review.content}
      </div>
    </div>
  )
}

export default ReviewInfo
