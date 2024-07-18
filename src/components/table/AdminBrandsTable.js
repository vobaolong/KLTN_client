/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { listBrands, deleteBrand, restoreBrand } from '../../apis/brand'
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
import Error from '../ui/Error'
import { humanReadableDate } from '../../helper/humanReadable'

const AdminBrandsTable = ({ heading = false }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false)
  const [run, setRun] = useState(false)
  const [error, setError] = useState('')
  const [deletedBrand, setDeletedBrand] = useState({})
  const [restoredBrand, setRestoredBrand] = useState({})
  const [brands, setBrands] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'name',
    categoryId: '',
    order: 'asc',
    limit: 8,
    page: 1
  })

  const { _id, accessToken } = getToken()

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    listBrands(_id, accessToken, filter)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setBrands(data.brands)
          setPagination({
            size: data.size,
            pageCurrent: data.filter.pageCurrent,
            pageCount: data.filter.pageCount
          })
        }
        if (isMounted) setIsLoading(false)
        setTimeout(() => setError(''), 3000)
      })
      .catch((error) => {
        setError('Server Error')
        if (isMounted) setIsLoading(false)
        setTimeout(() => setError(''), 3000)
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

  const handleDelete = (brand) => {
    setDeletedBrand(brand)
    setIsConfirmingDelete(true)
  }

  const handleRestore = (brand) => {
    setRestoredBrand(brand)
    setIsConfirmingRestore(true)
  }

  const onSubmitDelete = () => {
    setIsLoading(true)
    deleteBrand(_id, accessToken, deletedBrand._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.brand.delete'))
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
    setIsLoading(true)
    restoreBrand(_id, accessToken, restoredBrand._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.brand.restore'))
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirmingDelete && (
        <ConfirmDialog
          title={t('brandDetail.del')}
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirmingDelete(false)}
        />
      )}
      {isConfirmingRestore && (
        <ConfirmDialog
          title={t('brandDetail.res')}
          onSubmit={onSubmitRestore}
          onClose={() => setIsConfirmingRestore(false)}
        />
      )}

      {heading && <h5 className='text-start'>{t('title.productBrands')}</h5>}
      {isLoading && <Loading />}
      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className=' d-flex align-items-center justify-content-between mb-3'>
          <SearchInput onChange={handleChangeKeyword} />
          <Link
            type='button'
            className='btn btn-primary ripple text-nowrap rounded-1'
            to='/admin/brand/create'
          >
            <i className='fa-light fa-plus'></i>
            <span className='ms-2 res-hide'>{t('brandDetail.add')}</span>
          </Link>
        </div>

        <div className='table-scroll my-2'>
          <table className='table align-middle table-hover table-sm text-start'>
            <thead>
              <tr>
                <th scope='col' className='text-center'></th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('brandDetail.name')}
                    sortBy='name'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('brandDetail.categories')}
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
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('brandDetail.createdAt')}
                    sortBy='createdAt'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <span>{t('action')}</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {brands.map((brand, index) => (
                <tr key={index}>
                  <th scope='row' className='text-center'>
                    {index + 1 + (filter.page - 1) * filter.limit}
                  </th>
                  <td>
                    <span>{brand.name}</span>
                  </td>
                  <td>
                    <div
                      style={{
                        height: '100%',
                        maxHeight: '200px',
                        overflow: 'auto'
                      }}
                      className='d-flex flex-column gap-2 my-2'
                    >
                      {brand.categoryIds.map((category, index) => (
                        <div
                          className='hidden-avatar fs-9 badge bg-value text-dark-emphasis border rounded-1 fw-normal text-start'
                          key={index}
                        >
                          <CategorySmallCard category={category} />
                        </div>
                      ))}
                    </div>
                  </td>

                  <td>
                    {brand.isDeleted ? <DeletedLabel /> : <ActiveLabel />}
                  </td>
                  <td>{humanReadableDate(brand.createdAt)}</td>
                  <td className='text-nowrap my-1'>
                    <div className='position-relative d-inline-block'>
                      <Link
                        type='button'
                        className='btn btn-sm btn-outline-secondary ripple me-2 cus-tooltip'
                        to={`/admin/brand/values/${brand._id}`}
                      >
                        <i className='fa-solid fa-circle-info'></i>
                      </Link>
                      <span className='cus-tooltip-msg'>
                        {t('button.detail')}
                      </span>
                    </div>
                    <div className='position-relative d-inline-block'>
                      <Link
                        type='button'
                        className='btn btn-sm btn-outline-primary ripple me-2 rounded-1 cus-tooltip'
                        to={`/admin/brand/edit/${brand._id}`}
                      >
                        <i className='fa-duotone fa-pen-to-square'></i>
                      </Link>
                      <span className='cus-tooltip-msg'>
                        {t('button.edit')}
                      </span>
                    </div>
                    <div className='position-relative d-inline-block'>
                      {!brand.isDeleted ? (
                        <button
                          type='button'
                          className='btn btn-sm btn-outline-danger ripple rounded-1 cus-tooltip'
                          onClick={() => handleDelete(brand)}
                        >
                          <i className='fa-solid fa-trash-alt'></i>
                        </button>
                      ) : (
                        <button
                          type='button'
                          className='btn btn-sm btn-outline-success ripple rounded-1 cus-tooltip'
                          onClick={() => handleRestore(brand)}
                        >
                          <i className='fa-solid fa-trash-can-arrow-up'></i>
                        </button>
                      )}{' '}
                      <span className=' cus-tooltip-msg'>
                        {!brand.isDeleted
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

export default AdminBrandsTable
