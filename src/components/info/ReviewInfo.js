import { useState } from 'react'
import { getToken } from '../../apis/auth'
import { removeReview } from '../../apis/review'
import StarRating from '../label/StarRating'
import ProductSmallCard from '../card/ProductSmallCard'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import EditReviewItem from '../item/EditReviewItem'
import { humanReadableDate } from '../../helper/humanReadable'
import { useTranslation } from 'react-i18next'
import { calcTime } from '../../helper/calcTime'
import { toast } from 'react-toastify'
import Error from '../ui/Error'
import Modal from '../ui/Modal'

const ReviewInfo = ({ review = {}, about = true, onRun }) => {
  const [error, setError] = useState('')
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }
  const handleRemove = () => {
    if (!isReviewAllowed) return
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
        } else if (onRun) {
          onRun()
          toast.success(t('toastSuccess.review.delete'))
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server error')
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }
  const hoursDifference = calcTime(review?.orderId?.updatedAt)
  const isReviewAllowed = hoursDifference < 720 //30days

  return (
    <div className='row py-2 border-bottom position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={t('reviewDetail.delete')}
          message={t('message.delete')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          color='danger'
        />
      )}

      <div className='col-12 px-1 d-flex justify-content-between align-items-center'>
        <div className='d-flex justify-content-between flex-grow-1'>
          <small className='hidden-avatar d-inline-flex gap-2'>
            <StarRating stars={review.rating} />
            <small className='text-secondary'>
              {(review.rating === 5 && t('reviewDetail.amazing')) ||
                (review.rating === 4 && t('reviewDetail.good')) ||
                (review.rating === 3 && t('reviewDetail.fair')) ||
                (review.rating === 2 && t('reviewDetail.poor')) ||
                (review.rating === 1 && t('reviewDetail.terrible'))}
            </small>
            <span className='text-primary fw-medium'>
              {review?.userId?.firstName} {review?.userId?.lastName}
            </span>
            {/* <span className='text-secondary'>{review?.productId?.name}</span> */}
            <span className='text-success rounded-1 px-1 bg-success-rgba my-auto'>
              <i className='fa-regular fa-circle-check'></i>{' '}
              {t('productDetail.purchased')}
            </span>
            {about && (
              <ProductSmallCard borderName={true} product={review.productId} />
            )}
          </small>

          <span style={{ fontSize: '0.8rem', color: '#555' }}>
            {humanReadableDate(review.createdAt)}
          </span>
        </div>
      </div>
      <div className='col-10 mt-1 px-1'>
        <span style={{ fontSize: '0.9rem' }}>{review.content}</span>
      </div>
      {getToken()?._id === review.userId?._id && isReviewAllowed && (
        <div className='col-2 d-flex justify-content-end align-items-end flex-wrap px-1 mt-1'>
          <div className='d-flex justify-content-between'>
            <div className='menu-container'>
              <button className='btn menu-button' onClick={handleMenuToggle}>
                <i className='fa fa-ellipsis-v'></i>
              </button>
              {showMenu && (
                <div className='menu d-flex flex-column gap-2 align-item-start p-2'>
                  <EditReviewItem oldReview={review} onRun={onRun} />
                  <hr className='m-0' />
                  <button
                    type='button'
                    className='btn rounded-1 btn-sm ripple rm-review w-100 text-start'
                    onClick={handleRemove}
                  >
                    <i className='fa-solid fa-trash-alt me-2'></i>
                    {t('reviewDetail.delete')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewInfo
