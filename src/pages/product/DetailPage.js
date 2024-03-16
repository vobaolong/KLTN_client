import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { getProduct } from '../../apis/product'
import {
  getNumberOfFollowersForProduct,
  checkFollowingProduct
} from '../../apis/follow'
import { formatPrice } from '../../helper/formatPrice'
import MainLayout from '../../components/layout/MainLayout'
import Loading from '../../components/ui/Loading'
import Error from '../../components/ui/Error'
import Carousel from '../../components/image/Carousel'
import StarRating from '../../components/label/StarRating'
import FollowProductButton from '../../components/button/FollowProductButton'
import AddToCartForm from '../../components/item/form/AddToCartForm'
import Paragraph from '../../components/ui/Paragraph'
import CategorySmallCard from '../../components/card/CategorySmallCard'
import StoreSmallCard from '../../components/card/StoreSmallCard'
import ListBestSellerProducts from '../../components/list/ListBestSellerProduct'
import ListProductsByStore from '../../components/list/ListProductsByStore'
import SigninButton from '../../components/item/SigninItem'
import ListReviews from '../../components/list/ListReviews'
import SalePercentLabel from '../../components/label/SalePercentLabel'
import { useTranslation } from 'react-i18next'
import { FacebookShareButton } from 'react-share'

