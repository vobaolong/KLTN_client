import Breadcrumb from '../ui/Breadcrumb'
import MainLayout from './MainLayout'
import AccountSideBar from './menu/AccountSideBar'

const AccountLayout = ({ user = {}, children = null, paths = {} }) => {
  return (
    <MainLayout>
      <div className='container-fluid p-0'>
        <div className='row'>
          <div className='col-lg-2 res-sticky-top-md'>
            <AccountSideBar user={user} />
          </div>
          <div className='col-lg-10 mt-4'>
            <Breadcrumb paths={paths} />
            {children}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
export default AccountLayout
