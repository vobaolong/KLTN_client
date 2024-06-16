/* eslint-disable react-hooks/exhaustive-deps */
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
import ConfirmDialog from '../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import { toast } from 'react-toastify'
import Error from '../ui/Error'
import { humanReadableDate } from '../../helper/humanReadable'

const AdminCommissionTable = ({ heading = false }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false)
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
    setIsConfirmingRestore(true)
  }

  const onSubmitDelete = () => {
    setError('')
    setIsLoading(true)
    deleteCommission(_id, accessToken, deletedCommission._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.commission.delete'))
          setRun(!run)
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
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
    setIsLoading(true)
    restoreCommission(_id, accessToken, restoredCommission._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.commission.restore'))
          setRun(!run)
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
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
          title={t('dialog.deleteCommission')}
          message={
            <span>
              {t('message.delete')}
              <StoreCommissionLabel commission={deletedCommission} />
            </span>
          }
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirming(false)}
        />
      )}
      {isConfirmingRestore && (
        <ConfirmDialog
          title={t('dialog.restoreCommission')}
          message={
            <span>
              {t('message.restore')}
              <StoreCommissionLabel commission={restoredCommission} />
            </span>
          }
          onSubmit={onSubmitRestore}
          onClose={() => setIsConfirmingRestore(false)}
        />
      )}

      {heading && <h5 className='text-start'>{t('admin.commissions')}</h5>}
      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className=' d-flex align-items-center justify-content-between mb-3'>
          <SearchInput onChange={handleChangeKeyword} />
          <AdminCreateCommissionItem onRun={() => setRun(!run)} />
        </div>

        <div className='table-scroll my-2'>
          <table className='table table-hover table-sm align-middle text-start'>
            <thead>
              <tr>
                <th scope='col' className='text-center'></th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('commissionDetail.name')}
                    sortBy='name'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('commissionDetail.fee')}
                    sortBy='fee'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <span style={{ fontWeight: '400', fontSize: '.875rem' }}>
                    {t('commissionDetail.description')}
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
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('createdAt')}
                    sortBy='createdAt'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <span style={{ fontWeight: '400', fontSize: '.9rem' }}>
                    {t('action')}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {commissions.map((commission, index) => (
                <tr key={index}>
                  <th scope='row' className='text-center'>
                    {index + 1 + (filter.page - 1) * filter.limit}
                  </th>
                  <td>
                    <span style={{ fontSize: '0.9rem' }}>
                      <StoreCommissionLabel commission={commission} />
                    </span>
                  </td>
                  <td>
                    <small>{commission.fee?.$numberDecimal}%</small>
                  </td>
                  <td
                    style={{
                      width: '300px',
                      overflow: 'auto'
                    }}
                  >
                    <small>{commission.description}</small>
                  </td>
                  <td>
                    {commission.isDeleted ? <DeletedLabel /> : <ActiveLabel />}
                  </td>
                  <td>
                    <small>{humanReadableDate(commission.createdAt)}</small>
                  </td>
                  <td className='py-1'>
                    <button
                      type='button'
                      className='btn btn-sm btn-outline-primary ripple me-2 rounded-1'
                      data-bs-toggle='modal'
                      data-bs-target='#edit-commission-form'
                      onClick={() => handleEditCommission(commission)}
                      title={t('button.edit')}
                    >
                      <i className='d-none res-dis-sm fa-duotone fa-pen-to-square'></i>
                      <span className='res-hide'>{t('button.edit')}</span>
                    </button>

                    {!commission.isDeleted ? (
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-danger ripple rounded-1'
                        onClick={() => handleDeleteCommission(commission)}
                        title={t('button.delete')}
                      >
                        <i className='d-none res-dis-sm fa-solid fa-trash-alt'></i>
                        <span className='res-hide'>{t('button.delete')}</span>
                      </button>
                    ) : (
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-success ripple'
                        onClick={() => handleRestoreCommission(commission)}
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
          id='edit-commission-form'
          hasCloseBtn={false}
          title={t('commissionDetail.edit')}
        >
          <AdminEditCommissionForm
            oldCommission={editedCommission}
            onRun={() => setRun(!run)}
          />
        </Modal>
        <div className='d-flex align-items-center justify-content-between px-4'>
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

export default AdminCommissionTable
