/* eslint-disable react-hooks/exhaustive-deps */
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
import ConfirmDialog from '../ui/ConfirmDialog'
import ActiveLabel from '../label/ActiveLabel'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import { formatPrice } from '../../helper/formatPrice'
import { toast } from 'react-toastify'
import { humanReadableDate } from '../../helper/humanReadable'
import Error from '../ui/Error'

const AdminDeliveriesTable = ({ heading = false }) => {
  const { t } = useTranslation()
  const [run, setRun] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false)
  const [editedDelivery, setEditedDelivery] = useState({})
  const [deletedDelivery, setDeletedDelivery] = useState({})
  const [restoredDelivery, setRestoredDelivery] = useState({})
  const [deliveries, setDeliveries] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'fee',
    order: 'asc',
    limit: 8,
    page: 1
  })

  const { _id, accessToken } = getToken()

  useEffect(() => {
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
        setError(`Error occurred: ${error.message}`)
        setIsLoading(false)
      })
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
    setIsConfirmingRestore(true)
  }

  const onSubmitDelete = () => {
    setIsLoading(true)
    deleteDelivery(_id, accessToken, deletedDelivery._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.deliveryUnit.delete'))
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError(`Error occurred: ${error.message}`)
        setIsLoading(false)
      })
  }

  const onSubmitRestore = () => {
    setIsLoading(true)
    restoreDelivery(_id, accessToken, restoredDelivery._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.deliveryUnit.restore'))
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError(`Error occurred: ${error.message}`)
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.deleteDelivery')}
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirming(false)}
          message={t('message.delete')}
        />
      )}
      {isConfirmingRestore && (
        <ConfirmDialog
          title={t('dialog.restoreDelivery')}
          onSubmit={onSubmitRestore}
          onClose={() => setIsConfirmingRestore(false)}
          message={t('message.restore')}
        />
      )}
      {heading && (
        <h5 className='text-start'>{t('deliveryDetail.deliveryUnit')}</h5>
      )}
      {isLoading && <Loading />}

      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className=' d-flex align-items-center justify-content-between mb-3'>
          <SearchInput onChange={handleChangeKeyword} />
          <AdminCreateDeliveryItem onRun={() => setRun(!run)} />
        </div>

        <div className='table-scroll my-2'>
          <table className='table align-middle table-hover table-sm text-start'>
            <thead>
              <tr>
                <th scope='col' className='text-center'>
                  #
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('deliveryDetail.name')}
                    sortBy='name'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col' className='text-end'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('deliveryDetail.fee')}
                    sortBy='price'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <span>{t('deliveryDetail.description')}</span>
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('status.status')}
                    sortBy='isDeleted'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('createdAt')}
                    sortBy='createdAt'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery, index) => (
                <tr key={index}>
                  <th scope='row' className='text-center'>
                    {index + 1 + (filter.page - 1) * filter.limit}
                  </th>
                  <td>{delivery.name}</td>
                  <td className='text-end'>
                    {formatPrice(delivery.price?.$numberDecimal)}
                    <sup>₫</sup>
                  </td>
                  <td
                    className='lh-sm'
                    style={{
                      whiteSpace: 'normal'
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        overflow: 'auto',
                        textAlign: 'justify'
                      }}
                    >
                      {delivery.description}
                    </div>
                  </td>
                  <td>
                    {delivery.isDeleted ? <DeletedLabel /> : <ActiveLabel />}
                  </td>
                  <td>{humanReadableDate(delivery.createdAt)}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-sm btn-outline-primary ripple me-2 rounded-1 my-1'
                      data-bs-toggle='modal'
                      data-bs-target='#edit-delivery-form'
                      onClick={() => handleEditCommission(delivery)}
                      title={t('button.edit')}
                    >
                      <i className='d-none res-dis-sm fa-duotone fa-pen-to-square'></i>
                      <span className='res-hide'>{t('button.edit')}</span>
                    </button>

                    {!delivery.isDeleted ? (
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-danger rounded-1'
                        onClick={() => handleDeleteCommission(delivery)}
                        title={t('button.delete')}
                      >
                        <i className='d-none res-dis-sm fa-solid fa-trash-alt'></i>
                        <span className='res-hide'>{t('button.delete')}</span>
                      </button>
                    ) : (
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-success ripple'
                        onClick={() => handleRestoreCommission(delivery)}
                        title={t('button.restore')}
                      >
                        <i className='d-none res-dis-sm fa-solid fa-trash-can-arrow-up'></i>
                        <span className='res-hide'>{t('button.restore')}</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          id='edit-delivery-form'
          hasCloseBtn={false}
          title={t('deliveryDetail.edit')}
        >
          <AdminEditDeliveryForm
            oldDelivery={editedDelivery}
            onRun={() => setRun(!run)}
          />
        </Modal>
        <div className='d-flex justify-content-between align-items-center px-4'>
          <ShowResult
            limit={filter.limit}
            size={pagination.size}
            pageCurrent={pagination.pageCurrent}
          />
          {pagination.size !== 0 && (
            <Pagination
              pagination={pagination}
              onChangePage={handleChangePage}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDeliveriesTable
