import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminSetting from '../../components/ui/AdminSetting'
import { useTranslation } from 'react-i18next'

const SettingPage = () => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)
  return (
    <AdminLayout user={user}>
      <AdminSetting heading={t('admin.setting')} />
    </AdminLayout>
  )
}

export default SettingPage
