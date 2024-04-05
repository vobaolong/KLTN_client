import MainNav from './menu/MainNav'
import Footer from './menu/Footer'

const MainLayout = ({
  container = 'container-md',
  navFor = 'user',
  children = null
}) => (
  <div className='main-layout'>
    <MainNav navFor={navFor} />
    <main className={`body ${container}`}>{children}</main>
    {navFor !== 'admin' ? <Footer /> : <div className='mb-4'></div>}
  </div>
)

export default MainLayout
