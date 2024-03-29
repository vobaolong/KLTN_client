/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { listStyles, deleteStyle, restoreStyle } from '../../apis/style'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import SortByButton from './sub/SortByButton'
import DeletedLabel from '../label/DeletedLabel'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import CategorySmallCard from '../card/CategorySmallCard'
import ActiveLabel from '../label/ActiveLabel'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import { toast } from 'react-toastify'

const AdminStylesTable = ({ heading = '' }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirming1, setIsConfirming1] = useState(false)
  const [run, setRun] = useState(false)
  const [deletedStyle, setDeletedStyle] = useState({})
  const [restoredStyle, setRestoredStyle] = useState({})
  const [styles, setStyles] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'name',
    categoryId: '',
    order: 'asc',
    limit: 10,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setIsLoading(true)
    listStyles(_id, accessToken, filter)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          setStyles(data.styles)
          setPagination({
            size: data.size,
            pageCurrent: data.filter.pageCurrent,
            pageCount: data.filter.pageCount
          })
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
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

  const handleDelete = (style) => {
    setDeletedStyle(style)
    setIsConfirming(true)
  }

  const handleRestore = (style) => {
    setRestoredStyle(style)
    setIsConfirming1(true)
  }

  const onSubmitDelete = () => {
    setIsLoading(true)
    deleteStyle(_id, accessToken, deletedStyle._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('button.edit'))
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  const onSubmitRestore = () => {
    setIsLoading(true)
    restoreStyle(_id, accessToken, restoredStyle._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(data.success)
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('variantDetail.del')}
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirming(false)}
        />
      )}
      {isConfirming1 && (
        <ConfirmDialog
          title={t('variantDetail.res')}
          onSubmit={onSubmitRestore}
          onClose={() => setIsConfirming1(false)}
        />
      )}

      {heading && <h4 className='text-center text-uppercase'>{heading}</h4>}

      {isLoading && <Loading />}

      <div className='d-flex justify-content-between align-items-end'>
        <div className='option-wrap d-flex align-items-center'>
          <SearchInput onChange={handleChangeKeyword} />
          <div className='ms-2'>
            <Link
              type='button'
              className='btn btn-primary ripple text-nowrap rounded-1'
              to='/admin/style/createNewStyle'
            >
              <i className='fas fa-plus-circle'></i>
              <span className='ms-1 res-hide'>{t('variantDetail.add')}</span>
            </Link>
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
              <th scope='col' className='text-start'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title={t('variantDetail.name')}
                  sortBy='name'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col' className='text-start'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title={t('variantDetail.categories')}
                  sortBy='categoryIds '
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
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
            {styles.map((style, index) => (
              <tr key={index}>
                <th scope='row'>
                  {index + 1 + (filter.page - 1) * filter.limit}
                </th>
                <td className='text-start'>{style.name}</td>

                <td className='text-start ps-2' style={{ maxWidth: '1000px' }}>
                  <div
                    className=''
                    style={{
                      maxHeight: '200px',
                      overflow: 'auto'
                    }}
                  >
                    {style.categoryIds.map((category, index) => (
                      <div className='hidden-avatar' key={index}>
                        <CategorySmallCard category={category} />
                      </div>
                    ))}
                  </div>
                </td>

                <td>
                  {style.isDeleted ? (
                    <span>
                      <DeletedLabel />
                    </span>
                  ) : (
                    <span>
                      <ActiveLabel />
                    </span>
                  )}
                </td>

                <td className='text-nowrap py-1'>
                  <Link
                    type='button'
                    className='btn btn-secondary ripple me-2'
                    to={`/admin/style/values/${style._id}`}
                  >
                    <i className='fas fa-info-circle'></i>
                  </Link>

                  <Link
                    type='button'
                    className='btn btn-primary ripple me-2 rounded-1'
                    to={`/admin/style/editStyle/${style._id}`}
                  >
                    <i className='fa-solid fa-pen'></i>
                    <span className='ms-1 res-hide'>{t('button.edit')}</span>
                  </Link>

                  {!style.isDeleted ? (
                    <button
                      type='button'
                      className='btn btn-outline-danger ripple rounded-1'
                      style={{ width: '95px' }}
                      onClick={() => handleDelete(style)}
                    >
                      <i className='fas fa-trash-alt'></i>
                      <span className='ms-1 res-hide'>
                        {t('button.delete')}
                      </span>
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='btn btn-outline-success'
                      onClick={() => handleRestore(style)}
                    >
                      <i className='fa-solid fa-trash-can-arrow-up'></i>
                      <span className='ms-1 res-hide'>
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

      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default AdminStylesTable
