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

const AdminCommissionTable = ({ heading = 'Commissions' }) => {
  const { t } = useTranslation()
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
    setIsLoading(true)
    listCommissions(_id, accessToken, filter)
      .then((data) => {
        if (data.error) toast.error(data.error)
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
        console.log('Some thing went wrong')
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
    setIsLoading(true)
    deleteCommission(_id, accessToken, deletedCommission._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.commission.delete'))
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Something went wrong')
        setIsLoading(false)
      })
  }

  const onSubmitRestore = () => {
    setIsLoading(true)
    restoreCommission(_id, accessToken, restoredCommission._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.commission.restore'))
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Something went wrong')
        setIsLoading(false)
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

      {heading && <h5 className='text-center text-uppercase'>{heading}</h5>}
      {isLoading && <Loading />}
      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className='option-wrap d-flex align-items-center justify-content-between'>
          <SearchInput onChange={handleChangeKeyword} />
          <AdminCreateCommissionItem onRun={() => setRun(!run)} />
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
                    sortBy='cost'
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
                      className='btn btn-sm btn-primary ripple me-2 rounded-1'
                      data-bs-toggle='modal'
                      data-bs-target='#edit-commission-form'
                      onClick={() => handleEditCommission(commission)}
                      title={t('button.edit')}
                    >
                      <i className='fa-solid fa-pen'></i>
                    </button>

                    {!commission.isDeleted ? (
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-danger ripple rounded-1'
                        onClick={() => handleDeleteCommission(commission)}
                        title={t('button.delete')}
                      >
                        <i className='fa-solid fa-trash-alt'></i>
                      </button>
                    ) : (
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-success ripple'
                        onClick={() => handleRestoreCommission(commission)}
                        title={t('button.restore')}
                      >
                        <i className='fa-solid fa-trash-can-arrow-up'></i>
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
