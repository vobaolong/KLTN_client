import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import AdminCreateDeliveryForm from './form/AdminCreateDeliveryForm'

const AdminCreateDeliveryItem = ({ onRun = () => {} }) => {
  const { t } = useTranslation()
  return (
    <div className='d-inline-block'>
      <button
        type='button'
        className='btn btn-primary ripple text-nowrap rounded-1'
        data-bs-toggle='modal'
        data-bs-target='#admin-create-delivery-form'
      >
        <i className='fa-solid fa-plus-circle'></i>
        <span className='ms-2 res-hide'>{t('deliveryDetail.add')}</span>
      </button>

      <Modal
        id='admin-create-delivery-form'
        hasCloseBtn={false}
        title='Create new delivery unit'
      >
        <AdminCreateDeliveryForm onRun={onRun} />
      </Modal>
    </div>
  )
}

export default AdminCreateDeliveryItem
