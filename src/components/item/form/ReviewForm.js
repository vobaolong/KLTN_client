import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { reviewProduct } from '../../../apis/review'
import { numberTest, regexTest } from '../../../helper/test'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'
import TextArea from '../../ui/TextArea'
import RatingInput from '../../ui/RatingInput'
import { useTranslation } from 'react-i18next'

const ReviewForm = ({ storeId = '', orderId = '', productId = '', onRun }) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [review, setReview] = useState({
    storeId,
    orderId,
    productId,
    rating: 1,
    content: '',
    isValidRating: true,
    isValidContent: true
  })

  const { _id, accessToken } = getToken()

  useEffect(() => {
    setReview({
      ...review,
      storeId,
      orderId,
      productId
    })
  }, [storeId, productId, orderId])

  const handleChange = (name, isValidName, value) => {
    setReview({
      ...review,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setReview({
      ...review,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !review.storeId ||
      !review.orderId ||
      !review.productId ||
      !review.rating
    ) {
      setReview({
        ...review,
        isValidRating: numberTest('oneTo5', review.rating),
        isValidContent: regexTest('nullable', review.content)
      })
      return
    }

    if (!review.isValidRating || !review.isValidContent) return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    setSuccess('')
    setError('')
    setIsLoading(true)
    reviewProduct(_id, accessToken, review)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setSuccess(data.success)
          if (onRun) onRun()
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
        }, 3000)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Review & rate'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      {error && <Error msg={error} />}
      {success && <Success msg={success} />}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <RatingInput
            label='Rate'
            value={review.rating}
            isValid={review.isValidRating}
            feedback='Please provide a valid rating.'
            onChange={(value) => handleChange('rating', 'isValidRating', value)}
          />
        </div>

        <div className='col-12'>
          <TextArea
            type='text'
            label='Content'
            value={review.content}
            isValid={review.isValidContent}
            feedback='Please provide a valid content.'
            validator='nullable'
            onChange={(value) =>
              handleChange('content', 'isValidContent', value)
            }
            onValidate={(flag) => handleValidate('isValidContent', flag)}
          />
        </div>

        {error && (
          <div className='col-12'>
            <Error msg={error} />
          </div>
        )}

        {success && (
          <div className='col-12'>
            <Success msg={success} />
          </div>
        )}

        <div className='col-12 d-grid mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple'
            onClick={handleSubmit}
          >
            {t('submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm
