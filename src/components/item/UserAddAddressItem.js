import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import UserAddAddressForm from './form/UserAddAddressForm'

const UserAddAddressItem = ({ count = 0, detail = true }) => {
  const { t } = useTranslation()
  return (
    <div className='position-relative d-inline-block'>
      <div className='cus-tooltip'>
        <button
          type='button'
          disabled={count >= 6 ? true : false}
          className='btn btn-primary ripple text-nowrap'
          data-bs-toggle='modal'
          data-bs-target='#add-address-form'
        >
          <i className='fas fa-plus-circle'></i>
          {detail && (
            <span className='ms-2 res-hide'>{t('userDetail.addAddress')}</span>
          )}
        </button>

        {count < 6 && (
          <Modal
            id='add-address-form'
            hasCloseBtn={false}
            title={t('userDetail.addAddress')}
          >
            <UserAddAddressForm />
          </Modal>
        )}
      </div>
      {count >= 6 && (
        <small className='cus-tooltip-msg'>
          {t('userDetail.limit6Addresses')}
        </small>
      )}
    </div>
  )
}

export default UserAddAddressItem
