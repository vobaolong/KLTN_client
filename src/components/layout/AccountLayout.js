import Breadcrumb from '../ui/Breadcrumb'
import MainLayout from './MainLayout'
import AccountSideBar from './menu/AccountSideBar'

const AccountLayout = ({ user = {}, children = null, paths = {} }) => {
  return (
    <MainLayout>
      <div className='container-fluid p-0'>
        <div className='row'>
          <div className='col-lg-2 col-md-2 res-sticky-top-md pe-0'>
            <AccountSideBar user={user} />
          </div>
          <div className='col-lg-10 col-md-10'>
            <Breadcrumb paths={paths} />
            {children}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
export default AccountLayout
