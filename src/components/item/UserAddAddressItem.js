import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import UserAddAddressForm from './form/UserAddAddressForm'

const UserAddAddressItem = ({ heading = false, count = 0, detail = true }) => {
  const { t } = useTranslation()

  return (
    <div className='position-relative d-flex align-items-center justify-content-between'>
      {heading && (
        <h5 className='text-start mb-0'>{t('userDetail.address')}</h5>
      )}
      <div className='cus-tooltip'>
        <button
          type='button'
          disabled={count >= 10 ? true : false}
          className='btn btn-primary ripple text-nowrap rounded-1'
          data-bs-toggle='modal'
          data-bs-target='#add-address-form'
        >
          <i className='fa-light fa-plus'></i>
          {detail && (
            <span className='ms-2 res-hide'>{t('userDetail.addAddress')}</span>
          )}
        </button>

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
