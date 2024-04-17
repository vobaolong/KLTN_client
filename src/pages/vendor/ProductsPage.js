import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import VendorLayout from '../../components/layout/VendorLayout'
import StoreProductsTable from '../../components/table/StoreProductsTable'
import { useTranslation } from 'react-i18next'

const ProductsPage = () => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)
  const [flag, toggleFlag] = useToggle(true)
  const paths = [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('breadcrumbs.myStore'), url: '/account/store' },
    { name: t('breadcrumbs.product'), url: `/vendor/products/$${store._id}` }
  ]

  return (
    <VendorLayout user={user} store={store} paths={paths}>
      <div className='mb-2 bg-body rounded-top-1 box-shadow'>
        <ul className='nav nav-tabs'>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${flag ? 'active' : ''}`}
              onClick={() => toggleFlag(true)}
            >
              <i className='fa-solid fa-box me-2'></i>
              <span className='res-hide'>{t('productDetail.show')}</span>
            </span>
          </li>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${!flag ? 'active' : ''}`}
              onClick={() => toggleFlag(false)}
            >
              <i className='fa-solid fa-archive me-2'></i>
              <span className='res-hide'>{t('productDetail.hide')}</span>
            </span>
          </li>
        </ul>
      </div>
      <StoreProductsTable storeId={store._id} isSelling={flag} />
    </VendorLayout>
  )
}

export default ProductsPage
