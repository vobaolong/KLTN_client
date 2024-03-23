import Paragraph from '../ui/Paragraph'
import { humanReadableDate } from '../../helper/humanReadable'
import { useTranslation } from 'react-i18next'

const StoreJoinedInfo = ({ store = {} }) => {
	const { t } = useTranslation()
	return (
		<div className='container-fluid'>
			<div className='row py-2 border border rounded-1'>
				{/* <div className='col-12'>
        <Paragraph
          label='Type'
          value={<StoreCommissionLabel commission={store.commissionId} />}
        />
      </div> */}

				<div className='col-12'>
					<Paragraph
						label={
							<span>
								<i class='fa-solid fa-user-check me-1 text-secondary'></i>
								{t('joined')}
							</span>
						}
						time={humanReadableDate(store.createdAt)}
					/>
				</div>
			</div>
		</div>
	)
}
export default StoreJoinedInfo
