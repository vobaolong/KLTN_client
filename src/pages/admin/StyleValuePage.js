import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import StyleValuesTable from '../../components/table/StyleValuesTable'
import { useTranslation } from 'react-i18next'

const StyleValuesPage = (props) => {
  const user = useSelector((state) => state.account.user)
  const { styleId } = useParams()
  const { t } = useTranslation()
  return (
    <AdminLayout user={user}>
      <StyleValuesTable styleId={styleId} />
      <div className='mt-4'>
        <Link to='/admin/style' className='text-decoration-none cus-link-hover'>
          <i className='fas fa-angle-left'></i> {t('button.back')}
        </Link>
      </div>
    </AdminLayout>
  )
}

export default StyleValuesPage
