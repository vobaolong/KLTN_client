import MainNav from './menu/MainNav'
import Footer from './menu/Footer'

const MainLayout = ({
  container = 'container-md',
  navFor = 'user',
  children = null
}) => {
  return (
    <div className='main-layout'>
      <MainNav navFor={navFor} />
      <main className={`body ${container}`}>{children}</main>
      {navFor !== 'user' ? <div className='mb-4'></div> : <Footer />}
    </div>
  )
}
export default MainLayout
