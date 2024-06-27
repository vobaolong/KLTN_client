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
import LevelLabel from '../label/LevelLabel'
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
import { humanReadableDate } from '../../helper/humanReadable'
import Error from '../ui/Error'
import boxImg from '../../assets/box.svg'

const AdminUserLevelsTable = ({ heading = false }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [run, setRun] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false)
  const [editedLevel, setEditedLevel] = useState({})
  const [deletedLevel, setDeletedLevel] = useState({})
  const [restoredLevel, setRestoredLevel] = useState({})
  const [levels, setLevels] = useState([])
  const { _id, accessToken } = getToken()

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

  useEffect(() => {
    setError('')
    setIsLoading(true)
    listUserLevels(_id, accessToken, filter)
      .then((data) => {
        if (data.error) setError(data.error)
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
        setError('Server Error')
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

  const handleEditLevel = (level) => {
    setEditedLevel(level)
  }

  const handleDeleteLevel = (level) => {
    setDeletedLevel(level)
    setIsConfirmingDelete(true)
  }

  const handleRestoreLevel = (level) => {
    setRestoredLevel(level)
    setIsConfirmingRestore(true)
  }

  const onSubmitDelete = () => {
    setError('')
    setIsLoading(true)
    deleteUserLevel(_id, accessToken, deletedLevel._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.level.delete'))
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
    restoreUserLevel(_id, accessToken, restoredLevel._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.level.restore'))
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
      {isConfirmingDelete && (
        <ConfirmDialog
          title={t('levelDetail.delete')}
          message={
            <span>
              {t('message.delete')}
              <LevelLabel level={deletedLevel} />
            </span>
          }
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirmingDelete(false)}
        />
      )}
      {isConfirmingRestore && (
        <ConfirmDialog
          title={t('levelDetail.restore')}
          message={
            <span>
              {t('message.restore')}
              <LevelLabel level={restoredLevel} />
            </span>
          }
          onSubmit={onSubmitRestore}
          onClose={() => setIsConfirmingRestore(false)}
        />
      )}

      {heading && (
        <h5 className='text-start'>{t('levelDetail.userLevel.userLevel')}</h5>
      )}
      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className=' d-flex align-items-center justify-content-between mb-3'>
          <SearchInput onChange={handleChangeKeyword} />
          <AdminCreateUserLevelItem onRun={() => setRun(!run)} />
        </div>
        {!isLoading && pagination.size === 0 ? (
          <div className='my-4 text-center'>
            <img className='mb-3' src={boxImg} alt='noItem' width={'100px'} />
            <h5>{t('levelDetail.none')}</h5>
          </div>
        ) : (
          <>
            <div className='table-scroll my-2'>
              <table className='table align-middle table-hover table-sm text-start'>
                <thead>
                  <tr>
                    <th scope='col' className='text-center'></th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('levelDetail.name')}
                        sortBy='name'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('levelDetail.floorPoint')}
                        sortBy='minPoint'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('levelDetail.discount')}
                        sortBy='discount'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('status.status')}
                        sortBy='isDeleted'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('levelDetail.createdAt')}
                        sortBy='createdAt'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>{t('action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {levels.map((level, index) => (
                    <tr key={index}>
                      <th scope='row' className='text-center'>
                        {index + 1 + (filter.page - 1) * filter.limit}
                      </th>
                      <td>
                        <LevelLabel level={level} />
                      </td>
                      <td>{level.minPoint}</td>
                      <td>
                        {level.discount && level.discount.$numberDecimal}%
                      </td>
                      <td>
                        {level.isDeleted ? <DeletedLabel /> : <ActiveLabel />}
                      </td>
                      <td>{humanReadableDate(level.createdAt)}</td>
                      <td>
                        <div className='position-relative d-inline-block'>
                          <button
                            type='button'
                            className='btn btn-sm btn-outline-primary ripple me-2 rounded-1 my-1 cus-tooltip'
                            data-bs-toggle='modal'
                            data-bs-target='#edit-level-form'
                            onClick={() => handleEditLevel(level)}
                            title={t('button.edit')}
                          >
                            <i className='fa-duotone fa-pen-to-square'></i>
                          </button>
                          <span className='cus-tooltip-msg'>
                            {t('button.edit')}
                          </span>
                        </div>
                        <div className='position-relative d-inline-block'>
                          {!level.isDeleted ? (
                            <button
                              type='button'
                              className='btn btn-sm btn-outline-danger ripple cus-tooltip rounded-1 my-1'
                              onClick={() => handleDeleteLevel(level)}
                            >
                              <i className='fa-solid fa-trash-alt'></i>
                            </button>
                          ) : (
                            <button
                              type='button'
                              className='btn btn-sm btn-outline-success ripple cus-tooltip rounded-1 my-1'
                              onClick={() => handleRestoreLevel(level)}
                            >
                              <i className='fa-solid fa-trash-can-arrow-up'></i>
                            </button>
                          )}
                          <span className='cus-tooltip-msg'>
                            {!level.isDeleted
                              ? t('button.delete')
                              : t('button.restore')}
                          </span>
                        </div>
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
          </>
        )}
      </div>
    </div>
  )
}

export default AdminUserLevelsTable
