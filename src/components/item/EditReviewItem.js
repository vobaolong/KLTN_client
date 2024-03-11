import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import EditReviewForm from './form/EditReviewForm'

const EditReviewItem = ({ oldReview = {}, onRun }) => {
  const { t } = useTranslation()
  return (
    <div className='position-relative d-inline-block'>
      <button
        type='button'
        className='btn btn-primary btn-sm ripple cus-tooltip'
        data-bs-toggle='modal'
        data-bs-target={`#review-edit-form-${oldReview._id}`}
      >
        <i className='fas fa-pen'></i>
      </button>

      <Modal
        id={`review-edit-form-${oldReview._id}`}
        hasCloseBtn={false}
        title={t('reviewDetail.edit')}
      >
        <EditReviewForm oldReview={oldReview} onRun={onRun} />
      </Modal>

      <small className='cus-tooltip-msg'>{t('reviewDetail.edit')}</small>
    </div>
  )
}

export default EditReviewItem
