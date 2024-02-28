import Paragraph from '../ui/Paragraph'
import StoreCommissionLabel from '../label/StoreCommissionLabel'
import { humanReadableDate } from '../../helper/humanReadable'

const StoreJoinedInfo = ({ store = {} }) => (
  <div className='container-fluid'>
    <div className='row py-2 border border-primary rounded-3'>
      <div className='col-12'>
        <Paragraph
          label='Type'
          value={<StoreCommissionLabel commission={store.commissionId} />}
        />
      </div>

      <div className='col-12'>
        <Paragraph label='Joined' value={humanReadableDate(store.createdAt)} />
      </div>
    </div>
  </div>
)

export default StoreJoinedInfo
