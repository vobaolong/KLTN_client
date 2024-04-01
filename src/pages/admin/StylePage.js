import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminStylesTable from '../../components/table/AdminStylesTable'
import { useTranslation } from 'react-i18next'

const StylePage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  return (
    <AdminLayout user={user}>
      <AdminStylesTable heading={t('title.productVariants')} />
    </AdminLayout>
  )
}

export default StylePage
