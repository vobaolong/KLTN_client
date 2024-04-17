import Breadcrumb from '../ui/Breadcrumb'
import MainLayout from './MainLayout'
import AccountSideBar from './menu/AccountSideBar'

const AccountLayout = ({ user = {}, children = null, paths = {} }) => {
  return (
    <MainLayout>
      <div className='container-fluid p-0'>
        <Breadcrumb paths={paths} />
        <div className='row'>
          <div className='col-lg-3 col-md-2 res-sticky-top-md'>
            <AccountSideBar user={user} />
          </div>
          <div className='col-lg-9 col-md-10'>{children}</div>
        </div>
      </div>
    </MainLayout>
  )
}
export default AccountLayout
