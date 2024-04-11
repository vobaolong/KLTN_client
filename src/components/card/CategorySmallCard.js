import { Link } from 'react-router-dom'
import chevronSvg from '../../assets/chevron-thin-right.svg'

const CategorySmallCard = ({ category = {}, style = {}, parent = true }) => (
  <span className='d-inline-flex align-items-center' style={style}>
    <Link
      className='text-reset text-decoration-none cus-link-hover'
      to={`/category/${category._id}`}
    >
      <span>
        {parent && category.categoryId && category.categoryId.categoryId && (
          <>
            {category.categoryId.categoryId.name}{' '}
            <img src={chevronSvg} alt='chevron' />{' '}
          </>
        )}
        {parent && category.categoryId && (
          <>
            {category.categoryId.name} <img src={chevronSvg} alt='chevron' />{' '}
          </>
        )}
        {category.name}
      </span>
    </Link>
  </span>
)

export default CategorySmallCard
