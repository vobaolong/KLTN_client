import MainLayout from './MainLayout'
import VendorSideBar from './menu/VendorSideBar'

const VendorLayout = ({ user = {}, store = {}, children = null }) => (
  <MainLayout container='container-fluid' navFor='vendor'>
    <div className='row'>
      <div className='col-md-2 res-sticky-top-md mb-4'>
        <VendorSideBar user={user} store={store} />
      </div>

      <div className='col-md-10'>{children}</div>
    </div>
  </MainLayout>
)

export default VendorLayout
