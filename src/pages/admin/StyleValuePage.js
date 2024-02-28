import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import StyleValuesTable from '../../components/table/StyleValuesTable'

const StyleValuesPage = (props) => {
  const user = useSelector((state) => state.account.user)
  const { styleId } = useParams()
  return (
    <AdminLayout user={user}>
      <StyleValuesTable styleId={styleId} />
      <div className='mt-4'>
        <Link to='/admin/style' className='text-decoration-none cus-link-hover'>
          <i className='fas fa-arrow-circle-left'></i> Back to Style Manager
        </Link>
      </div>
    </AdminLayout>
  )
}

export default StyleValuesPage
