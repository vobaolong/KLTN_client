import { useSelector } from 'react-redux'
import VendorLayout from '../../components/layout/VendorLayout'
import VendorCreateProductForm from '../../components/item/form/VendorCreateProductForm'
import { useTranslation } from 'react-i18next'

const CreateProductPage = () => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)
  const { t } = useTranslation()

  const paths = [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('breadcrumbs.myStore'), url: '/account/store' },
    { name: t('breadcrumbs.product'), url: `/vendor/products/${store._id}` },
    {
      name: t('breadcrumbs.addProduct'),
      url: `/vendor/products/addNew/${store._id}`
    }
  ]
  return (
    <VendorLayout user={user} store={store} paths={paths}>
      <VendorCreateProductForm storeId={store._id} />
    </VendorLayout>
  )
}

export default CreateProductPage
