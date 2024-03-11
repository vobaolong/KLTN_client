import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import AdminCreateCommissionForm from './form/AdminCreateCommissionForm'

const AdminCreateCommissionItem = ({ onRun = () => {} }) => {
  const { t } = useTranslation()
  return (
    <div className='admin-create-commission-item d-inline-block'>
      <button
        type='button'
        className='btn btn-primary ripple text-nowrap rounded-1'
        data-bs-toggle='modal'
        data-bs-target='#admin-create-commission-form'
      >
        <i className='fas fa-plus-circle'></i>
        <span className='ms-2 res-hide'>{t('commissDetail.add')}</span>
      </button>

      <Modal
        id='admin-create-commission-form'
        hasCloseBtn={false}
        title='Create new commission'
      >
        <AdminCreateCommissionForm onRun={onRun} />
      </Modal>
    </div>
  )
}
export default AdminCreateCommissionItem
