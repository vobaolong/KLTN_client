import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import VariantValuesTable from '../../components/table/VariantValuesTable'
import { useTranslation } from 'react-i18next'

const VariantValuesPage = () => {
  const user = useSelector((state) => state.account.user)
  const { variantId } = useParams()
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.variant'), url: '/admin/variant' },
    { name: t('breadcrumbs.variantValues'), url: '/admin/variant/create' }
  ]

  return (
    <AdminLayout user={user} paths={paths}>
      <VariantValuesTable variantId={variantId} />
      <div className='mt-4'>
        <Link
          to='/admin/variant'
          className='text-decoration-none cus-link-hover'
        >
          <i className='fa-solid fa-angle-left'></i> {t('button.back')}
        </Link>
      </div>
    </AdminLayout>
  )
}

export default VariantValuesPage
