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
  const productStatus = [
    {
      label: t('productDetail.all'),
      value: 'all'
    },
    { label: t('productDetail.selling'), value: 'selling' },
    { label: t('productDetail.hidden'), value: 'hidden' },
    { label: t('productDetail.outOfStock'), value: 'outOfStock' },
    { label: t('status.infringing'), value: 'infringing' }
  ]

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

      <div className='nav nav-tabs bg-body rounded-top-1 box-shadow mb-2'>
        {productStatus.map((status) => (
          <li
            className='nav-item flex-grow-1 text-center pointer'
            key={status.value}
          >
            <span
              className={`nav-link h-100 ${
                selectedOption === status.value ? `active` : ``
              }`}
              onClick={() => handleOptionClick(status.value)}
            >
              {status.label}
            </span>
          </li>
        ))}
      </div>

      <StoreProductsTable storeId={store._id} selectedOption={selectedOption} />
    </SellerLayout>
  )
}

export default ProductsPage
