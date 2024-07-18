import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminCreateVariantForm from '../../components/item/form/AdminCreateVariantForm'
import { useTranslation } from 'react-i18next'

const CreateVariantPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.variant'), url: '/admin/variant' },
    { name: t('breadcrumbs.addVariant'), url: '/admin/variant/create' }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <AdminCreateVariantForm />
    </AdminLayout>
  )
}

export default CreateVariantPage
