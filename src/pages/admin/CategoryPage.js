import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminCategoriesTable from '../../components/table/AdminCategoriesTable'
import { useTranslation } from 'react-i18next'

const CategoryPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.category'), url: '/admin/category' }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <AdminCategoriesTable />
    </AdminLayout>
  )
}

export default CategoryPage
