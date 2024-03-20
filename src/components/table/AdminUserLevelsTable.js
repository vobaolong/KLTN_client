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
import Error from '../ui/Error'
import Success from '../ui/Success'
import ConfirmDialog from '../ui/ConfirmDialog'
import ActiveLabel from '../label/ActiveLabel'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'

const AdminUserLevelsTable = ({ heading = 'User level' }) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirming1, setIsConfirming1] = useState(false)
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
    setIsConfirming1(true)
  }

  const onSubmitDelete = () => {
    setError('')
    setSuccess('')
    setIsLoading(true)
    deleteUserLevel(_id, accessToken, deletedLevel._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setSuccess(data.success)
          setRun(!run)
        }
        setIsLoading(false)
        setTimeout(() => {
          setSuccess('')
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
    setSuccess('')
    setIsLoading(true)
    restoreUserLevel(_id, accessToken, restoredLevel._id)
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
          title='Delete level'
          message={
            <span>
              Are you sure you want to delete{' '}
              <UserLevelLabel level={deletedLevel} />
            </span>
          }
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirming(false)}
        />
      )}
      {isConfirming1 && (
        <ConfirmDialog
          title='Restore level'
          message={
            <span>
              Are you sure you want to restore{' '}
              <UserLevelLabel level={restoredLevel} />
            </span>
          }
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
            <AdminCreateUserLevelItem onRun={() => setRun(!run)} />
          </div>
        </div>
        <ShowResult
          limit={filter.limit}
          size={pagination.size}
          pageCurrent={pagination.pageCurrent}
        />
      </div>

      <div className='table-scroll my-2'>
        <table className='table align-middle table-hover table-striped table-sm text-center'>
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
                {/* <td className='text-end'>
                  <small>{level.color}</small>
                </td> */}
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
                    className='btn btn-dark ripple me-2 rounded-1'
                    data-bs-toggle='modal'
                    data-bs-target='#edit-level-form'
                    onClick={() => handleEditLevel(level)}
                  >
                    <i class='fa-solid fa-pen'></i>
                    <span className='ms-2 res-hide'>Edit</span>
                  </button>

                  {!level.isDeleted ? (
                    <button
                      type='button'
                      className='btn btn-outline-danger ripple cus-tooltip rounded-1'
                      style={{ width: '95px' }}
                      onClick={() => handleDeleteLevel(level)}
                    >
                      <i className='fas fa-trash-alt'></i>
                      <span className='ms-2 res-hide'>
                        {t('button.delete')}
                      </span>
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='btn btn-outline-success ripple cus-tooltip'
                      style={{ width: '95px' }}
                      onClick={() => handleRestoreLevel(level)}
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

      <Modal id='edit-level-form' hasCloseBtn={false} title='Edit Level'>
        <AdminEditUserLevelForm
          oldLevel={editedLevel}
          onRun={() => setRun(!run)}
        />
      </Modal>

      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default AdminUserLevelsTable
