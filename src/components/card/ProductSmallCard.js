import { Link } from 'react-router-dom'
import StarRating from '../label/StarRating'
const IMG = process.env.REACT_APP_STATIC_URL

const ProductSmallCard = ({
  product = {},
  borderName = false,
  style = {},
  rating = false
}) => (
  <span
    className={`d-inline-flex align-items-center ${
      borderName && 'bg-value rounded-1 px-1'
    }`}
  >
    <Link
      className='text-decoration-none'
      title={product.name}
      to={`/product/${product._id}`}
    >
      <img
        loading='lazy'
        src={`${IMG + product.listImages[0]}`}
        className='small-product-img'
        alt={product.name}
      />
    </Link>

    <Link
      className='link-hover ms-2'
      to={`/product/${product._id}`}
      title={product.name}
      style={style}
    >
      <span className='product-name'>{product.name}</span>
      {rating && (
        <small>
          {product.rating} <StarRating stars={product.rating} />
        </small>
      )}
    </Link>
  </span>
)

export default ProductSmallCard
