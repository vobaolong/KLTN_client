/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { checkReview } from '../../apis/review'
import Loading from '../ui/Loading'
import Modal from '../ui/Modal'
import ReviewForm from './form/ReviewForm'
import { humanReadableDate } from '../../helper/humanReadable'
import { calcTime } from '../../helper/calcTime'
import { useTranslation } from 'react-i18next'

const ReviewItem = ({
  orderId = '',
  storeId = '',
  productId = '',
  detail = true,
  date = ''
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isReviewed, setIsReviewed] = useState(false)
  const [deliveredDate, setDeliveredDate] = useState(date)

  useEffect(() => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 30)
    setDeliveredDate(newDate)
  }, [date])

  const init = () => {
    const { _id, accessToken } = getToken()
    setIsLoading(true)
    checkReview(_id, accessToken, { orderId, productId })
      .then((data) => {
        if (data.success) setIsReviewed(true)
        else setIsReviewed(false)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsReviewed(false)
        setIsLoading(false)
      })
  }
  useEffect(() => {
    init()
  }, [orderId, storeId, productId])

  return (
    <div className='review-item position-relative d-inline-block'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='cus-tooltip d-flex justify-content-end'>
            {calcTime(deliveredDate) > 0}
            <button
              type='button'
              disabled={isReviewed || calcTime(deliveredDate) > 0}
              className='btn btn-primary ripple text-nowrap rounded-1'
              data-bs-toggle='modal'
              data-bs-target='#review-form'
            >
              <i className='fas fa-comment-dots'></i>
              {detail && (
                <span className='ms-2 res-hide-lg'>{t('filters.rating')}</span>
              )}
            </button>
            {!isReviewed && (
              <Modal
                id='review-form'
                hasCloseBtn={false}
                title='Review & Rate product'
              >
                <ReviewForm
                  orderId={orderId}
                  storeId={storeId}
                  productId={productId}
                  onRun={() => setIsReviewed(true)}
                />
              </Modal>
            )}
          </div>
          {!isReviewed && (
            <div className=''>
              <small>
                Đánh giá trước{' '}
                <u className='cus-tooltip' style={{ cursor: 'help' }}>
                  {humanReadableDate(deliveredDate)}
                </u>
                <small className='cus-tooltip-msg'>
                  Bạn sẽ không thể đánh giá đơn hàng sau{' '}
                  {humanReadableDate(deliveredDate)}.
                </small>
              </small>
            </div>
          )}
          {isReviewed && (
            <small className='cus-tooltip-msg'>Sản phẩm đã được đánh giá</small>
          )}
        </>
      )}
    </div>
  )
}

export default ReviewItem
