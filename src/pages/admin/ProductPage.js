import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminProductsTable from '../../components/table/AdminProductsTable'

const ProductPage = (props) => {
  const user = useSelector((state) => state.account.user)
  const [flag, toggleFlag] = useToggle(true)

  return (
    <AdminLayout user={user}>
      <div className='d-flex align-items-center mb-2'>
        <div className='position-relative d-inline-block me-2'>
          <button
            type='button'
            className={`btn ${
              flag ? 'btn-success' : 'btn-outline-success'
            } btn-lg ripple cus-tooltip`}
            onClick={() => toggleFlag(true)}
          >
            <i className='fas fa-check-circle'></i>
          </button>

          <small className='cus-tooltip-msg'>Liscensed products</small>
        </div>

        <div className='position-relative d-inline-block'>
          <button
            type='button'
            className={`btn ${
              !flag ? 'btn-danger' : 'btn-outline-danger'
            } btn-lg ripple cus-tooltip`}
            onClick={() => toggleFlag(false)}
          >
            <i className='fas fa-times-circle'></i>
          </button>

          <small className='cus-tooltip-msg'>Banned products</small>
        </div>
      </div>

      <AdminProductsTable isActive={flag} />
    </AdminLayout>
  )
}

export default ProductPage
