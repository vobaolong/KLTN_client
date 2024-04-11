import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminProductsTable from '../../components/table/AdminProductsTable'
import { useTranslation } from 'react-i18next'

const ProductPage = () => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)
  const [flag, toggleFlag] = useToggle(true)

  return (
    <AdminLayout user={user}>
      <div className='mb-4 bg-body rounded-top-1 box-shadow'>
        <ul className='nav nav-tabs'>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`text-primary nav-link ${flag ? 'active' : ''}`}
              onClick={() => toggleFlag(true)}
            >
              <i className='fa-solid fa-circle-check me-2'></i>
              <span className='res-hide'>{t('title.listActiveProducts')}</span>
            </span>
          </li>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`text-danger nav-link ${!flag ? 'active' : ''}`}
              onClick={() => toggleFlag(false)}
            >
              <i className='fa-solid fa-ban me-2'></i>
              <span className='res-hide'>{t('title.listBannedProducts')}</span>
            </span>
          </li>
        </ul>
      </div>
      <AdminProductsTable isActive={flag} />
    </AdminLayout>
  )
}

export default ProductPage
