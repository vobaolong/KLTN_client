/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import {
  listProductsForManager,
  sellingProduct as showOrHide
} from '../../apis/product'
import { humanReadableDate } from '../../helper/humanReadable'
import { formatPrice } from '../../helper/formatPrice'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import SortByButton from './sub/SortByButton'
import CategorySmallCard from '../card/CategorySmallCard'
import ProductActiveLabel from '../label/ProductActiveLabel'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import ProductSmallCard from '../card/ProductSmallCard'
import { toast } from 'react-toastify'
import ShowResult from '../ui/ShowResult'
import Error from '../ui/Error'
import Alert from '../ui/Alert'

const StoreProductsTable = ({ storeId = '', selectedOption = 'all' }) => {
  const { t } = useTranslation()
  const [run, setRun] = useState('')
  const [error, setError] = useState('')
  const { _id, accessToken } = getToken()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [sellingProduct, setSellingProduct] = useState({})
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [alerts, setAlerts] = useState({
    isAllAlert: true,
    isSellingAlert: true,
    isHiddenAlert: true
  })

  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'sold',
    order: 'desc',
    limit: 8,
    quantity: 0,
    page: 1
  })

  const init = () => {
    setError('')
    setIsLoading(true)
    let filterCopy = { ...filter }
    switch (selectedOption) {
      case 'selling':
        filterCopy.isSelling = true
        break
      case 'hidden':
        filterCopy.isSelling = false
        break
      default:
        break
    }
    listProductsForManager(_id, accessToken, filterCopy, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setProducts(data.products)
          setPagination({
            size: data.size,
            pageCurrent: data.filter.pageCurrent,
            pageCount: data.filter.pageCount
          })
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(`Error occurred ${error.message}`)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [filter, storeId, run, selectedOption])

  useEffect(() => {
    setFilter({
      ...filter
    })
  }, [])

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

  const handleSellingProduct = (product) => {
    setSellingProduct(product)
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    if (!isConfirming) return
    setIsLoading(true)
    const value = { isSelling: !sellingProduct.isSelling }
    const action = sellingProduct.isSelling ? 'hide' : 'show'
    showOrHide(_id, accessToken, value, storeId, sellingProduct._id)
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          toast.success(t(`toastSuccess.product.${action}`))
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(`Error occurred ${error}`)
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {/* {heading && (
        <h4 className='text-center text-uppercase mb-3'>
          {isSelling ? t('productDetail.show') : t('productDetail.hide')}
        </h4>
      )} */}

      {alerts.isAllAlert && selectedOption === 'selling' ? (
        <Alert
          icon={<i className='text-primary fa-solid fa-circle-info'></i>}
          msg1='Đang bán'
          alert=' Mục này chứa các'
          msg2='sản phẩm có thể bán.'
          onClose={() => setAlerts((prev) => ({ ...prev, isAllAlert: false }))}
        />
      ) : null}

      {alerts.isHiddenAlert && selectedOption === 'hidden' ? (
        <Alert
          icon={<i className='text-primary fa-solid fa-circle-info'></i>}
          msg1='Đã ẩn'
          alert='Mục này chứa các sản phẩm mà Nhà bán đã tắt toàn bộ lựa chọn'
          msg2='Khách hàng không thể xem và đặt hàng.'
          onClose={() =>
            setAlerts((prev) => ({ ...prev, isHiddenAlert: false }))
          }
        />
      ) : null}

      {alerts.isSellingAlert && selectedOption === 'all' ? (
        <Alert
          icon={<i className='text-primary fa-solid fa-circle-info'></i>}
          msg1='Tất cả'
          alert='Mục này chứa các sản phẩm đang bán và đang ẩn'
          msg2=''
          onClose={() =>
            setAlerts((prev) => ({ ...prev, isSellingAlert: false }))
          }
        />
      ) : null}
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={
            sellingProduct.isSelling
              ? t('title.hideProduct')
              : t('title.showProduct')
          }
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className='mb-3'>
          <SearchInput onChange={handleChangeKeyword} />
        </div>
        {!isLoading && pagination.size === 0 ? (
          <div className='d-flex justify-content-center my-4 text-danger text-center'>
            <h5>{t('productDetail.noProduct')}</h5>
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
                        title={t('productDetail.category')}
                        sortBy='categoryId'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    {/* <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title='Thumb'
                      sortBy='listImages'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>

                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title='Images'
                      sortBy='listImages'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>

                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title='Description'
                      sortBy='description'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th> */}

                    <th scope='col' className='text-end'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('productDetail.price')}
                        sortBy='price'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col' className='text-end'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('productDetail.salePrice')}
                        sortBy='salePrice'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('productDetail.stock')}
                        sortBy='quantity'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('productDetail.sold')}
                        sortBy='sold'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>

                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('productDetail.values')}
                        sortBy='variantValueIds'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('filters.rating')}
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
                        sortBy='isActive'
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
                        style={{
                          whiteSpace: 'normal',
                          minWidth: '400px',
                          width: 'fit-content'
                        }}
                      >
                        <small>
                          <ProductSmallCard product={product} />
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
                      {/* <td>
                  <div
                    className='align-items-center d-flex mx-auto my-1'
                    style={{
                      position: 'relative',
                      width: '80px',
                      height: '80px'
                    }}
                  >
                    <img loading='lazy'

                      src={IMG + product.listImages[0]}
                      alt={product.name}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: '0',
                        left: '0',
                        justifyContent: 'flex-start',
                        objectFit: 'contain',
                        borderRadius: '3px',
                        boxShadow:
                          'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div
                    className='d-flex flex-wrap align-items-center'
                    style={{
                      width: '250px',
                      height: '180px',
                      overflow: 'auto',
                      gap: '3px'
                    }}
                  >
                    {product.listImages.length > 1 ? (
                      product.listImages.map((image, index) => {
                        return (
                          <div
                            className='position-relative mx-auto'
                            key={index}
                            style={{
                              paddingBottom: '72px',
                              width: '72px',
                              height: '0'
                            }}
                          >
                            <img loading='lazy'

                              className='position-absolute'
                              src={IMG + image}
                              alt='Images'
                              style={{
                                width: '100%',
                                height: '100%',
                                top: '0',
                                left: '0',
                                justifyContent: 'flex-start',
                                objectFit: 'cover',
                                borderRadius: '3px',
                                boxShadow:
                                  'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'
                              }}
                            />
                          </div>
                        )
                      })
                    ) : (
                      <small className='mx-auto'>No images</small>
                    )}
                  </div>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <div
                    style={{
                      width: '300px',
                      maxHeight: '170px',
                      overflow: 'auto',
                      textAlign: 'justify'
                    }}
                  >
                    <small>{product.description}</small>
                  </div>
                </td> */}

                      <td className='text-end'>
                        {formatPrice(product.price?.$numberDecimal)}
                        <sup>₫</sup>
                      </td>
                      <td className='text-end'>
                        {formatPrice(product.salePrice?.$numberDecimal)}
                        <sup>₫</sup>
                      </td>
                      <td>{product.quantity}</td>
                      <td>{product.sold}</td>

                      <td style={{ whiteSpace: 'normal' }}>
                        <div
                          className='d-flex flex-wrap justify-content-start align-items-center gap-1'
                          style={{
                            width: '250px',
                            maxHeight: '120px',
                            overflow: 'auto'
                          }}
                        >
                          {product.variantValueIds?.length > 0 ? (
                            product.variantValueIds?.map((value) => (
                              <small className='badge rounded-1 text-dark-emphasis bg-value me-1'>
                                {value.name}
                              </small>
                            ))
                          ) : (
                            <small>-</small>
                          )}
                        </div>
                      </td>
                      <td>
                        <small>
                          <i className='fa-solid fa-star text-warning me-1'></i>
                          {product.rating}
                        </small>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.9rem' }}>
                          <ProductActiveLabel isActive={product.isActive} />
                        </span>
                      </td>
                      <td>
                        <small>{humanReadableDate(product.createdAt)}</small>
                      </td>
                      <td>
                        <div className='d-flex justify-content-start align-items-center'>
                          <Link
                            type='button'
                            className='btn btn-sm btn-outline-primary ripple rounded-1'
                            to={`/seller/products/edit/${product._id}/${storeId}`}
                            title={t('button.edit')}
                          >
                            <i className='d-none res-dis-sm fa-duotone fa-pen-to-square'></i>
                            <span className='res-hide'>{t('button.edit')}</span>
                          </Link>
                          <button
                            type='button'
                            className={`btn btn-sm rounded-1 ripple ms-2 btn-outline-${
                              !product.isSelling ? 'success' : 'secondary'
                            }`}
                            onClick={() => handleSellingProduct(product)}
                            title={
                              !product.isSelling
                                ? t('button.show')
                                : t('button.hide')
                            }
                          >
                            <i
                              className={`d-none res-dis-sm fa-solid ${
                                !product.isSelling ? 'fa-box' : 'fa-archive'
                              }`}
                            ></i>
                            <span className='res-hide'>
                              {!product.isSelling
                                ? t('button.show')
                                : t('button.hide')}
                            </span>
                          </button>
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
          </>
        )}
      </div>
    </div>
  )
}

export default StoreProductsTable