const DetailPage = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [product, setProduct] = useState({})
  const { productId } = useParams()

  const init = () => {
    setError('')
    setIsLoading(true)
    getProduct(productId)
      .then(async (data) => {
        if (data.error) setError(data.error)
        else if (
          data.product &&
          data.product.storeId &&
          !data.product.storeId.isActive
        )
          setError('This store is banned by Zenpii!')
        else {
          const newProduct = data.product
          //get count followers
          try {
            const res = await getNumberOfFollowersForProduct(newProduct._id)
            newProduct.numberOfFollowers = res.count
          } catch {
            newProduct.numberOfFollowers = 0
          }

          //check follow
          try {
            const { _id, accessToken } = getToken()
            const res = await checkFollowingProduct(
              _id,
              accessToken,
              newProduct._id
            )
            newProduct.isFollowing = res.success ? true : false
          } catch {
            newProduct.isFollowing = false
          }

          setProduct(newProduct)
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
  }, [productId])
  const salePercent = Math.round(
    ((product?.price?.$numberDecimal - product?.salePrice?.$numberDecimal) /
      product?.price?.$numberDecimal) *
      100
  )

  return (
    <MainLayout>
      <div className='position-relative'>
        {isLoading && <Loading />}
        {error ? (
          <Error msg={error} />
        ) : (
          <div className='container-fluid'>
            <div className='mb-2 hidden-avatar mx-0!important'>
              <CategorySmallCard category={product.categoryId} parent={true} />
            </div>
            <div
              className='row bg-white rounded-1 box-shadow'
              style={{ paddingTop: '12px', paddingBottom: '12px' }}
            >
              <div className='col-lg-5 col-md-6 '>
                <Carousel
                  listImages={product.listImages}
                  alt={product.name}
                  style={{
                    paddingBottom: 'calc(2/3*100%)'
                  }}
                />
              </div>
              <div className='col-lg-7 col-md-6'>
                <strong className='text-primary text-lg-right'>
                  <StoreSmallCard store={product.storeId} />
                </strong>
                <h5 className=''>{product.name}</h5>
                <div className='d-flex'>
                  <a
                    href='#review'
                    className='me-2 border-bottom border-primary text-primary text-decoration-none'
                  >
                    {product.rating}
                  </a>
                  <StarRating stars={product.rating} />
                  <span className='mx-2 px-2 border-start'>
                    {product.sold}
                    <span className='text-muted ms-1'>
                      {t('productDetail.sold')}
                    </span>
                  </span>
                </div>
                <div className='price-div d-flex flex-wrap justify-content-start align-items-center mt-3 bg-light px-3 py-2 rounded rounded-sm'>
                  <del className=' text-muted mt-1'>
                    {formatPrice(product.price?.$numberDecimal)} <sup> ₫</sup>
                  </del>
                  <h2 className='text-primary fs-3 m-0 ms-3'>
                    {formatPrice(product.salePrice?.$numberDecimal)}
                    <sup> ₫</sup>
                  </h2>
                  <SalePercentLabel salePercent={salePercent} />

                  <small className='ms-2'> {t('productDetail.vat')}</small>
                </div>

                <div className='mt-4'>
                  {product.storeId && !product.storeId.isOpen && (
                    <Error msg="This store is closed, can' t order in this time!" />
                  )}
                  {product.quantity <= 0 && (
                    <Error msg={t('productDetail.soldOut')} />
                  )}
                  {!getToken() && (
                    <SigninButton
                      className='w-100 btn-lg'
                      title={t('button.signInToShopping')}
                    />
                  )}
                  {product.storeId?.isOpen &&
                    product.quantity > 0 &&
                    getToken() &&
                    getToken().role === 'user' && (
                      <AddToCartForm product={product} />
                    )}
                  {getToken() && (
                    <FollowProductButton
                      productId={product._id}
                      isFollowing={product.isFollowing}
                      onRun={() =>
                        setProduct({
                          ...product,
                          isFollowing: !product.isFollowing
                        })
                      }
                      className='mt-2 btn-lg'
                    />
                  )}
                  <div>
                    <FacebookShareButton
                      className='mt-2 cus-tooltip ripple'
                      url={
                        window.location.href
                          ? 'https://hasaki.vn/san-pham/gel-rua-mat-la-roche-posay-cho-da-dau-nhay-cam-400ml-68810.html?gad_source=1&gclid=CjwKCAjw17qvBhBrEiwA1rU9wwx0pGlaJp9LXom7lUNIZFUsUSDTAe2iT_w7EfZcGZdnsMMcaIJROxoCL-oQAvD_BwE'
                          : ''
                      } // Set the URL to the current page
                      quote={product.name} // Set the quote to the product name
                    >
                      <i className='fa-solid fa-share-from-square text-secondary'></i>
                    </FacebookShareButton>
                    <small className='cus-tooltip-msg'>hello</small>
                  </div>
                </div>
              </div>
            </div>
            <div className='row mt-2 py-3 '>
              <div className='col-lg-9 col-md-12 rounded-1 box-shadow bg-white'>
                <div className='container-fluid p-0'>
                  <div className='row res-flex-reverse-md'>
                    <div class='container'>
                      <ul class='nav nav-tabs' id='myTab' role='tablist'>
                        <li class='nav-item' role='presentation'>
                          <a
                            className='nav-link active'
                            id='details-tab'
                            data-bs-toggle='tab'
                            href='#details'
                            role='tab'
                            aria-controls='details'
                            aria-selected='true'
                          >
                            {t('productDetail.description')}
                          </a>
                        </li>
                        <li class='nav-item' role='presentation'>
                          <a
                            className='nav-link'
                            id='reviews-tab'
                            data-bs-toggle='tab'
                            href='#reviews'
                            role='tab'
                            aria-controls='reviews'
                            aria-selected='false'
                          >
                            {t('productDetail.productReview')}
                          </a>
                        </li>
                      </ul>
                      <div class='tab-content' id='myTabContent'>
                        <div
                          class='tab-pane fade show active'
                          id='details'
                          role='tabpanel'
                          aria-labelledby='details-tab'
                        >
                          <div className=' mb-5'>
                            <Paragraph
                              label='Description'
                              des={product.description}
                              multiLine={true}
                            />
                          </div>
                        </div>
                        <div
                          class='tab-pane fade'
                          id='reviews'
                          role='tabpanel'
                          aria-labelledby='reviews-tab'
                        >
                          <div id='review'>
                            <ListReviews
                              heading={t('productDetail.productReview')}
                              productId={product._id}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12'>
              {product.categoryId && (
                <div className='mt-4'>
                  <ListBestSellerProducts
                    heading='Similar Products'
                    categoryId={product.categoryId._id}
                  />
                </div>
              )}

              {product.storeId && (
                <div className='mt-4'>
                  <ListProductsByStore
                    heading={`${
                      product.storeId && product.storeId.name
                        ? product.storeId.name
                        : 'Store'
                    }'s Other Products`}
                    storeId={product.storeId._id}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default DetailPage
