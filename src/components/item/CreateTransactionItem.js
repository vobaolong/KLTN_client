import Modal from '../ui/Modal'
import CreateTransactionForm from './form/CreateTransactionForm'

const CreateTransactionItem = ({ eWallet = 0, storeId = '', onRun }) => (
  <div className='position-relative d-inline-block'>
    <div className='cus-tooltip'>
      <button
        type='button'
        disabled={eWallet <= 0 ? true : false}
        className='btn btn-primary ripple text-nowrap'
        data-bs-toggle='modal'
        data-bs-target='#create-transaction-form'
      >
        <i className='fas fa-comment-dollar'></i>
        <span className='ms-2 res-hide'>Rút Tiền</span>
      </button>

      {eWallet > 0 && (
        <Modal
          id='create-transaction-form'
          hasCloseBtn={false}
          title='Withdraw'
        >
          <CreateTransactionForm
            eWallet={eWallet}
            storeId={storeId}
            onRun={onRun}
          />
        </Modal>
      )}
    </div>
    {eWallet <= 0 && <small className='cus-tooltip-msg'>Ví rỗng</small>}
  </div>
)

export default CreateTransactionItem
