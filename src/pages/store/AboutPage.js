import { useSelector } from 'react-redux'
import StoreLayout from '../../components/layout/StoreLayout'
import StoreProfileInfo from '../../components/info/StoreProfileInfo'
import StoreLevelInfo from '../../components/info/StoreLevelInfo'
import MainLayout from '../../components/layout/MainLayout'
import Error from '../../components/ui/Error'

const AboutPage = () => {
  const store = useSelector((state) => state.store.store)

  return typeof store.isActive === 'boolean' && !store.isActive ? (
    <MainLayout>
      <Error msg='This store is banned by Zenpii!' />
    </MainLayout>
  ) : (
    <StoreLayout store={store}>
      <div style={{ margin: '0 auto' }}>
        <div className='mb-1 d-none res-dis'>
          <StoreLevelInfo store={store} />
        </div>
        <div className='mb-1'>
          <StoreProfileInfo store={store} />
        </div>
      </div>
    </StoreLayout>
  )
}

export default AboutPage
