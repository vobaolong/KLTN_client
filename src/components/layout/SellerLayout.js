import MainLayout from './MainLayout'
import SellerSideBar from './menu/SellerSideBar'
import Breadcrumb from '../ui/Breadcrumb'

const SellerLayout = ({
  user = {},
  store = {},
  children = null,
  paths = {}
}) => {
  return (
    <MainLayout container='container-xxl' navFor='seller'>
      <div className='row'>
        <div className='col-md-2 res-sticky-top-md p-0'>
          <SellerSideBar user={user} store={store} />
        </div>
        <div className='mt-4 col-md-10'>
          <Breadcrumb paths={paths} />
          {children}
        </div>
      </div>
    </MainLayout>
  )
}
export default SellerLayout
