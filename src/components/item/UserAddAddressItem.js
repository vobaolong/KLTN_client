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
          disabled={count >= 10 ? true : false}
          className='btn btn-primary ripple text-nowrap rounded-1 cus-tooltip'
          data-bs-toggle='modal'
          data-bs-target='#add-address-form'
        >
          <i className='fa-solid fa-plus'></i>
          {detail && (
            <span className='ms-2 res-hide'>{t('userDetail.addAddress')}</span>
          )}
        </button>
        <small className='cus-tooltip-msg'>{t('userDetail.addAddress')}</small>

        {count < 10 && (
          <Modal
            id='add-address-form'
            hasCloseBtn={false}
            title={t('userDetail.addAddress')}
          >
            <UserAddAddressForm />
          </Modal>
        )}
      </div>
      {count >= 10 && (
        <small className='cus-tooltip-msg'>
          {t('userDetail.limit10Addresses')}
        </small>
      )}
    </div>
  )
}

export default UserAddAddressItem
