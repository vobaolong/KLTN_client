import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import UserEditPasswordForm from './form/UserEditPasswordForm'

const UserEditPasswordItem = (props) => {
  const { t } = useTranslation()
  return (
    <div className='position-relative d-inline-block'>
      <button
        type='button'
        className='btn btn-outline-primary rounded-1 ripple cus-tooltip'
        data-bs-toggle='modal'
        data-bs-target='#password-edit-form'
      >
        <i className='fas fa-key'></i>
      </button>

      <Modal
        id='password-edit-form'
        hasCloseBtn={false}
        title={t('userDetail.changePassword')}
      >
        <UserEditPasswordForm />
      </Modal>

      <small className='cus-tooltip-msg'>
        {t('userDetail.changePassword')}
      </small>
    </div>
  )
}
export default UserEditPasswordItem
