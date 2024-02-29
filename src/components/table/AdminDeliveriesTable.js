import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import {
  listDeliveries,
  deleteDelivery,
  restoreDelivery
} from '../../apis/delivery'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import SortByButton from './sub/SortByButton'
import DeletedLabel from '../label/DeletedLabel'
import AdminCreateDeliveryItem from '../item/AdminCreateDeliveryItem'
import AdminEditDeliveryForm from '../item/form/AdminEditDeliveryForm'
import Modal from '../ui/Modal'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import Success from '../ui/Success'
import ConfirmDialog from '../ui/ConfirmDialog'
import ActiveLabel from '../label/ActiveLabel'

const AdminDeliveriesTable = ({ heading = 'Delivery unit' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirming1, setIsConfirming1] = useState(false)
  const [run, setRun] = useState(false)

  const [editedDelivery, setEditedDelivery] = useState({})
  const [deletedDelivery, setDeletedDelivery] = useState({})
  const [restoredDelivery, setRestoredDelivery] = useState({})

  const [deliveries, setDeliveries] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'name',
    order: 'asc',
    limit: 6,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setError('')
    setIsLoading(true)
    listDeliveries(_id, accessToken, filter)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setDeliveries(data.deliveries)
          setPagination({
            size: data.size,
            pageCurrent: data.filter.pageCurrent,
            pageCount: data.filter.pageCount
          })
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [filter, run])

  const handleChangeKeyword = (keyword) => {
    setFilter({
      ...filter,
      search: keyword,
      page: 1
    })
  }

  const handleChangePage = (newPage) => {
    setFilter({
      ...filter,
      page: newPage
    })
  }

  const handleSetSortBy = (order, sortBy) => {
    setFilter({
      ...filter,
      sortBy,
      order
    })
  }

  const handleEditCommission = (delivery) => {
    setEditedDelivery(delivery)
  }

  const handleDeleteCommission = (delivery) => {
    setDeletedDelivery(delivery)
    setIsConfirming(true)
  }

  const handleRestoreCommission = (delivery) => {
    setRestoredDelivery(delivery)
    setIsConfirming1(true)
  }

  const onSubmitDelete = () => {
    setError('')
    setSuccess('')
    setIsLoading(true)
    deleteDelivery(_id, accessToken, deletedDelivery._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setSuccess(data.success)
          setRun(!run)
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
        }, 3000)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  const onSubmitRestore = () => {
    setError('')
    setSuccess('')
    setIsLoading(true)
    restoreDelivery(_id, accessToken, restoredDelivery._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setSuccess(data.success)
          setRun(!run)
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
        }, 3000)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Delete delivery'
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirming(false)}
        />
      )}
      {isConfirming1 && (
        <ConfirmDialog
          title='Restore delivery'
          onSubmit={onSubmitRestore}
          onClose={() => setIsConfirming1(false)}
        />
      )}

      {heading && <h4 className='text-center text-uppercase'>{heading}</h4>}

      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {success && <Success msg={success} />}

      <div className='d-flex justify-content-between align-items-end'>
        <div className='option-wrap d-flex align-items-center'>
          <SearchInput onChange={handleChangeKeyword} />
          <div className='ms-2'>
            <AdminCreateDeliveryItem onRun={() => setRun(!run)} />
          </div>
        </div>
        <span className='me-2 text-nowrap res-hide'>
          {pagination.size || 0} results
        </span>
      </div>

      <div className='table-scroll my-2'>
        <table className='table align-middle table-hover table-sm text-center'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Name'
                  sortBy='name'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col' className='text-end'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Price'
                  sortBy='price'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <span
                  style={{ fontWeight: '400', fontSize: '.875rem' }}
                  className='text-secondary'
                >
                  Delivery
                </span>
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Status'
                  sortBy='isDeleted'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>

              <th scope='col'>
                <span
                  style={{ fontWeight: '400', fontSize: '.875rem' }}
                  className='text-secondary'
                >
                  Action
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery, index) => (
              <tr key={index}>
                <th scope='row'>
                  {index + 1 + (filter.page - 1) * filter.limit}
                </th>
                <td className='text-start px-2' style={{ width: '150px' }}>
                  <small>{delivery.name}</small>
                </td>
                <td className='text-end px-2'>
                  <small>{delivery.price?.$numberDecimal} ₫</small>
                </td>
                <td
                  className='text-start p-2 lh-sm'
                  style={{
                    whiteSpace: 'normal',
                    width: '600px'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '70px',
                      overflow: 'auto',
                      textAlign: 'justify'
                    }}
                  >
                    <small>{delivery.description}</small>
                  </div>
                </td>
                <td>
                  {delivery.isDeleted ? (
                    <span>
                      <DeletedLabel />
                    </span>
                  ) : (
                    <span>
                      <ActiveLabel />
                    </span>
                  )}
                </td>
                <td>
                  <button
                    type='button'
                    className='btn btn-primary ripple me-2'
                    data-bs-toggle='modal'
                    data-bs-target='#edit-delivery-form'
                    onClick={() => handleEditCommission(delivery)}
                  >
                    <i className='fas fa-pen'></i>
                    <span className='ms-2 res-hide'>Edit</span>
                  </button>

                  {!delivery.isDeleted ? (
                    <button
                      type='button'
                      className='btn btn-outline-danger'
                      style={{ width: '95px' }}
                      onClick={() => handleDeleteCommission(delivery)}
                    >
                      <i className='fas fa-trash-alt'></i>
                      <span className='ms-2 res-hide'>Delete</span>
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='btn btn-outline-success ripple'
                      style={{ width: '95px' }}
                      onClick={() => handleRestoreCommission(delivery)}
                    >
                      <i className='fas fa-trash-restore-alt'></i>
                      <span className='ms-2 res-hide'>Restore</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal id='edit-delivery-form' hasCloseBtn={false} title='Edit delivery'>
        <AdminEditDeliveryForm
          oldDelivery={editedDelivery}
          onRun={() => setRun(!run)}
        />
      </Modal>

      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default AdminDeliveriesTable
