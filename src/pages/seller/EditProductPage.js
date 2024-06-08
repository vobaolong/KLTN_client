import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import SellerLayout from '../../components/layout/SellerLayout'
import SellerEditProductForm from '../../components/item/form/SellerEditProductForm'
import { useTranslation } from 'react-i18next'

const EditProductPage = () => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.seller.store)
  const { productId } = useParams()
  const { t } = useTranslation()

  const paths = [
    { name: t('breadcrumbs.home'), url: `/seller/${store._id}` },
    {
      name: t('breadcrumbs.listProduct'),
      url: `/seller/products/${store._id}`
    },
    {
      name: t('breadcrumbs.updateProduct'),
      url: `/seller/products/edit/${productId}/${store._id}`
    }
  ]
  return (
    <SellerLayout user={user} store={store} paths={paths}>
      <SellerEditProductForm storeId={store._id} productId={productId} />
    </SellerLayout>
  )
}

export default EditProductPage
