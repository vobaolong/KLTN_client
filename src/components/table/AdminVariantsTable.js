/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { listVariants, deleteVariant, restoreVariant } from '../../apis/variant'
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

const AdminVariantsTable = ({ heading = false }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false)
  const [run, setRun] = useState(false)
  const [deletedVariant, setDeletedVariant] = useState({})
  const [restoredVariant, setRestoredVariant] = useState({})
  const [variants, setVariants] = useState([])
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

  const init = () => {
    setIsLoading(true)
    listVariants(_id, accessToken, filter)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          setVariants(data.variants)
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

  const handleDelete = (variant) => {
    setDeletedVariant(variant)
    setIsConfirming(true)
  }

  const handleRestore = (variant) => {
    setRestoredVariant(variant)
    setIsConfirmingRestore(true)
  }

  const onSubmitDelete = () => {
    setIsLoading(true)
    deleteVariant(_id, accessToken, deletedVariant._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.variant.delete'))
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Some thing went wrong')
        setIsLoading(false)
      })
  }

  const onSubmitRestore = () => {
    setIsLoading(true)
    restoreVariant(_id, accessToken, restoredVariant._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.variant.restore'))
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Some thing went wrong')
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
      {isConfirmingRestore && (
        <ConfirmDialog
          title={t('variantDetail.res')}
          onSubmit={onSubmitRestore}
          onClose={() => setIsConfirmingRestore(false)}
        />
      )}

      {heading && <h5 className='text-start'>{t('title.productVariants')}</h5>}
      {isLoading && <Loading />}
      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className='option-wrap d-flex align-items-center justify-content-between'>
          <SearchInput onChange={handleChangeKeyword} />
          <Link
            type='button'
            className='btn btn-primary ripple text-nowrap rounded-1'
            to='/admin/variant/create'
          >
            <i className='fa-solid fa-plus'></i>
            <span className='ms-1 res-hide'>{t('variantDetail.add')}</span>
          </Link>
        </div>

        <div className='table-scroll my-2'>
          <table className='table align-middle table-hover table-sm text-start'>
            <thead>
              <tr>
                <th scope='col' className='text-center'></th>
                <th scope='col' className=''>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('variantDetail.name')}
                    sortBy='name'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col' className=''>
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
              {variants.map((variant, index) => (
                <tr key={index}>
                  <th scope='row' className='text-center'>
                    {index + 1 + (filter.page - 1) * filter.limit}
                  </th>
                  <td>
                    <span style={{ fontSize: '.9rem' }}>{variant.name}</span>
                  </td>
                  <td>
                    {variant.categoryIds.map((category, index) => (
                      <div
                        className='hidden-avatar badge bg-value text-dark-emphasis border rounded-1 fw-normal'
                        style={{ fontSize: '0.875rem' }}
                        key={index}
                      >
                        <CategorySmallCard category={category} />
                      </div>
                    ))}
                  </td>

                  <td>
                    {variant.isDeleted ? <DeletedLabel /> : <ActiveLabel />}
                  </td>

                  <td className='text-nowrap py-1'>
                    <Link
                      type='button'
                      className='btn btn-sm btn-outline-secondary ripple me-2 my-1'
                      to={`/admin/variant/values/${variant._id}`}
                      title={t('button.detail')}
                    >
                      <i className='fa-solid fa-circle-info'></i>
                    </Link>

                    <Link
                      type='button'
                      className='btn btn-sm btn-outline-primary ripple me-2 rounded-1'
                      to={`/admin/variant/edit/${variant._id}`}
                      title={t('button.edit')}
                    >
                      <i className='fa-duotone fa-pen-to-square'></i>
                    </Link>

                    {!variant.isDeleted ? (
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-danger ripple rounded-1'
                        onClick={() => handleDelete(variant)}
                        title={t('button.delete')}
                      >
                        <i className='fa-solid fa-trash-alt'></i>
                      </button>
                    ) : (
                      <button
                        type='button'
                        className='btn btn-outline-success'
                        onClick={() => handleRestore(variant)}
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

export default AdminVariantsTable
