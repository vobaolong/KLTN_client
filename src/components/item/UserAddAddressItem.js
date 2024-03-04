import Modal from '../ui/Modal'
import UserAddAddressForm from './form/UserAddAddressForm'

const UserAddAddressItem = ({ count = 0, detail = true }) => (
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
        {detail && <span className='ms-2 res-hide'>Thêm địa chỉ</span>}
      </button>

      {count < 6 && (
        <Modal id='add-address-form' hasCloseBtn={false} title='Thêm Địa Chỉ'>
          <UserAddAddressForm />
        </Modal>
      )}
    </div>
    {count >= 6 && <small className='cus-tooltip-msg'>Tối đa 6 địa chỉ</small>}
  </div>
)

export default UserAddAddressItem
