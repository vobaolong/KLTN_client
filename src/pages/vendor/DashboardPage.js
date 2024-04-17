import { useSelector } from 'react-redux'
import VendorLayout from '../../components/layout/VendorLayout'
import ListStatisticsItems from '../../components/chart/ListStatisticsItems'
import { useTranslation } from 'react-i18next'

const DashboardPage = () => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)
  const { t } = useTranslation()

  const paths = [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('breadcrumbs.myStore'), url: '/account/store' },
    { name: t('breadcrumbs.overview'), url: `/vendor/${store._id}` }
  ]
  return (
    <VendorLayout user={user} store={store} paths={paths}>
      <ListStatisticsItems by='vendor' storeId={store._id} />
    </VendorLayout>
  )
}

export default DashboardPage
