import { Link } from 'react-router-dom'
import defaultImage from '../../assets/default.png'
const IMG = process.env.REACT_APP_STATIC_URL

const StoreSmallCard = ({
  store = {},
  borderName = false,
  link = `/store/${store._id}`
}) => (
  <span
    className={`d-inline-flex align-items-center ${
      borderName && 'bg-body shadow p-1 rounded-2'
    }`}
  >
    <Link className='text-reset text-decoration-none' to={link}>
      <img
        loading='lazy'
        src={store.avatar ? IMG + store.avatar : defaultImage}
        className='small-card-img'
        alt={store.name}
      />
    </Link>
    <Link className='text-reset link-hover m-auto ms-2' to={link}>
      <span style={{ fontSize: '0.9rem' }}>{store.name}</span>
    </Link>
  </span>
)

export default StoreSmallCard
