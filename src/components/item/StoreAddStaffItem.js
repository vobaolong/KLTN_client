import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import StoreAddStaffForm from './form/StoreAddStaffForm'

const StoreAddStaffItem = ({ storeId = '', owner = {}, staffs = [] }) => {
  const { t } = useTranslation()
  return (
    <div className='d-inline-block'>
      <button
        type='button'
        className='btn btn-primary ripple text-nowrap rounded-1'
        data-bs-toggle='modal'
        data-bs-target='#add-staff-form'
      >
        <i className='fa-solid fa-plus-circle'></i>
        <span className='ms-2 res-hide'>{t('staffDetail.add')}</span>
      </button>

      <Modal
        id='add-staff-form'
        hasCloseBtn={false}
        title={t('staffDetail.add')}
      >
        <StoreAddStaffForm storeId={storeId} owner={owner} staffs={staffs} />
      </Modal>
    </div>
  )
}
export default StoreAddStaffItem
