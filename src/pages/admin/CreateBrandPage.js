import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminCreateBrandForm from '../../components/item/form/AdminCreateBrandForm'
import { useTranslation } from 'react-i18next'

const CreateBrandPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.brand'), url: '/admin/brand' },
    { name: t('breadcrumbs.addBrand'), url: '/admin/brand/create' }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <AdminCreateBrandForm />
    </AdminLayout>
  )
}

export default CreateBrandPage
