import { Link } from 'react-router-dom'
const IMG = process.env.REACT_APP_STATIC_URL

const ProductSmallCard = ({ product = {}, borderName = false, style = {} }) => (
  <span
    className={`d-inline-flex align-items-center ${
      borderName && 'bg-value rounded-1 px-1'
    }`}
  >
    <Link
      className='text-reset text-decoration-none'
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
      className='text-reset link-hover ms-2'
      to={`/product/${product._id}`}
      title={product.name}
      style={style}
    >
      <span
        style={{
          fontSize: '0.9rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical'
        }}
      >
        {product.name}
      </span>
    </Link>
  </span>
)

export default ProductSmallCard
