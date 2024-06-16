/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import {
  listProductsForAdmin,
  activeProduct as activeOrInactive
} from '../../apis/product'
import { humanReadableDate } from '../../helper/humanReadable'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import SortByButton from './sub/SortByButton'
import ProductSmallCard from '../card/ProductSmallCard'
import StoreSmallCard from '../card/StoreSmallCard'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import { toast } from 'react-toastify'
import ProductActiveLabel from '../label/ProductActiveLabel'
import CategorySmallCard from '../card/CategorySmallCard'
import Error from '../ui/Error'
import boxImg from '../../assets/box.svg'

const AdminProductsTable = ({ heading = false, isActive = true }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [run, setRun] = useState('')
  const [error, setError] = useState('')
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'sold',
    isActive,
    order: 'desc',
    limit: 7,
    page: 1
  })

  const [activeProduct, setActiveProduct] = useState({})
  const { _id, accessToken } = getToken()

  useEffect(() => {
    let isMounted = true

    const init = () => {
      setIsLoading(true)
      listProductsForAdmin(_id, accessToken, filter)
        .then((data) => {
          if (data.error) setError(data.error)
          else {
            if (isMounted) {
              setProducts(data.products)
              setPagination({
                size: data.size,
                pageCurrent: data.filter.pageCurrent,
                pageCount: data.filter.pageCount
              })
            }
          }
          if (isMounted) setIsLoading(false)
        })
        .catch((error) => {
          setError('Server Error')
          if (isMounted) setIsLoading(false)
        })
    }

    init()

    return () => {
      isMounted = false
    }
  }, [filter, run])

  useEffect(() => {
    setFilter({
      ...filter,
      isActive
    })
  }, [isActive])

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

  const handleActiveProduct = (product) => {
    setActiveProduct(product)
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setIsLoading(true)
    const value = { isActive: !activeProduct.isActive }
    const isActive = activeProduct.isActive
      ? t('toastSuccess.product.ban')
      : t('toastSuccess.product.active')

    activeOrInactive(_id, accessToken, value, activeProduct._id)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setTimeout(() => {
            setError('')
          }, 3000)
        } else {
          toast.success(isActive)
          setRun(!run)
        }
        setIsLoading(false)
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
      {heading && (
        <h5 className='text-start'>
          {isActive
            ? t('title.listActiveProducts')
            : t('title.listBannedProducts')}
        </h5>
      )}

      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={
            !activeProduct.isActive
              ? t('dialog.activeProduct')
              : t('dialog.banProduct')
          }
          color={!activeProduct.isActive ? 'primary' : 'danger'}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
        />
      )}

      <div>
        <div className='p-3 box-shadow bg-body rounded-2'>
          <div className=' mb-3'>
            <SearchInput onChange={handleChangeKeyword} />
          </div>
          {!isLoading && pagination.size === 0 ? (
            <div className='my-4 text-center'>
              <img className='mb-3' src={boxImg} alt='boxImg' width={'80px'} />
              <h5>{t('productDetail.noProduct')}</h5>
            </div>
          ) : (
            <div className='table-scroll my-2'>
              <table className='table align-middle table-hover table-sm text-start'>
                <thead>
                  <tr>
                    <th scope='col'></th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('productDetail.name')}
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
                        title={t('store')}
                        sortBy='storeId'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('productDetail.category')}
                        sortBy='categoryId'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('productDetail.rating')}
                        sortBy='rating'
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
                        sortBy='isSelling'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>

                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('productDetail.date')}
                        sortBy='createdAt'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>

                    <th scope='col'>
                      <span>{t('action')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <th scope='row'>
                        {index + 1 + (filter.page - 1) * filter.limit}
                      </th>
                      <td
                        className='py-1'
                        style={{
                          whiteSpace: 'normal',
                          maxWidth: '400px'
                        }}
                      >
                        <ProductSmallCard product={product} />
                      </td>
                      <td>
                        <small>
                          <StoreSmallCard store={product.storeId} />
                        </small>
                      </td>
                      <td>
                        <small className='badge border rounded-1 bg-value text-dark-emphasis'>
                          <CategorySmallCard
                            parent={false}
                            category={product.categoryId}
                          />
                        </small>
                      </td>
                      <td>
                        <small>
                          <i className='fa-solid fa-star text-warning me-1'></i>
                          {product.rating}
                        </small>
                      </td>

                      <td>
                        <ProductActiveLabel isActive={product.isActive} />
                      </td>
                      <td className='text-end'>
                        <small>{humanReadableDate(product.createdAt)}</small>
                      </td>
                      <td>
                        <button
                          type='button'
                          className={`btn btn-sm rounded-1 ripple ${
                            !product.isActive
                              ? 'btn-outline-success'
                              : 'btn-outline-danger'
                          }`}
                          onClick={() => handleActiveProduct(product)}
                          title={
                            !product.isActive
                              ? t('button.active')
                              : t('button.ban')
                          }
                        >
                          <i
                            className={`d-none res-dis-sm${
                              product.isActive
                                ? 'fa-solid fa-ban'
                                : 'fa-regular fa-circle-check'
                            }`}
                          ></i>
                          <span className='res-hide'>
                            {!product.isActive
                              ? t('button.active')
                              : t('button.ban')}
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
    </div>
  )
}

export default AdminProductsTable
