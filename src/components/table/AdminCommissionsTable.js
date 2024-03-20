import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import {
  listCommissions,
  deleteCommission,
  restoreCommission
} from '../../apis/commission'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import SortByButton from './sub/SortByButton'
import StoreCommissionLabel from '../label/StoreCommissionLabel'
import DeletedLabel from '../label/DeletedLabel'
import ActiveLabel from '../label/ActiveLabel'
import AdminCreateCommissionItem from '../item/AdminCreateCommissionItem'
import AdminEditCommissionForm from '../item/form/AdminEditCommissionForm'
import Modal from '../ui/Modal'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import Success from '../ui/Success'
import ConfirmDialog from '../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'

const AdminCommissionTable = ({ heading = 'Commissions' }) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirming1, setIsConfirming1] = useState(false)
  const [run, setRun] = useState(false)

  const [editedCommission, setEditedCommission] = useState({})
  const [deletedCommission, setDeletedCommission] = useState({})
  const [restoredCommission, setRestoredCommission] = useState({})

  const [commissions, setCommissions] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'name',
    order: 'asc',
    limit: 10,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setError('')
    setIsLoading(true)
    listCommissions(_id, accessToken, filter)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setCommissions(data.commissions)
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

  const handleEditCommission = (commission) => {
    setEditedCommission(commission)
  }

  const handleDeleteCommission = (commission) => {
    setDeletedCommission(commission)
    setIsConfirming(true)
  }

  const handleRestoreCommission = (commission) => {
    setRestoredCommission(commission)
    setIsConfirming1(true)
  }

  const onSubmitDelete = () => {
    setError('')
    setSuccess('')
    setIsLoading(true)
    deleteCommission(_id, accessToken, deletedCommission._id)
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
    restoreCommission(_id, accessToken, restoredCommission._id)
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
          title={t('commisDetail.del')}
          // message={
          //   <span>
          //     Are you sure you want to delete{' '}
          //     <StoreCommissionLabel commission={deletedCommission} />
          //   </span>
          // }
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirming(false)}
        />
      )}
      {isConfirming1 && (
        <ConfirmDialog
          title='Restore commission'
          // message={
          //   <span>
          //     Are you sure you want to restore{' '}
          //     <StoreCommissionLabel commission={restoredCommission} />
          //   </span>
          // }
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
            <AdminCreateCommissionItem onRun={() => setRun(!run)} />
          </div>
        </div>
        <ShowResult
          limit={filter.limit}
          size={pagination.size}
          pageCurrent={pagination.pageCurrent}
        />
      </div>

      <div className='table-scroll my-2'>
        <table className='table table-hover table-striped table-sm align-middle text-center'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Commission'
                  sortBy='name'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title={t('commisDetail.cost')}
                  sortBy='cost'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <span style={{ fontWeight: '400', fontSize: '.875rem' }}>
                  {t('commisDetail.description')}
                </span>
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
                <span style={{ fontWeight: '400', fontSize: '.875rem' }}>
                  {t('action')}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((commission, index) => (
              <tr key={index}>
                <th scope='row'>
                  {index + 1 + (filter.page - 1) * filter.limit}
                </th>
                <td>
                  <StoreCommissionLabel commission={commission} />
                </td>
                <td>
                  <small>{commission.cost?.$numberDecimal}%</small>
                </td>
                <td
                  style={{
                    width: '300px',
                    overflow: 'auto'
                  }}
                  className='text-start'
                >
                  <small>{commission.description}</small>
                </td>
                <td>
                  {commission.isDeleted ? (
                    <span>
                      <DeletedLabel />
                    </span>
                  ) : (
                    <span>
                      <ActiveLabel />
                    </span>
                  )}
                </td>
                <td className='py-1'>
                  <button
                    type='button'
                    className='btn btn-dark ripple me-2 rounded-1'
                    data-bs-toggle='modal'
                    data-bs-target='#edit-commission-form'
                    onClick={() => handleEditCommission(commission)}
                  >
                    <i class='fa-solid fa-pen'></i>
                    <span className='ms-2 res-hide'>{t('button.edit')}</span>
                  </button>

                  {!commission.isDeleted ? (
                    <button
                      type='button'
                      className='btn btn-outline-danger ripple rounded-1'
                      onClick={() => handleDeleteCommission(commission)}
                    >
                      <i className='fas fa-trash-alt'></i>
                      <span className='ms-2 res-hide'>
                        {t('button.delete')}
                      </span>
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='btn btn-outline-success ripple'
                      onClick={() => handleRestoreCommission(commission)}
                    >
                      <i class='fa-solid fa-trash-can-arrow-up'></i>
                      <span className='ms-2 res-hide'>Restore</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        id='edit-commission-form'
        hasCloseBtn={false}
        title={t('commisDetail.edit')}
      >
        <AdminEditCommissionForm
          oldCommission={editedCommission}
          onRun={() => setRun(!run)}
        />
      </Modal>

      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default AdminCommissionTable
