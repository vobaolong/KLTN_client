import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminEditVariantForm from '../../components/item/form/AdminEditVariantForm'
import { useTranslation } from 'react-i18next'

const EditVariantPage = () => {
  const user = useSelector((state) => state.account.user)
  const { variantId } = useParams()
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.variant'), url: '/admin/variant' },
    {
      name: t('breadcrumbs.editVariant'),
      url: `/admin/variant/edit/${variantId}`
    }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <AdminEditVariantForm variantId={variantId} />
    </AdminLayout>
  )
}

export default EditVariantPage
