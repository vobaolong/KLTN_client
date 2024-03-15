import { Link } from 'react-router-dom'
const IMG = process.env.REACT_APP_STATIC_URL

const UserSmallCard = ({
  user = {},
  borderName = false,
  style = {},
  link = `/user/${user._id}`
}) => (
  <span
    className={`d-inline-flex align-items-center ${
      borderName && 'bg-body shadow'
    }`}
    style={style}
  >
    <Link
      className='text-reset text-decoration-none'
      title={user.firstName + ' ' + user.lastName}
      to={link}
    >
      <img
        src={`${IMG + user.avatar}`}
        className='small-card-img'
        alt={user.firstName + ' ' + user.lastName}
      />
    </Link>

    <Link
      className='text-reset link-hover ms-2'
      title={user.firstName + ' ' + user.lastName}
      to={link}
      style={style}
    >
      <span style={{ fontSize: '0.9rem' }}>
        {user.firstName + ' ' + user.lastName}
      </span>
    </Link>
  </span>
)

export default UserSmallCard
