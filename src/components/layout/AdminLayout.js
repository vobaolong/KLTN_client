import { useState } from 'react'
import MainLayout from './MainLayout'
import AdminSideBar from './menu/AdminSideBar'
import Breadcrumb from '../ui/Breadcrumb'

const AdminLayout = ({ user = {}, children = null, paths = {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <MainLayout container='container-xxl' navFor='admin'>
      <div className='row'>
        <div
          className={`col-md-${isCollapsed ? '1' : '2'} res-sticky-top-md p-0`}
        >
          <AdminSideBar
            user={user}
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

export default AdminLayout
