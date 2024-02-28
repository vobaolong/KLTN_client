import Modal from '../ui/Modal'
import AdminCreateDeliveryForm from './form/AdminCreateDeliveryForm'

const AdminCreateDeliveryItem = ({ onRun = () => {} }) => (
  <div className='d-inline-block'>
    <button
      type='button'
      className='btn btn-primary ripple text-nowrap'
      data-bs-toggle='modal'
      data-bs-target='#admin-create-delivery-form'
    >
      <i className='fas fa-plus-circle'></i>
      <span className='ms-2 res-hide'>Add delivery unit</span>
    </button>

    <Modal
      id='admin-create-delivery-form'
      hasCloseBtn={false}
      title='Create new delivery unit'
    >
      <AdminCreateDeliveryForm onRun={onRun} />
    </Modal>
  </div>
)

export default AdminCreateDeliveryItem
