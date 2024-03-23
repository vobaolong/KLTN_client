import Modal from '../ui/Modal'
import CreateTransactionForm from './form/CreateTransactionForm'
import { useTranslation } from 'react-i18next'

const CreateTransactionItem = ({ eWallet = 0, storeId = '', onRun }) => {
	const { t } = useTranslation()

	return (
		<div className='position-relative d-inline-block'>
			<div className='cus-tooltip'>
				<button
					type='button'
					disabled={eWallet <= 0 ? true : false}
					className='btn btn-outline-primary ripple text-nowrap rounded-1'
					data-bs-toggle='modal'
					data-bs-target='#create-transaction-form'
				>
					<i class='fa-solid fa-money-bill-transfer'></i>
					<span className='ms-2 res-hide'>{t('transactionDetail.draw')}</span>
				</button>

				{eWallet > 0 && (
					<Modal
						id='create-transaction-form'
						hasCloseBtn={false}
						title={t('transactionDetail.draw')}
					>
						<CreateTransactionForm
							eWallet={eWallet}
							storeId={storeId}
							onRun={onRun}
						/>
					</Modal>
				)}
			</div>
			{eWallet <= 0 && <small className='cus-tooltip-msg'>{t('empty')}</small>}
		</div>
	)
}

export default CreateTransactionItem
