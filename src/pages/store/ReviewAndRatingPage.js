import { useSelector } from 'react-redux'
import StoreLayout from '../../components/layout/StoreLayout'
import MainLayout from '../../components/layout/MainLayout'
import Error from '../../components/ui/Error'
import ListReviews from '../../components/list/ListReviews'
import { useTranslation } from 'react-i18next'

const ReviewAndRatingPage = () => {
  const store = useSelector((state) => state.store.store)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: `${store.name}`, url: `/store/${store._id}` },
    { name: t('breadcrumbs.rating'), url: `/store/rating/${store._id}` }
  ]
  return typeof store.isActive === 'boolean' && !store.isActive ? (
    <MainLayout>
      <Error msg={t('toastError.storeBanned')} />
    </MainLayout>
  ) : (
    <StoreLayout store={store} paths={paths}>
      <div style={{ margin: '0 auto' }}>
        <div className='mt-4'>
          <ListReviews storeId={store._id} />
        </div>
      </div>
    </StoreLayout>
  )
}

export default ReviewAndRatingPage
