import Modal from '../ui/Modal'
import { useTranslation } from 'react-i18next'
import EditReviewForm from './form/EditReviewForm'

const EditReviewItem = ({ oldReview = {}, onRun }) => {
  const { t } = useTranslation()
  return (
    <div className='position-relative d-inline-block'>
      <button
        type='button'
        data-bs-target={`#review-edit-form-${oldReview._id}`}
        data-bs-toggle='modal'
        className='btn btn-primary btn-sm ripple cus-tooltip'
      >
        <i className='fas fa-pen'></i>
      </button>

      <Modal
        hasCloseBtn={false}
        title={t('reviewDetail.edit')}
        id={`review-edit-form-${oldReview._id}`}
      >
        <EditReviewForm oldReview={oldReview} onRun={onRun} />
      </Modal>

      <small className='cus-tooltip-msg'>{t('reviewDetail.edit')}</small>
    </div>
  )
}

export default EditReviewItem
