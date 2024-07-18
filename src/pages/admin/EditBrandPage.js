import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminEditBrandForm from '../../components/item/form/AdminEditBrandForm'
import { useTranslation } from 'react-i18next'

const EditBrandPage = () => {
  const user = useSelector((state) => state.account.user)
  const { brandId } = useParams()
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.brand'), url: '/admin/brand' },
    {
      name: t('breadcrumbs.editBrand'),
      url: `/admin/brand/edit/${brandId}`
    }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <AdminEditBrandForm brandId={brandId} />
    </AdminLayout>
  )
}

export default EditBrandPage
