import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = ({ paths }) => {
  if (!Array.isArray(paths)) {
    return null
  }
  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        {paths?.map((path, index) => (
          <li key={index} className='breadcrumb-item'>
            {index === paths.length - 1 ? (
              <Link className='breadcrumb-item active' to={path.url}>
                {path.name}
              </Link>
            ) : (
              <Link
                className='breadcrumb-item text-decoration-none'
                to={path.url}
              >
                {path.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
