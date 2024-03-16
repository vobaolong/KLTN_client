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
import ProductLicenseLabel from '../label/ProductLicenseLabel'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import StyleValueSelector from '../selector/StyleValueSelector'
import ConfirmDialog from '../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import ProductSmallCard from '../card/ProductSmallCard'
import StarRating from '../label/StarRating'

const IMG = process.env.REACT_APP_STATIC_URL

const StoreProductsTable = ({
  heading = true,
  isSelling = true,
  storeId = ''
}) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [run, setRun] = useState('')

  const [products, setProducts] = useState([])
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

  const [sellingProduct, setSellingProduct] = useState({})

  const { _id, accessToken } = getToken()

  const init = () => {
    setIsLoading(true)
    setError('')
    listProductsForManager(_id, accessToken, filter, storeId)
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
        setIsLoading(false)
        setError('Server Error')
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
    setError('')
    setIsLoading(true)
    const value = { isSelling: !sellingProduct.isSelling }
    sellOrStore(_id, accessToken, value, storeId, sellingProduct._id)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setTimeout(() => {
            setError('')
          }, 3000)
        } else setRun(!run)
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

  console.log(products.map((product) => product.rating))
  return (
    <div className='position-relative'>
      {heading && (
        <h4 className='text-center text-uppercase'>
          {isSelling ? 'Selling products' : 'Stored products'}
        </h4>
      )}

      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={sellingProduct.isSelling ? 'Store product' : 'Sell product'}
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
              <span className='ms-2 res-hide'>Create product</span>
            </Link>
          )}
        </div>
        <span className='me-2 text-nowrap res-hide'>
          Showing{' '}
          <b>
            {Math.min(
              filter.limit,
              pagination.size - filter.limit * (pagination.pageCurrent - 1)
            )}{' '}
          </b>
          of {pagination.size} {t('result')}
        </span>
      </div>
      {!isLoading && products.length === 0 ? (
        <div className='d-flex justify-content-center mt-3 text-primary text-center'>
          <h5>There is no product</h5>
        </div>
      ) : (
        <div className='table-scroll my-2'>
          <table className='table align-middle table-hover table-striped table-sm text-center'>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title='Product Name'
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
                    title='Price'
                    sortBy='price'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title='Sale price'
                    sortBy='salePrice'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title='Stock'
                    sortBy='quantity'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title='Sold'
                    sortBy='sold'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title='Category'
                    sortBy='categoryId'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title='Volume'
                    sortBy='styleValueIds'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title='Rating'
                    sortBy='rating'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title='License'
                    sortBy='isActive'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title='Created At'
                    sortBy='createdAt'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>

                <th scope='col'>
                  {' '}
                  <span
                    style={{ fontWeight: '400', fontSize: '.875rem' }}
                    className='text-black'
                  >
                    Action
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
                    {/* <small>{product.name}</small> */}
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
                    <img
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
                            <img
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
                        <small className='mx-auto'>No styles</small>
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
                      <ProductLicenseLabel isActive={product.isActive} />
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
                            <span className='ms-2 res-hide'>Sell</span>
                          </>
                        ) : (
                          <>
                            <i className='fas fa-archive'></i>
                            <span className='ms-2 res-hide'>Store</span>
                          </>
                        )}
                      </button>

                      <Link
                        type='button'
                        className='btn btn-dark ripple rounded-1'
                        to={`/vendor/products/editProduct/${product._id}/${storeId}`}
                      >
                        <i class='fa-solid fa-pen'></i>
                        <span className='ms-2 res-hide'>Edit</span>
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
