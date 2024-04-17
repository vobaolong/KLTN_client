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
import StoreProfileInfo from '../../components/info/StoreProfileInfo'
import { useTranslation } from 'react-i18next'
import StoreActiveLabel from '../../components/label/StoreActiveLabel'

const ProfilePage = () => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)
  const [updateDispatch] = useUpdateDispatch()
  const onHandleRun = (newStore) => {
    updateDispatch('vendor', newStore)
  }

  const paths = [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('breadcrumbs.myStore'), url: '/account/store' },
    { name: t('breadcrumbs.shopProfile'), url: `/vendor/profile/${store._id}` }
  ]

  return (
    <VendorLayout user={user} store={store} paths={paths}>
      <div className='res-mx--12-md'>
        <div className='position-relative bg-white p-2 rounded-2 shadow'>
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

          <div className='level-group-absolute res-hide bg-white w-50 h-100'>
            <StoreLevelInfo store={store} />
          </div>
        </div>

        {store.featured_images?.length > 0 && (
          <div className='my-2'>
            <Carousel
              listImages={store.featured_images}
              alt={store.name}
              isEditable='store'
              storeId={store._id}
              style={{ minHeight: 'auto' }}
            />
          </div>
        )}

        <div className='align-items-center bg-white border d-flex justify-content-between my-2 p-2 rounded-1'>
          <div className='d-flex justify-content-between align-items-start'>
            <StoreAddFeaturedImageItem
              count={store.featured_images?.length}
              storeId={store._id}
            />
            <div className='position-relative ms-2'>
              <div className='cus-tooltip'>
                <OpenCloseStoreButton
                  storeId={store._id}
                  isOpen={store.isOpen}
                  className='btn-sm px-4'
                  onRun={(store) => onHandleRun(store)}
                />
              </div>
              <small className='cus-tooltip-msg'>
                {store.isOpen
                  ? t('button.clickToClose')
                  : t('button.clickToOpen')}
              </small>
            </div>
            <div className='cus-tooltip ms-2 m-auto'>
              <StoreActiveLabel isActive={store.isActive} detail={true} />
            </div>
          </div>

          <Link
            className='btn btn-outline-primary ripple btn-sm'
            to={`/store/${store._id}`}
            target='_blank'
          >
            <span className='me-2'>{t('storeDetail.viewShop')}</span>
            <i className='fa-solid fa-desktop'></i>
          </Link>
        </div>

        <div className='mt-2 d-none res-dis'>
          <StoreLevelInfo store={store} />
        </div>

        <div className='mt-2'>
          <StoreProfileInfo store={store} isEditable={true} />
        </div>
      </div>
    </VendorLayout>
  )
}

export default ProfilePage
