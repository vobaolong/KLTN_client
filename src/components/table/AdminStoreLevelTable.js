/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import {
  listStoreLevels,
  deleteStoreLevel,
  restoreStoreLevel
} from '../../apis/level'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import SortByButton from './sub/SortByButton'
import StoreLevelLabel from '../label/StoreLevelLabel'
import DeletedLabel from '../label/DeletedLabel'
import AdminCreateStoreLevelItem from '../item/AdminCreateStoreLevelItem'
import AdminEditStoreLevelForm from '../item/form/AdminEditStoreLevelForm'
import Modal from '../ui/Modal'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import ActiveLabel from '../label/ActiveLabel'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import { toast } from 'react-toastify'

const AdminStoreLevelsTable = ({ heading = '' }) => {
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
    sortBy: 'name',
    order: 'asc',
    limit: 6,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setIsLoading(true)
    listStoreLevels(_id, accessToken, filter)
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
        toast.error(error)
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
    deleteStoreLevel(_id, accessToken, deletedLevel._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.level.delete'))
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Something went wrong')
        setIsLoading(false)
      })
  }

  const onSubmitRestore = () => {
    setIsLoading(true)
    restoreStoreLevel(_id, accessToken, restoredLevel._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(toast.success(t('toastSuccess.level.restore')))
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Something went wrong')
        setIsLoading(false)
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
              <StoreLevelLabel level={deletedLevel} />
            </span>
          }
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirming(false)}
        />
      )}
      {isConfirmingRestore && (
        <ConfirmDialog
          title='Restore level'
          message={
            <span>
              Are you sure you want to restore{' '}
              <StoreLevelLabel level={restoredLevel} />
            </span>
          }
          onSubmit={onSubmitRestore}
          onClose={() => setIsConfirmingRestore(false)}
        />
      )}

      {heading && <h4 className='text-center text-uppercase'>{heading}</h4>}
      {isLoading && <Loading />}
      <div className='d-flex justify-content-between align-items-end'>
        <div className='option-wrap d-flex align-items-center'>
          <SearchInput onChange={handleChangeKeyword} />
          <div className='ms-2'>
            <AdminCreateStoreLevelItem onRun={() => setRun(!run)} />
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
                  title='Store Level'
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
              {/* <th scope='col' className='text-end pe-2'>
                <span
                  style={{ fontWeight: '400', fontSize: '.875rem' }}

                >
                  Color
                </span>
              </th> */}
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
                {/* <span
                  style={{ fontWeight: '400', fontSize: '.875rem' }}
                  className='text-secondary'
                >
                  {t('action')}
                </span> */}
              </th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {levels.map((level, index) => (
              <tr key={index}>
                <th scope='row'>
                  {index + 1 + (filter.page - 1) * filter.limit}
                </th>
                <td>
                  <small>
                    <StoreLevelLabel level={level} />
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
                <td>
                  <button
                    type='button'
                    className='btn btn-primary ripple me-2 rounded-1'
                    data-bs-toggle='modal'
                    data-bs-target='#edit-level-form'
                    onClick={() => handleEditLevel(level)}
                  >
                    <i className='fa-solid fa-pen'></i>
                    <span className='ms-2 res-hide'>{t('button.edit')}</span>
                  </button>

                  {!level.isDeleted ? (
                    <button
                      type='button'
                      className='btn btn-outline-danger ripple rounded-1'
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
                      className='btn btn-outline-success ripple'
                      style={{ width: '95px' }}
                      onClick={() => handleRestoreLevel(level)}
                    >
                      <i className='fa-solid fa-trash-can-arrow-up'></i>
                      <span className='ms-2 res-hide'>
                        {t('button.restore')}
                      </span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        id='edit-level-form'
        hasCloseBtn={false}
        title={t('levelDetail.edit')}
      >
        <AdminEditStoreLevelForm
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

export default AdminStoreLevelsTable
