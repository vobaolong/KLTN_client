import MainLayout from '../../components/layout/MainLayout'
import ListCategories from '../../components/list/ListCategories'
import ListBestSellerProduct from '../../components/list/ListBestSellerProduct'
import ListHotStores from '../../components/list/ListHotStores'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <MainLayout container='container-md' navFor='user'>
      <div className='mb-4'>
        <ListCategories heading={t('categories')} />
      </div>

      <div className='mb-4'>
        <ListBestSellerProduct heading={t('bestSeller')} />
      </div>

      <div className='mb-4'>
        <ListHotStores heading={t('hotShop')} />
      </div>
    </MainLayout>
  )
}

export default HomePage
