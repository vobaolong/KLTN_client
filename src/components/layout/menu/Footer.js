import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listActiveCategories } from '../../../apis/category'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const [categories, setCategories] = useState([])

  const loadCategories = () => {
    listActiveCategories({
      search: '',
      categoryId: null,
      sortBy: 'name',
      order: 'asc',
      limit: 10,
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
      <div className='container-md'>
        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <div className='mb-4'>
              <span style={{ textAlign: 'justify' }}>
                <b>{t('footer.title')}</b>
                <span className='text-muted'>
                  <p className='mt-2 font-weight-bold'>{t('footer.p1')}</p>
                  <small className='lh-1'>{t('footer.small1')}</small>
                </span>
                <span className='text-muted'>
                  <p className='mt-2 font-weight-bold'>{t('footer.p2')}</p>
                  <small>{t('footer.small2')}</small>
                </span>
              </span>
            </div>
          </div>

          <div className='col-xs-6 col-md-3'>
            <h6>{t('categories')}</h6>
            <ul className='footer-links'>
              {categories?.map((category, index) => (
                <li key={index}>
                  <Link
                    className='link-hover'
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
            <h6>{t('footer.quickLink')}</h6>
            <ul className='footer-links'>
              <li>
                <Link className='link-hover text-reset' to='#'>
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link className='link-hover text-reset' to='/legal/privacy'>
                  {t('footer.policy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className='container-md'>
        <div className='row'>
          <div className='col-md-8 col-sm-6 col-xs-12'>
            <span className='copyright-text text-center'>
              Copyright &copy; {new Date().getFullYear()} All Rights Reserved by{' '}
              <Link className='link-hover text-reset' to='#'>
                Zenpii
              </Link>
              .
            </span>
          </div>

          <div className='col-md-4 col-sm-6 col-xs-12'>
            <ul className='social-icons text-start'>
              <li>
                <a
                  className='social'
                  href='https://www.facebook.com/baolong317/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-facebook'></i>
                </a>
              </li>
              <li>
                <Link className='social' to='#'>
                  <i className='fab fa-google'></i>
                </Link>
              </li>
              <li>
                <a
                  className='social'
                  href='https://github.com/vobaolong/KLTN_client'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-github'></i>
                </a>
              </li>
              <li>
                <a
                  className='social'
                  href='https://www.linkedin.com/in/v%C3%B5-b%E1%BA%A3o-long-486ba9265/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-linkedin'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
