import { useSelector } from 'react-redux'
import SellerLayout from '../../components/layout/SellerLayout'
import StoreProductsTable from '../../components/table/StoreProductsTable'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const ProductsPage = () => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.seller.store)
  const paths = [
    { name: t('breadcrumbs.home'), url: `/seller/${store._id}` },
    {
      name: t('breadcrumbs.listProduct'),
      url: `/seller/products/${store._id}`
    }
  ]
  const [selectedOption, setSelectedOption] = useState('all')
  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }

  return (
    <SellerLayout user={user} store={store} paths={paths}>
      <div className='d-flex align-items-start justify-content-between mb-3'>
        <h4>Danh sách sản phẩm</h4>
        <Link
          type='button'
          className='btn btn-primary ripple text-nowrap rounded-1 ms-2'
          to={`/seller/products/addNew/${store._id}`}
        >
          <i className='fa-light fa-plus me-1'></i>
          <span>{t('productDetail.createProduct')}</span>
        </Link>
      </div>

      <div className='mb-2 bg-body rounded-top-1 box-shadow'>
        <ul className='nav nav-tabs'>
          <li className='nav-item col-3 text-center pointer'>
            <span
              className={`nav-link ${selectedOption === 'all' ? 'active' : ''}`}
              onClick={() => handleOptionClick('all')}
            >
              <span>{t('productDetail.all')}</span>
            </span>
          </li>

          <li className='nav-item col-3 text-center pointer'>
            <span
              className={`nav-link ${
                selectedOption === 'selling' ? 'active' : ''
              }`}
              onClick={() => handleOptionClick('selling')}
            >
              <span>{t('productDetail.selling')}</span>
            </span>
          </li>

          <li className='nav-item col-3 text-center pointer'>
            <span
              className={`nav-link ${
                selectedOption === 'hidden' ? 'active' : ''
              }`}
              onClick={() => handleOptionClick('hidden')}
            >
              <span>{t('productDetail.hidden')}</span>
            </span>
          </li>
          {/* thêm đoạn này */}
          <li className='nav-item col-3 text-center pointer'>
            <span
              className={`nav-link ${
                selectedOption === 'outOfStock' ? 'active' : ''
              }`}
              onClick={() => handleOptionClick('outOfStock')}
            >
              <span>{t('productDetail.outOfStock')}</span>
            </span>
          </li>
        </ul>
      </div>

      <StoreProductsTable storeId={store._id} selectedOption={selectedOption} />
    </SellerLayout>
  )
}

export default ProductsPage
