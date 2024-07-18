import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'

import { useTranslation } from 'react-i18next'
import AdminBrandsTable from '../../components/table/AdminBrandsTable'

const BrandPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.brand'), url: '/admin/brand' }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <AdminBrandsTable />
    </AdminLayout>
  )
}

export default BrandPage
