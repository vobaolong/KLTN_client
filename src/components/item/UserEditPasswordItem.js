import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import UserEditPasswordForm from './form/UserEditPasswordForm'

const UserEditPasswordItem = (props) => {
  const { t } = useTranslation()
  return (
    <div className='position-relative d-inline-block'>
      <button
        type='button'
        className='btn btn-primary ripple cus-tooltip'
        data-bs-toggle='modal'
        data-bs-target='#password-edit-form'
      >
        <i className='fas fa-key'></i>
      </button>

      <Modal id='password-edit-form' hasCloseBtn={false} title='Edit Password'>
        <UserEditPasswordForm />
      </Modal>

      <small className='cus-tooltip-msg'>{t('changePassword')}</small>
    </div>
  )
}
export default UserEditPasswordItem
