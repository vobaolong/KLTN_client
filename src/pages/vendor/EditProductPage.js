import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import VendorLayout from '../../components/layout/VendorLayout'
import VendorEditProductForm from '../../components/item/form/VendorEditProductForm'
import { useTranslation } from 'react-i18next'

const EditProductPage = () => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)
  const { productId } = useParams()
  const { t } = useTranslation()

  const paths = [
    { name: t('breadcrumbs.home'), url: `/vendor/${store._id}` },
    {
      name: t('breadcrumbs.listProduct'),
      url: `/vendor/products/${store._id}`
    },
    {
      name: t('breadcrumbs.updateProduct'),
      url: `/vendor/products/edit/${productId}/${store._id}`
    }
  ]
  return (
    <VendorLayout user={user} store={store} paths={paths}>
      <VendorEditProductForm storeId={store._id} productId={productId} />
    </VendorLayout>
  )
}

export default EditProductPage
