import { useTranslation } from 'react-i18next'

const PhoneActiveItem = ({ phone = '', isPhoneActive = false }) => {
	const { t } = useTranslation()
	return (
		<>
			{phone && isPhoneActive && (
				<div className='position-relative d-inline-block'>
					<span className='badge bg-primary cus-tooltip rounded-1'>
						<i className='fas fa-check-circle me-2'></i>
						{t('verified')}
					</span>
					<small className='cus-tooltip-msg'>Phone number Verified</small>
				</div>
			)}

			{phone && !isPhoneActive && (
				<div className='position-relative d-inline-block'>
					<div className='temp cus-tooltip'>
						<button
							disabled
							className='btn btn-warning btn-sm text-white cus-tooltip ripple'
							onClick={() => { }}
						>
							<i className='fas fa-sms me-2'></i>
							verify now!
						</button>
						<small className='cus-tooltip-msg'>
							Click to send confirmation sms
						</small>
					</div>
					<small className='cus-tooltip-msg'>
						This function is not available yet
					</small>
				</div>
			)}
		</>
	)
}

export default PhoneActiveItem
