import { Link } from 'react-router-dom'
const IMG = process.env.REACT_APP_STATIC_URL

const ProductSmallCard = ({ product = {}, borderName = false, style = {} }) => (
  <span
    className={`d-inline-flex align-items-center ${
      borderName && 'bg-body shadow'
    }`}
  >
    <Link
      className='text-reset text-decoration-none'
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
      className='text-reset link-hover ms-2'
      to={`/product/${product._id}`}
      title={product.name}
      style={style}
    >
      <span style={{ fontSize: '0.9rem' }}>{product.name}</span>
    </Link>
  </span>
)

export default ProductSmallCard
