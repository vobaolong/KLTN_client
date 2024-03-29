import { Link } from 'react-router-dom'

const CategorySmallCard = ({ category = {}, style = {}, parent = true }) => (
  <span className='d-inline-flex align-items-center' style={style}>
    <Link
      className='text-reset text-decoration-none mt-2 ms-2 cus-link-hover'
      to={`/category/${category._id}`}
    >
      <span>
        {parent &&
          category.categoryId &&
          category.categoryId.categoryId &&
          category.categoryId.categoryId.name + ' > '}
        {parent && category.categoryId && category.categoryId.name + ' > '}
        {category.name}
      </span>
    </Link>
  </span>
)

export default CategorySmallCard
