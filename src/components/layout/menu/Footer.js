import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listActiveCategories } from '../../../apis/category'
import Logo from './Logo'

//cre: Scanfcode.com footer template
const Footer = (props) => {
  const [categories, setCategories] = useState([])

  const loadCategories = () => {
    listActiveCategories({
      search: '',
      categoryId: null,
      sortBy: 'name',
      order: 'asc',
      limit: 6,
      page: 1
    })
      .then((data) => {
        if (data.error) return
        else setCategories(data.categories)
      })
      .catch((error) => {
        return
      })
  }

  useEffect(() => loadCategories(), [])

  return (
    <footer className='site-footer'>
      <div className='container-lg'>
        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <div className='mb-4'>
              <h6>About</h6>
              <div className='mt-4 mb-2 d-block'>
                <Logo />
              </div>
              <p style={{ textAlign: 'justify' }}>
                <i className='text-uppercase'>an e-commerce website, </i>
                where people come together to make, sell, buy, and collect
                unique items. We’re also a community pushing for positive change
                for small businesses, people, and the planet. Here are some of
                the ways we’re making a positive impact, together.
              </p>
            </div>
          </div>

          <div className='col-xs-6 col-md-3'>
            <h6>Categories</h6>
            <ul className='footer-links'>
              {categories &&
                categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      className='text-reset'
                      to={`/category/${category._id}`}
                      title={category.name}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className='col-xs-6 col-md-3'>
            <h6>Quick Links</h6>
            <ul className='footer-links'>
              <li>
                <Link className='link-hover text-reset' to='#'>
                  About Us
                </Link>
              </li>
              <li>
                <Link className='link-hover text-reset' to='#'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className='link-hover text-reset' to='#'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-sm-6 col-xs-12'>
            <p className='copyright-text'>
              Copyright &copy; 2024 All Rights Reserved by{' '}
              <Link className='link-hover text-reset' to='#'>
                ZenMetic
              </Link>
              .
            </p>
          </div>

          <div className='col-md-4 col-sm-6 col-xs-12'>
            <ul className='social-icons'>
              <li>
                <Link className='social' to='#' target='_blank'>
                  <i className='fab fa-facebook'></i>
                </Link>
              </li>
              <li>
                <Link className='social' to='#'>
                  <i className='fab fa-google'></i>
                </Link>
              </li>
              <li>
                <Link className='social' to='#' target='_blank'>
                  <i className='fab fa-github'></i>
                </Link>
              </li>
              <li>
                <Link className='social' to='#'>
                  <i className='fab fa-linkedin'></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
