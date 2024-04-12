import MainLayout from './MainLayout'
import AccountSideBar from './menu/AccountSideBar'

const AccountLayout = ({ user = {}, children = null }) => (
  <MainLayout>
    <div className='container-fluid p-0'>
      <div className='row'>
        <div className='col-lg-3 col-md-2 res-sticky-top-md pe-0'>
          <AccountSideBar user={user} />
        </div>
        <div className='col-lg-9 col-md-10 ps-0'>{children}</div>
      </div>
    </div>
  </MainLayout>
)

export default AccountLayout
