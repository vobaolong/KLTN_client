import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listActiveCategories } from '../../../apis/category'
import { useTranslation } from 'react-i18next'
import ListCategoryFooter from '../../list/ListCategoryFooter'
import masterCard from '../../../assets/mastercard.svg'
import cod from '../../../assets/cod.svg'
import paypal from '../../../assets/paypal.svg'
import visa from '../../../assets/visa.svg'

const Footer = () => {
  const { t } = useTranslation()
  const [categories, setCategories] = useState([])
  const loadCategories = () => {
    listActiveCategories({
      search: '',
      categoryId: null,
      sortBy: 'name',
      order: 'asc',
      limit: 30,
      page: 1
    })
      .then((data) => {
        if (data.error) return
        else {
          setCategories(data.categories)
        }
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
                <b className='text-dark-emphasis'>{t('footer.title')}</b>
                <span className='text-muted'>
                  <p className='mt-2 font-weight-bold'>{t('footer.p1')}</p>
                  <small className='lh-1'>{t('footer.small1')}</small>
                </span>
              </span>
            </div>
          </div>

          <div className='col-sm-12 col-md-3'>
            <h6 className='text-dark-emphasis fw-bold'>
              {t('footer.quickLink')}
            </h6>
            <ul className='footer-links '>
              <li>
                <Link className='link-hover text-secondary' to='#'>
                  <small>{t('footer.about')}</small>
                </Link>
              </li>
              <li>
                <Link className='link-hover text-secondary' to='/legal/privacy'>
                  <small>{t('footer.policy')}</small>
                </Link>
              </li>
            </ul>
          </div>

          <div className='col-sm-12 col-md-3'>
            <h6 className='text-dark-emphasis fw-bold'>
              {t('footer.payment')}
            </h6>
            <div className='d-flex gap-1'>
              <span style={{ width: '40px', height: '40px' }}>
                <img
                  className='w-100 p-1 rounded-1 bg-body'
                  src={cod}
                  alt='cod'
                />
              </span>
              <span style={{ width: '40px', height: '40px' }}>
                <img
                  className='w-100 p-1 rounded-1 bg-body'
                  src={masterCard}
                  alt='masterCard'
                />
              </span>
              <span style={{ width: '40px', height: '40px' }}>
                <img
                  className='w-100 p-1 rounded-1 bg-body'
                  src={paypal}
                  alt='paypal'
                />
              </span>
              <span style={{ width: '40px', height: '40px' }}>
                <img
                  className='w-100 p-1 rounded-1 bg-body'
                  src={visa}
                  alt='visa'
                />
              </span>
            </div>
          </div>
          <div className='col-12'>
            <hr />
            <h6 className='text-dark-emphasis fw-bold'>{t('categories')}</h6>
            <div className='footer-links row'>
              {categories?.map((category, index) => (
                <span key={index} className='col-3 mt-2'>
                  <ListCategoryFooter category={category} />
                </span>
              ))}
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className='container-md'>
        <div className='row my-2'>
          <div className='col-12 text-center'>
            <span className='copyright-text text-center'>
              Copyright &copy; {new Date().getFullYear()} All Rights Reserved by{' '}
              <Link className='link-hover text-reset' to='#'>
                Zenpii
              </Link>
              .
            </span>
          </div>

          <div className='col-12 mt-2'>
            <ul className='social-icons justify-content-center'>
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
