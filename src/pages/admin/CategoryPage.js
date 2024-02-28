import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminCategoriesTable from '../../components/table/AdminCategoriesTable'
import CategorySelector from '../../components/selector/CategorySelector'

const CategoryPage = (props) => {
  const user = useSelector((state) => state.account.user)
  const [flag, toggleFlag] = useToggle(false)
  return (
    <AdminLayout user={user}>
      <div className='d-flex align-items-center mb-2'>
        <div className='position-relative d-inline-block me-2'>
          <button
            type='button'
            className={`btn ${
              flag ? 'btn-primary' : 'btn-outline-primary'
            } btn-lg ripple cus-tooltip`}
            onClick={() => toggleFlag()}
          >
            <i className='fas fa-eye'></i>
          </button>

          <small className='cus-tooltip-msg'>Review</small>
        </div>
      </div>

      {flag && (
        <div className='mb-4'>
          <h4 className='mb-3'>Review category tree</h4>
          <CategorySelector isActive={true} isSelected={false} />
        </div>
      )}

      <AdminCategoriesTable />
    </AdminLayout>
  )
}

export default CategoryPage
