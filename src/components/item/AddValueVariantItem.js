import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import AddValueVariantForm from './form/AddValueVariantForm'

const AddValueVariantItem = ({
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
        <i className='fa-solid fa-plus'></i>
        <span className='ms-2 res-hide'>{t('variantDetail.value.addBtn')}</span>
      </button>

      <Modal
        id={`add-variant-value-form-${variantId}`}
        hasCloseBtn={false}
        title={`${t('variantDetail.value.add')} '${variantName}'`}
      >
        <AddValueVariantForm
          variantId={variantId}
          variantName={variantName}
          onRun={onRun}
        />
      </Modal>
    </div>
  )
}

export default AddValueVariantItem
