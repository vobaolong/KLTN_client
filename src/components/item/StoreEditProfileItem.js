import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import StoreEditProfileForm from './form/StoreProfileEditForm'

const StoreEditProfileItem = ({ store = {} }) => {
  const { t } = useTranslation()
  return (
    <div className='position-relative d-inline-block'>
      <button
        type='button'
        className='btn btn-outline-primary rounded-1 ripple cus-tooltip'
        data-bs-toggle='modal'
        data-bs-target='#store-profile-edit-form'
      >
        <i className='fas fa-pen'></i>
      </button>

      <Modal
        id='store-profile-edit-form'
        hasCloseBtn={false}
        title={t('storeDetail.editProfile')}
      >
        <StoreEditProfileForm
          storeId={store._id}
          name={store.name}
          bio={store.bio}
          address={store.address}
        />
      </Modal>

      <small className='cus-tooltip-msg'>{t('storeDetail.editProfile')}</small>
    </div>
  )
}
export default StoreEditProfileItem
