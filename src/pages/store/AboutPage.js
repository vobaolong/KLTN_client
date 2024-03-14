import { useSelector } from 'react-redux'
import StoreLayout from '../../components/layout/StoreLayout'
import StoreProfileInfo from '../../components/info/StoreProfileInfo'
import StoreJoinedInfo from '../../components/info/StoreJoinedInfo'
import StoreLevelInfo from '../../components/info/StoreLevelInfo'
import MainLayout from '../../components/layout/MainLayout'
import Error from '../../components/ui/Error'

const AboutPage = (props) => {
  const store = useSelector((state) => state.store.store)
  return typeof store.isActive === 'boolean' && !store.isActive ? (
    <MainLayout>
      <Error msg='This store is banned by Zenpii!' />
    </MainLayout>
  ) : (
    <StoreLayout store={store}>
      <div style={{ margin: '0 auto' }}>
        <div className='mb-1 d-none res-dis'>
          <StoreLevelInfo store={store} border={false} />
        </div>
        <div className='mb-1'>
          <StoreProfileInfo store={store} />
        </div>

        <div className='mb-1'>
          <StoreJoinedInfo store={store} />
        </div>
      </div>
    </StoreLayout>
  )
}

export default AboutPage
