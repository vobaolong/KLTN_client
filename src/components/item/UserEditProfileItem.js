import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import UserEditProfileForm from './form/UserEditProfileForm'

const UserEditProfileItem = ({ user = {} }) => {
  const { t } = useTranslation()
  return (
    <div className='position-relative d-inline-block'>
      <button
        type='button'
        className='btn btn-primary ripple cus-tooltip'
        data-bs-toggle='modal'
        data-bs-target='#profile-edit-form'
      >
        <i className='fas fa-pen'></i>
      </button>

      <Modal
        id='profile-edit-form'
        hasCloseBtn={false}
        title={t('userDetail.editProfile')}
      >
        <UserEditProfileForm
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          phone={user.phone}
          id_card={user.id_card}
          googleId={user.googleId}
          facebookId={user.facebookId}
        />
      </Modal>

      <small className='cus-tooltip-msg'>{t('userDetail.editProfile')}</small>
    </div>
  )
}
export default UserEditProfileItem
