import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import AddVariantValueForm from './form/AddVariantValueForm'

const AddVariantValueItem = ({
  variantId = '',
  variantName = '',
  onRun,
  isFullWidth = false
}) => {
  const { t } = useTranslation()
  return (
    <div
      className={`position-relative d-inline-block ${
        isFullWidth ? 'w-100' : ''
      }`}
    >
      <button
        type='button'
        className={`btn btn-primary ripple text-nowrap rounded-1 ${
          isFullWidth ? 'w-100' : ''
        }`}
        data-bs-toggle='modal'
        data-bs-target={`#add-variant-value-form-${variantId}`}
      >
        <i className='fa-light fa-plus'></i>
        <span className='ms-2 res-hide'>{t('variantDetail.value.add')}</span>
      </button>

      <Modal
        id={`add-variant-value-form-${variantId}`}
        hasCloseBtn={false}
        title={`${t('variantDetail.value.add')} '${variantName}'`}
      >
        <AddVariantValueForm
          variantId={variantId}
          variantName={variantName}
          onRun={onRun}
        />
      </Modal>
    </div>
  )
}

export default AddVariantValueItem
