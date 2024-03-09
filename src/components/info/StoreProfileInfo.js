import Paragraph from '../ui/Paragraph'
import StoreEditProfileItem from '../item/StoreEditProfileItem'

const StoreProfileInfo = ({ store = {}, isEditable = false }) => (
  <div className='container-fluid'>
    <div className='row py-2 border rounded-1'>
      <div className='col-12'>
        <Paragraph label='Bio:' value={store.bio} multiLine={true} />
      </div>

      {isEditable && (
        <div className='col-12 d-flex justify-content-end'>
          <StoreEditProfileItem store={store} />
        </div>
      )}
    </div>
  </div>
)

export default StoreProfileInfo
