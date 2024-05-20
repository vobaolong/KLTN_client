import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import AdminCreateUserLevelForm from './form/AdminCreateUserLevelForm'

const AdminCreateUserLevelItem = ({ onRun = () => {} }) => {
  const { t } = useTranslation()
  return (
    <div className='d-inline-block'>
      <button
        type='button'
        className='btn btn-primary ripple text-nowrap rounded-1'
        data-bs-toggle='modal'
        data-bs-target='#admin-create-level-form'
      >
        <i className='fa-light fa-plus'></i>
        <span className='ms-2 res-hide'>{t('button.addLevel')}</span>
      </button>

      <Modal
        id='admin-create-level-form'
        hasCloseBtn={false}
        title={t('levelDetail.create')}
      >
        <AdminCreateUserLevelForm onRun={onRun} />
      </Modal>
    </div>
  )
}
export default AdminCreateUserLevelItem
