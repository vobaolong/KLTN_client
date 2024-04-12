/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import {
  listUserLevels,
  deleteUserLevel,
  restoreUserLevel
} from '../../apis/level'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import SortByButton from './sub/SortByButton'
import UserLevelLabel from '../label/UserLevelLabel'
import DeletedLabel from '../label/DeletedLabel'
import AdminCreateUserLevelItem from '../item/AdminCreateUserLevelItem'
import AdminEditUserLevelForm from '../item/form/AdminEditUserLevelForm'
import Modal from '../ui/Modal'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import ActiveLabel from '../label/ActiveLabel'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import { toast } from 'react-toastify'

const AdminUserLevelsTable = ({ heading = '' }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false)
  const [run, setRun] = useState(false)
  const [editedLevel, setEditedLevel] = useState({})
  const [deletedLevel, setDeletedLevel] = useState({})
  const [restoredLevel, setRestoredLevel] = useState({})
  const [levels, setLevels] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'point',
    order: 'asc',
    limit: 6,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setIsLoading(true)
    listUserLevels(_id, accessToken, filter)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          setLevels(data.levels)
          setPagination({
            size: data.size,
            pageCurrent: data.filter.pageCurrent,
            pageCount: data.filter.pageCount
          })
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Something went wrong')
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

  const handleEditLevel = (level) => {
    setEditedLevel(level)
  }

  const handleDeleteLevel = (level) => {
    setDeletedLevel(level)
    setIsConfirming(true)
  }

  const handleRestoreLevel = (level) => {
    setRestoredLevel(level)
    setIsConfirmingRestore(true)
  }

  const onSubmitDelete = () => {
    setIsLoading(true)
    deleteUserLevel(_id, accessToken, deletedLevel._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.level.delete'))
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
    restoreUserLevel(_id, accessToken, restoredLevel._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.level.restore'))
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
          title={t('levelDetail.delete')}
          message={
            <span>
              {t('message.delete')}
              <UserLevelLabel level={deletedLevel} />
            </span>
          }
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirming(false)}
        />
      )}
      {isConfirmingRestore && (
        <ConfirmDialog
          title={t('levelDetail.restore')}
          message={
            <span>
              {t('message.restore')}
              <UserLevelLabel level={restoredLevel} />
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
          <AdminCreateUserLevelItem onRun={() => setRun(!run)} />
        </div>

        <div className='table-scroll my-2'>
          <table className='table align-middle table-hover table-sm text-center'>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title='User level'
                    sortBy='name'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title='Floor point'
                    sortBy='minPoint'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title='Discount'
                    sortBy='discount'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
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
                  <span style={{ fontWeight: '400', fontSize: '.875rem' }}>
                    {t('action')}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {levels.map((level, index) => (
                <tr key={index}>
                  <th scope='row'>
                    {index + 1 + (filter.page - 1) * filter.limit}
                  </th>
                  <td>
                    <small>
                      <UserLevelLabel level={level} />
                    </small>
                  </td>
                  <td>
                    <small>{level.minPoint}</small>
                  </td>
                  <td>
                    <small>
                      {level.discount && level.discount.$numberDecimal}%
                    </small>
                  </td>
                  <td>
                    {level.isDeleted ? (
                      <span>
                        <DeletedLabel />
                      </span>
                    ) : (
                      <span>
                        <ActiveLabel />
                      </span>
                    )}
                  </td>
                  <td className='text-center'>
                    <button
                      type='button'
                      className='btn btn-sm btn-primary ripple me-2 rounded-1 my-1'
                      data-bs-toggle='modal'
                      data-bs-target='#edit-level-form'
                      onClick={() => handleEditLevel(level)}
                      title={t('button.edit')}
                    >
                      <i className='fa-solid fa-pen'></i>
                    </button>

                    {!level.isDeleted ? (
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-danger ripple cus-tooltip rounded-1 my-1'
                        onClick={() => handleDeleteLevel(level)}
                        title={t('button.delete')}
                      >
                        <i className='fa-solid fa-trash-alt'></i>
                      </button>
                    ) : (
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-success ripple cus-tooltip'
                        onClick={() => handleRestoreLevel(level)}
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

        <Modal id='edit-level-form' hasCloseBtn={false} title='Edit Level'>
          <AdminEditUserLevelForm
            oldLevel={editedLevel}
            onRun={() => setRun(!run)}
          />
        </Modal>
        <div className='d-flex align-items-center justify-content-between px-3'>
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

export default AdminUserLevelsTable
