import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import TransactionsTable from '../../components/table/TransactionsTable'
import { useTranslation } from 'react-i18next'

const TransactionPage = () => {
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.transactions'), url: '/admin/transaction' }
  ]
  const user = useSelector((state) => state.account.user)
  return (
    <AdminLayout user={user} paths={paths}>
      <TransactionsTable />
    </AdminLayout>
  )
}

export default TransactionPage
