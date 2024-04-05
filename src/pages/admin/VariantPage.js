import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminVariantsTable from '../../components/table/AdminVariantsTable'
import { useTranslation } from 'react-i18next'

const VariantPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  return (
    <AdminLayout user={user}>
      <AdminVariantsTable heading={t('title.productVariants')} />
    </AdminLayout>
  )
}

export default VariantPage
