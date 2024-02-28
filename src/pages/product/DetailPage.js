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

const DetailPage = () => {
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
          setError('This store is banned by ZenMetic!')
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

  return (
    <MainLayout>
      <div className='position-relative'>
        {isLoading && <Loading />}
        {error ? (
          <Error msg={error} />
        ) : (
          <div className='container-fluid'>
            <div className='mb-5'>
              <CategorySmallCard category={product.categoryId} parent={true} />
            </div>
            <div className='row'>
              <div className='col-lg-5 col-md-6 mb-4'>
                <Carousel
                  listImages={product.listImages}
                  alt={product.name}
                  style={{
                    paddingBottom: 'calc(2/3*100%)'
                  }}
                />
              </div>

              <div className='col-lg-5 col-md-6 mb-4'>
                <strong className='text-primary text-lg-right hidden-avatar'>
                  <StoreSmallCard store={product.storeId} />
                </strong>
                <h5 className=''>{product.name}</h5>
                <small>{product.rating}</small>
                <div className='d-flex flex-wrap justify-content-right align-items-center mt-3'>
                  <h2 className='text-primary fs-3 m-0 me-2'>
                    {product.salePrice &&
                      formatPrice(product.salePrice.$numberDecimal)}{' '}
                    ₫
                  </h2>

                  <p className='text-decoration-line-through text-muted mt-1'>
                    {product.price && formatPrice(product.price.$numberDecimal)}{' '}
                    ₫
                  </p>
                </div>

                <div className='mt-4'>
                  {product.storeId && !product.storeId.isOpen && (
                    <Error msg="This store is closed, can' t order in this time!" />
                  )}
                  {product.quantity <= 0 && (
                    <Error msg='The product is sold out!' />
                  )}
                  {!getToken() && (
                    <SigninButton
                      className='w-100 btn-lg'
                      title='Sign in to shop!'
                    />
                  )}
                  {product.storeId &&
                    product.storeId.isOpen &&
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
                      className='mt-2 w-100 btn-lg'
                    />
                  )}
                </div>
              </div>
              <div className='col-lg-2 col-md-0 mb-4 bg-primary'></div>

              <div className='col-12'>
                <div className='container-fluid p-0'>
                  <div className='row res-flex-reverse-md'>
                    <div className='col-md-8 p-0'>
                      <ListReviews productId={product._id} />
                    </div>

                    <div className='col-md-4 mb-5'>
                      <Paragraph
                        value={product.description}
                        label='Description'
                        multiLine={true}
                      />
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
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default DetailPage
