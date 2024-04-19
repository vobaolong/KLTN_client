import { useState } from 'react'
import MainLayout from './MainLayout'
import VendorSideBar from './menu/VendorSideBar'
import Breadcrumb from '../ui/Breadcrumb'

const VendorLayout = ({
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
    <MainLayout container='container-xxl' navFor='vendor'>
      <div className='row'>
        <div
          className={`col-md-${isCollapsed ? '1' : '2'} res-sticky-top-md p-0`}
        >
          <VendorSideBar
            user={user}
            store={store}
            isCollapsed={isCollapsed}
            onToggle={toggleSidebar}
          />
        </div>
        <div className={`col-md-${isCollapsed ? '11' : '10'}`}>
          <Breadcrumb paths={paths} />
          {children}
        </div>
      </div>
    </MainLayout>
  )
}
export default VendorLayout
