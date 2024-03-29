/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { formatPrice } from '../../helper/formatPrice'
import {
  getNumberOfFollowersForProduct,
  checkFollowingProduct
} from '../../apis/follow'
import StarRating from '../label/StarRating'
import FollowProductButton from '../button/FollowProductButton'
import { useTranslation } from 'react-i18next'
import { calcPercent } from '../../helper/calcPercent'
import MallLabel from '../label/MallLabel'
import defaultImage from '../../assets/default.png'

const IMG = process.env.REACT_APP_STATIC_URL

const ProductCard = ({ product = {}, onRun }) => {
  const [productValue, setProductValue] = useState({})
  const [isHovered, setIsHovered] = useState(false)
  const { t } = useTranslation()

  const salePercent = calcPercent(productValue.price, productValue.salePrice)

  const init = async () => {
    let newProduct = product
    try {
      const res = await getNumberOfFollowersForProduct(product._id)
      newProduct.numberOfFollowers = res.count
    } catch {
      newProduct.numberOfFollowers = 0
    }
    try {
      const { _id, accessToken } = getToken()
      const res = await checkFollowingProduct(_id, accessToken, product._id)
      newProduct.isFollowing = res.success ? true : false
    } catch {
      newProduct.isFollowing = false
    }

    setProductValue(newProduct)
  }

  useEffect(() => {
    init()
  }, [product])

  const onHandleRun = async (newProduct) => {
    if (onRun) onRun(newProduct)
    let numberOfFollowers
    try {
      const data = await getNumberOfFollowersForProduct(newProduct._id)
      numberOfFollowers = data.count
    } catch {
      const currentNumberOfFollowers = productValue.numberOfFollowers
      numberOfFollowers = newProduct.isFollowing
        ? currentNumberOfFollowers + 1
        : currentNumberOfFollowers - 1
    }

    setProductValue({
      ...productValue,
      numberOfFollowers
    })
  }

  return (
    <div className='card border-0 position-relative'>
      <Link
        className='text-reset text-decoration-none product-card'
        to={`/product/${productValue._id}`}
        title={product.name}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className='card-img-top cus-card-img-top position-relative'
          style={{ position: 'relative' }}
        >
          <img
            loading='lazy'
            src={
              productValue.listImages
                ? IMG + productValue.listImages[0]
                : defaultImage
            }
            className='cus-card-img'
            alt={productValue.name}
            style={{
              opacity: isHovered ? 0 : 1,
              transition: 'opacity 0.5s ease'
            }}
          />
          <img
            loading='lazy'
            src={
              productValue.listImages
                ? IMG + productValue.listImages[1]
                : defaultImage
            }
            className='cus-card-img'
            alt={productValue.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.5s ease'
            }}
          />
        </div>
        {salePercent > 0 && (
          <div className='sale-tag'>
            {-salePercent}% {t('productDetail.sale')}
          </div>
        )}
        {productValue.numberOfFollowers > 2 ? (
          <div className='fav-tag'>{t('favorite')}</div>
        ) : (
          ''
        )}
      </Link>

      <div className='card-body'>
        <MallLabel className='mb-2' />
        <small classN ame='card-subtitle'>
          <StarRating stars={productValue.rating} />{' '}
          <small>
            {productValue.sold} {t('productDetail.sold')}
          </small>
        </small>

        <Link
          className='text-reset link-hover d-block mt-1 mb-2'
          to={`/product/${productValue._id}`}
          title={productValue.name}
        >
          <h6
            className='card-title'
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              paddingBottom: '2px'
            }}
          >
            {productValue.name}
          </h6>
        </Link>
        <small className='card-subtitle d-flex justify-content-between align-items-center'>
          <h5 className='text-danger me-2 mb-0'>
            {productValue.salePrice &&
              formatPrice(productValue.salePrice.$numberDecimal)}{' '}
            ₫
          </h5>
          {salePercent !== 0 && (
            <del className='text-muted font-weight-normal text-md'>
              {productValue.price &&
                formatPrice(productValue.price.$numberDecimal)}{' '}
              ₫
            </del>
          )}
        </small>
        <div className='d-flex justify-content-end'>
          {getToken() && (
            <FollowProductButton
              productId={productValue._id}
              isFollowing={productValue.isFollowing}
              onRun={(product) => onHandleRun(product)}
              style={{
                top: '7px',
                position: 'absolute'
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
