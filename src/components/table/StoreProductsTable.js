/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import {
  listProductsForManager,
  sellingProduct as sellOrStore
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

const StoreProductsTable = ({
  heading = true,
  isSelling = true,
  storeId = ''
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [isConfirming, setIsConfirming] = useState(false)
  const [run, setRun] = useState('')
  const [sellingProduct, setSellingProduct] = useState({})
  const { _id, accessToken } = getToken()
  const [pagination, setPagination] = useState({
    size: 0
  })

  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'name',
    isSelling,
    order: 'asc',
    limit: 8,
    page: 1
  })

  const init = () => {
    setIsLoading(true)
    listProductsForManager(_id, accessToken, filter, storeId)
      .then((data) => {
        if (data.error) toast.error(data.error)
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
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [filter, storeId, run])

  useEffect(() => {
    setFilter({
      ...filter,
      isSelling
    })
  }, [isSelling])

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
    if (!isConfirming) return
    setIsLoading(true)
    const value = { isSelling: !sellingProduct.isSelling }
    const action = sellingProduct.isSelling ? 'Stored' : 'Selling'
    sellOrStore(_id, accessToken, value, storeId, sellingProduct._id)
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          toast.success(`${action} product successfully`)
          setRun(!run)
        }
        setIsLoading(false)
        setIsConfirming(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {heading && (
        <h4 className='text-center text-uppercase mb-3'>
          {isSelling ? t('productDetail.selling') : t('productDetail.stored')}
        </h4>
      )}
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={
            sellingProduct.isSelling
              ? t('productDetail.storeProduct')
              : t('productDetail.sellProduct')
          }
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <div className='d-flex justify-content-between align-items-end'>
        <div className='d-flex align-items-center'>
          <SearchInput onChange={handleChangeKeyword} />

          {isSelling && (
            <Link
              type='button'
              className='btn btn-primary ripple text-nowrap rounded-1 ms-2'
              to={`/vendor/products/createNewProduct/${storeId}`}
            >
              <i className='fas fa-plus-circle'></i>
              <span className='ms-2 res-hide'>
                {t('productDetail.createProduct')}
              </span>
            </Link>
          )}
        </div>
        <small className='text-nowrap res-hide'>
          {t('showing')}{' '}
          <b>
            {Math.min(
              filter.limit,
              pagination.size - filter.limit * (pagination.pageCurrent - 1)
            )}{' '}
          </b>
          {t('of')} {pagination.size} {t('result')}
        </small>
      </div>
      {!isLoading && pagination.size === 0 ? (
        <div className='d-flex justify-content-center mt-5 text-primary text-center'>
          <h5>{t('productDetail.noProduct')}</h5>
        </div>
      ) : (
        <div className='table-scroll my-2'>
          <table className='table align-middle table-hover table-striped table-sm text-center'>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col' className='text-start'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('productDetail.name')}
                    sortBy='name'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
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

                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('productDetail.price')}
                    sortBy='price'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('productDetail.salePrice')}
                    sortBy='salePrice'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('productDetail.stock')}
                    sortBy='quantity'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('productDetail.sold')}
                    sortBy='sold'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('productDetail.category')}
                    sortBy='categoryId'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('productDetail.values')}
                    sortBy='styleValueIds'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('filters.rating')}
                    sortBy='rating'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('status.status')}
                    sortBy='isActive'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('productDetail.date')}
                    sortBy='createdAt'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>

                <th scope='col'>
                  {' '}
                  <span style={{ fontWeight: '400', fontSize: '.875rem' }}>
                    {t('action')}
                  </span>
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
                    className='text-start py-1'
                    style={{
                      whiteSpace: 'normal',
                      minWidth: '400px',
                      width: 'fit-content'
                    }}
                  >
                    <ProductSmallCard product={product} />
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

                  <td>
                    <small>{formatPrice(product.price?.$numberDecimal)}₫</small>
                  </td>
                  <td>
                    <small>
                      {formatPrice(product.salePrice?.$numberDecimal)}₫
                    </small>
                  </td>
                  <td>
                    <small>{product.quantity}</small>
                  </td>
                  <td>
                    <small>{product.sold}</small>
                  </td>
                  <td
                    style={{
                      whiteSpace: 'normal'
                    }}
                  >
                    <small className='hidden-avatar'>
                      <CategorySmallCard
                        parent={false}
                        category={product.categoryId}
                      />
                    </small>
                  </td>

                  <td style={{ whiteSpace: 'normal' }}>
                    <div
                      className='d-flex justify-content-start align-items-center text-start mx-1'
                      style={{
                        maxWidth: '150px'
                        // height: '120px',
                        // overflow: 'auto'
                      }}
                    >
                      {product.styleValueIds?.length > 0 ? (
                        <small>
                          {/* <StyleValueSelector
                          listValues={product.styleValueIds}
                          isEditable={false}
                        /> */}
                          {product.styleValueIds
                            ?.map((value) => value.name)
                            .join(', ')}
                        </small>
                      ) : (
                        <small className='mx-auto'>-</small>
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
                    <small>
                      <ProductActiveLabel isActive={product.isActive} />
                    </small>
                  </td>
                  <td className='text-end'>
                    <small>{humanReadableDate(product.createdAt)}</small>
                  </td>
                  <td>
                    <div className='d-flex justify-content-center align-items-center'>
                      <button
                        type='button'
                        className={`btn rounded-1 btn-outline-${
                          !product.isSelling ? 'success' : 'secondary'
                        } ripple me-2`}
                        onClick={() => handleSellingProduct(product)}
                      >
                        {!product.isSelling ? (
                          <>
                            <i className='fas fa-box'></i>
                            <span className='ms-1 res-hide'>
                              {t('button.sell')}
                            </span>
                          </>
                        ) : (
                          <>
                            <i className='fas fa-archive'></i>
                            <span className='ms-1 res-hide'>
                              {t('button.store')}
                            </span>
                          </>
                        )}
                      </button>

                      <Link
                        type='button'
                        className='btn btn-primary ripple rounded-1'
                        to={`/vendor/products/editproduct/${product._id}/${storeId}`}
                      >
                        <i className='fa-solid fa-pen'></i>
                        <span className='ms-1 res-hide'>
                          {t('button.edit')}
                        </span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default StoreProductsTable
