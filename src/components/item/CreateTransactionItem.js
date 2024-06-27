import Modal from '../ui/Modal'
import CreateDepositTransactionForm from './form/CreateDepositTransactionForm'
import CreateWithDrawTransactionForm from './form/CreateWithDrawTransactionForm'
import { useTranslation } from 'react-i18next'

const CreateTransactionItem = ({ eWallet = 0, storeId = '', onRun }) => {
  const { t } = useTranslation()

  return (
    <div className='d-flex gap-3'>
      {/*  */}
      <div className='position-relative d-inline-block'>
        <div className='cus-tooltip'>
          <button
            type='button'
            className='btn btn-outline-success ripple text-nowrap rounded-1'
            data-bs-toggle='modal'
            data-bs-target='#create-deposit-transaction-form'
          >
            <i className='fa-solid fa-file-import'></i>
            <span className='ms-2'>{t('transactionDetail.deposit')}</span>
          </button>

          <Modal
            id='create-deposit-transaction-form'
            hasCloseBtn={false}
            title={t('transactionDetail.deposit')}
          >
            <CreateDepositTransactionForm
              eWallet={eWallet}
              storeId={storeId}
              onRun={onRun}
            />
          </Modal>
        </div>
      </div>

      {/*  */}
      <div className='position-relative d-inline-block'>
        <div className='cus-tooltip'>
          <button
            type='button'
            disabled={eWallet <= 0 ? true : false}
            className='btn btn-outline-danger ripple text-nowrap rounded-1'
            data-bs-toggle='modal'
            data-bs-target='#create-withdraw-transaction-form'
          >
            <i className='fa-solid fa-file-export'></i>
            <span className='ms-2'>{t('transactionDetail.draw')}</span>
          </button>

          {eWallet > 0 && (
            <Modal
              id='create-withdraw-transaction-form'
              hasCloseBtn={false}
              title={t('transactionDetail.draw')}
            >
              <CreateWithDrawTransactionForm
                eWallet={eWallet}
                storeId={storeId}
                onRun={onRun}
              />
            </Modal>
          )}
        </div>
        {eWallet <= 0 && (
          <small className='cus-tooltip-msg'>
            {t('transactionDetail.empty')}
          </small>
        )}
      </div>
    </div>
  )
}

export default CreateTransactionItem
