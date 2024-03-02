import { useSelector } from 'react-redux'
import VendorLayout from '../../components/layout/VendorLayout'
import VendorOrdersTable from '../../components/table/VendorOrdersTable'
import useToggle from '../../hooks/useToggle'

const OrdersPage = (props) => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)
  const [flag, toggleFlag] = useToggle(true)

  return (
    <VendorLayout user={user} store={store}>
      <div className='d-flex align-items-center mb-2'>
        <div className='position-relative d-inline-block me-2'>
          <button
            type='button'
            className={`btn ${
              flag ? 'btn-primary' : 'btn-outline-primary'
            } btn-lg ripple cus-tooltip`}
            onClick={() => toggleFlag(true)}
          >
            <i className='fas fa-clipboard'></i>
          </button>

          <small className='cus-tooltip-msg'>Processing Orders</small>
        </div>

        <div className='position-relative d-inline-block'>
          <button
            type='button'
            className={`btn ${
              !flag ? 'btn-success' : 'btn-outline-success'
            } btn-lg ripple cus-tooltip`}
            onClick={() => toggleFlag(false)}
          >
            <i className='fas fa-clipboard-check'></i>
          </button>

          <small className='cus-tooltip-msg'>Processed Orders</small>
        </div>
      </div>

      <VendorOrdersTable
        heading={true}
        storeId={store._id}
        isEditable={flag}
        status={
          flag ? 'Not processed|Processing|Shipped' : 'Delivered|Cancelled'
        }
      />
    </VendorLayout>
  )
}

export default OrdersPage
