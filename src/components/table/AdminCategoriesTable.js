/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import {
  listCategories,
  deleteCategory,
  restoreCategory
} from '../../apis/category'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import SortByButton from './sub/SortByButton'
import DeletedLabel from '../label/DeletedLabel'
import CategorySmallCard from '../card/CategorySmallCard'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import ActiveLabel from '../label/ActiveLabel'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import { toast } from 'react-toastify'

const IMG = process.env.REACT_APP_STATIC_URL

const AdminCategoriesTable = ({ heading = '' }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false)
  const [run, setRun] = useState(false)
  const [deletedCategory, setDeletedCategory] = useState({})
  const [restoredCategory, setRestoredCategory] = useState({})
  const [categories, setCategories] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    categoryId: '',
    sortBy: 'categoryId',
    order: 'asc',
    limit: 8,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setIsLoading(true)
    listCategories(_id, accessToken, filter)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          setCategories(data.categories)
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

  const handleDeleteCategory = (category) => {
    setDeletedCategory(category)
    setIsConfirming(true)
  }

  const handleRestoreCategory = (category) => {
    setRestoredCategory(category)
    setIsConfirmingRestore(true)
  }

  const onSubmitDelete = () => {
    setIsLoading(true)
    deleteCategory(_id, accessToken, deletedCategory._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.category.delete'))

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
    restoreCategory(_id, accessToken, restoredCategory._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.category.restore'))
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
          title={t('categoryDetail.delete')}
          message={
            <span>
              Are you sure you want to delete
              <CategorySmallCard category={deletedCategory} />
            </span>
          }
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirming(false)}
        />
      )}
      {isConfirmingRestore && (
        <ConfirmDialog
          title={t('categoryDetail.restore')}
          message={
            <span>
              Are you sure you want to restore
              <CategorySmallCard category={restoredCategory} />
            </span>
          }
          onSubmit={onSubmitRestore}
          onClose={() => setIsConfirmingRestore(false)}
        />
      )}

      {heading && <h4 className='text-center text-uppercase'>{heading}</h4>}
      <div className='d-flex justify-content-between align-items-end'>
        <div className='d-flex align-items-center'>
          <SearchInput onChange={handleChangeKeyword} />
          <div className='ms-2'>
            <Link
              type='button'
              className='btn btn-primary ripple text-nowrap rounded-1'
              to='/admin/category/createNewCategory'
            >
              <i className='fa-solid fa-plus-circle'></i>
              <span className='ms-2 res-hide'>{t('categoryDetail.add')}</span>
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
        <table className='table table-hover table-striped table-sm align-middle text-center'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope='col' className='text-start'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title={t('categoryDetail.name')}
                  sortBy='name'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title={t('categoryDetail.img')}
                  sortBy=''
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>

              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title={t('categoryDetail.parent')}
                  sortBy='categoryId'
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
                <span
                  style={{ fontWeight: '400', fontSize: '.875rem' }}
                  className='text-secondary'
                >
                  {t('action')}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <th scope='row'>
                  {index + 1 + (filter.page - 1) * filter.limit}
                </th>
                <td className='text-start'>{category.name}</td>
                <td>
                  {category.image ? (
                    <div
                      style={{
                        position: 'relative',
                        margin: 'auto',
                        paddingBottom: '50px',
                        width: '50px',
                        height: '0'
                      }}
                    >
                      <img
                        loading='lazy'
                        src={IMG + category.image}
                        alt={category.name}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          top: '0',
                          left: '0',
                          objectFit: 'cover',
                          borderRadius: '0.25rem',
                          boxShadow:
                            'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'
                        }}
                      />
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
                <td className='text-start hidden-avatar'>
                  {category.categoryId ? (
                    <CategorySmallCard category={category.categoryId} />
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td>
                  {category.isDeleted ? (
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
                  <Link
                    type='button'
                    className='btn btn-sm btn-primary ripple me-2 rounded-1'
                    to={`/admin/category/editCategory/${category._id}`}
                  >
                    <i className='fa-solid fa-pen'></i>
                    <span className='ms-2 res-hide'>{t('button.edit')}</span>
                  </Link>

                  {!category.isDeleted ? (
                    <button
                      type='button'
                      className='btn btn-sm btn-outline-danger rounded-1 ripple cus-tooltip'
                      onClick={() => handleDeleteCategory(category)}
                    >
                      <i className='fa-solid fa-trash-alt'></i>
                      <span className='ms-2 res-hide'>
                        {t('button.delete')}
                      </span>
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='btn btn-sm btn-outline-success ripple cus-tooltip'
                      onClick={() => handleRestoreCategory(category)}
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

      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default AdminCategoriesTable
