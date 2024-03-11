import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { editReview } from '../../../apis/review'
import { numberTest, regexTest } from '../../../helper/test'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'
import TextArea from '../../ui/TextArea'
import RatingInput from '../../ui/RatingInput'
import { useTranslation } from 'react-i18next'

const EditReviewForm = ({ oldReview = {}, onRun }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [newReview, setNewReview] = useState({
    rating: 1,
    content: '',
    isValidRating: true,
    isValidContent: true
  })

  const { _id, accessToken } = getToken()

  useEffect(() => {
    setNewReview({
      ...newReview,
      rating: oldReview.rating,
      content: oldReview.content
    })
  }, [oldReview])

  const handleChange = (name, isValidName, value) => {
    setNewReview({
      ...newReview,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setNewReview({
      ...newReview,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newReview.rating) {
      setNewReview({
        ...newReview,
        isValidRating: numberTest('oneTo5', newReview.rating),
        isValidContent: regexTest('nullable', newReview.content)
      })
      return
    }

    if (!newReview.isValidRating || !newReview.isValidContent) return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    setSuccess('')
    setError('')
    setIsLoading(true)
    editReview(_id, accessToken, newReview, oldReview._id)
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
          title={t('reviewDetail.edit')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <RatingInput
            label='Rate'
            value={newReview.rating}
            isValid={newReview.isValidRating}
            feedback={t('reviewDetail.isValid')}
            onChange={(value) => handleChange('rating', 'isValidRating', value)}
          />
        </div>

        <div className='col-12'>
          <TextArea
            type='text'
            label={t('reviewDetail.content')}
            value={newReview.content}
            isValid={newReview.isValidContent}
            feedback={t('reviewDetail.isValid')}
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
            {t('button.edit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditReviewForm
