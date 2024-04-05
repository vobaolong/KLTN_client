import { useState } from 'react'
import MainLayout from './MainLayout'
import AdminSideBar from './menu/AdminSideBar'

const AdminLayout = ({ user = {}, children = null }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <MainLayout container='container-xxl' navFor='admin'>
      <div className='row'>
        <div
          className={`col-md-${
            isCollapsed ? '1' : '2'
          } res-sticky-top-md mb-4 p-0`}
        >
          <AdminSideBar
            user={user}
            isCollapsed={isCollapsed}
            onToggle={toggleSidebar}
          />
        </div>
        <div className={`col-md-${isCollapsed ? '11' : '10'}`}>{children}</div>
      </div>
    </MainLayout>
  )
}

export default AdminLayout
