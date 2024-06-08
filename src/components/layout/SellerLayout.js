import { useState } from 'react'
import MainLayout from './MainLayout'
import SellerSideBar from './menu/SellerSideBar'
import Breadcrumb from '../ui/Breadcrumb'

const SellerLayout = ({
  user = {},
  store = {},
  children = null,
  paths = {}
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <MainLayout container='container-xxl' navFor='seller'>
      <div className='row'>
        <div
          className={`col-md-${isCollapsed ? '1' : '2'} res-sticky-top-md p-0`}
        >
          <SellerSideBar
            user={user}
            store={store}
            isCollapsed={isCollapsed}
            onToggle={toggleSidebar}
          />
        </div>
        <div className={`mt-4 col-md-${isCollapsed ? '10' : '9'}`}>
          <Breadcrumb paths={paths} />
          {children}
        </div>
      </div>
    </MainLayout>
  )
}
export default SellerLayout
