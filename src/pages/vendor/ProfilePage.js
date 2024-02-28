import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useUpdateDispatch from '../../hooks/useUpdateDispatch'
import VendorLayout from '../../components/layout/VendorLayout'
import Cover from '../../components/image/Cover'
import Avatar from '../../components/image/Avatar'
import Carousel from '../../components/image/Carousel'
import OpenCloseStoreButton from '../../components/button/OpenCloseStoreButton'
import StoreAddFeaturedImageItem from '../../components/item/StoreAddFeaturedImageItem'
import StoreStatusLabel from '../../components/label/StoreStatusLabel'
import StoreLevelInfo from '../../components/info/StoreLevelInfo'
import StoreJoinedInfo from '../../components/info/StoreJoinedInfo'
import StoreProfileInfo from '../../components/info/StoreProfileInfo'

const ProfilePage = (props) => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)
  const [updateDispatch] = useUpdateDispatch()

  const onHandleRun = (newStore) => {
    updateDispatch('vendor', newStore)
  }
  return (
    <VendorLayout user={user} store={store}>
      <div className='res-mx--12-md'>
        <div className='position-relative px-2'>
          <Cover
            cover={store.cover}
            alt={store.name}
            isEditable='store'
            storeId={store._id}
          />

          <div className='avatar-absolute avatar-absolute--store'>
            <Avatar
              avatar={store.avatar}
              alt={store.name}
              name={
                <span className='d-inline-flex justify-content-center align-items-center'>
                  {store.name}
                  <small className='ms-2'>
                    <StoreStatusLabel isOpen={store.isOpen} />
                  </small>
                </span>
              }
              borderName={true}
              isEditable='store'
              storeId={store._id}
            />
          </div>

          <div className='level-group-absolute res-hide'>
            <StoreLevelInfo store={store} />
          </div>
        </div>

        {store.featured_images && store.featured_images.length > 0 && (
          <div className='m-2'>
            <Carousel
              listImages={store.featured_images}
              alt={store.name}
              isEditable='store'
              storeId={store._id}
            />
          </div>
        )}

        <div className='d-flex justify-content-between align-items-center m-2 mb-4'>
          <div className='d-flex justify-content-between align-items-start'>
            <div className='position-relative me-2'>
              <div className='cus-tooltip'>
                <OpenCloseStoreButton
                  storeId={store._id}
                  isOpen={store.isOpen}
                  className='btn-sm px-4'
                  onRun={(store) => onHandleRun(store)}
                />
              </div>
              <small className='cus-tooltip-msg'>
                {store.isOpen ? 'Click to close store' : 'Click to open store'}
              </small>
            </div>

            <StoreAddFeaturedImageItem
              count={store.featured_images && store.featured_images.length}
              storeId={store._id}
            />
          </div>

          <Link
            className='btn btn-outline-primary ripple btn-sm'
            to={`/store/${store._id}`}
            target='_blank'
          >
            <span className='me-2 res-hide'>Visit Your Store</span>
            <i className='fas fa-external-link-alt'></i>
          </Link>
        </div>

        <div className='mt-1 d-none res-dis'>
          <StoreLevelInfo store={store} border={false} />
        </div>

        <div className='mt-1'>
          <StoreProfileInfo store={store} isEditable={true} />
        </div>

        <div className='mt-1'>
          <StoreJoinedInfo store={store} />
        </div>
      </div>
    </VendorLayout>
  )
}

export default ProfilePage
