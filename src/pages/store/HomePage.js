import { useSelector } from 'react-redux'
import StoreLayout from '../../components/layout/StoreLayout'
import Carousel from '../../components/image/Carousel'
import ListProductsByStore from '../../components/list/ListProductsByStore'
import Error from '../../components/ui/Error'
import MainLayout from '../../components/layout/MainLayout'

const HomePage = (props) => {
  const store = useSelector((state) => state.store.store)
  return typeof store.isActive === 'boolean' && !store.isActive ? (
    <MainLayout>
      <Error msg='This store is banned by Zenpii!' />
    </MainLayout>
  ) : (
    <StoreLayout store={store}>
      <div className='store-home-page'>
        <div className='mb-4'>
          <Carousel listImages={store.featured_images} alt={store.name} />
        </div>

        <div className='mb-4'>
          <ListProductsByStore storeId={store._id} />
        </div>

        <div className='mb-4'>
          <ListProductsByStore
            heading='New products'
            storeId={store._id}
            sortBy='createdAt'
          />
        </div>
      </div>
    </StoreLayout>
  )
}

export default HomePage
