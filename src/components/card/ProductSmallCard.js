import { Link } from 'react-router-dom'
const IMG = process.env.REACT_APP_STATIC_URL

const ProductSmallCard = ({ product = {}, borderName = false, style = {} }) => (
  <span
    className={`d-inline-flex align-items-center ${
      borderName && 'bg-body shadow'
    }`}
  >
    <Link
      className='text-reset text-decoration-none me-2'
      title={product.name}
      to={`/product/${product._id}`}
    >
      <img
        src={`${IMG + product.listImages[0]}`}
        className='small-product-img'
        alt={product.name}
      />
    </Link>

    <Link
      className='text-reset link-hover'
      to={`/product/${product._id}`}
      title={product.name}
      style={style}
    >
      <span className='fs-6'>{product.name}</span>
    </Link>
  </span>
)

export default ProductSmallCard
