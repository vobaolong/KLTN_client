import Modal from '../ui/Modal'
import AdminCreateStoreLevelForm from './form/AdminCreateStoreLevelForm'

const AdminCreateStoreLevelItem = ({ onRun = () => { } }) => (
	<div className='d-inline-block'>
		<button
			type='button'
			className='btn btn-primary ripple text-nowrap rounded-1'
			data-bs-toggle='modal'
			data-bs-target='#admin-create-level-form'
		>
			<i className='fas fa-plus-circle'></i>
			<span className='ms-2 res-hide'>Add store level</span>
		</button>

		<Modal
			id='admin-create-level-form'
			hasCloseBtn={false}
			title='Create new level'
		>
			<AdminCreateStoreLevelForm onRun={onRun} />
		</Modal>
	</div>
)

export default AdminCreateStoreLevelItem
