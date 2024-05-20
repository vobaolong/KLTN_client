import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = ({ paths }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 150)
    }

    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  if (!Array.isArray(paths)) {
    return null
  }

  return (
    <nav
      style={{
        position: isScrolled ? 'sticky' : 'relative',
        top: isScrolled ? '80px' : 'auto',
        background: isScrolled ? '#fff' : 'transparent',
        padding: isScrolled ? '10px' : '10px',
        zIndex: 3,
        boxShadow: isScrolled
          ? 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
          : '',
        borderRadius: '5px',
        transition: 'all 0.3s ease-in-out',
        transform: isScrolled ? 'translateY(0)' : 'translateY(-20px)'
      }}
      aria-label='breadcrumb'
    >
      <ol className='breadcrumb mb-0'>
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
