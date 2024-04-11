/* eslint-disable jsx-a11y/no-distracting-elements */
import MainLayout from '../../components/layout/MainLayout'
import ListCategories from '../../components/list/ListCategories'
import ListBestSellerProduct from '../../components/list/ListBestSellerProduct'
import ListHotStores from '../../components/list/ListHotStores'
import { useTranslation } from 'react-i18next'
import MetaData from '../../components/layout/meta/MetaData'
import Policy from '../../components/ui/Policy'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <MainLayout container='container-md' navFor='user'>
      <MetaData title={`Zenpii Việt Nam | Mua và Bán Trên Website`} />

      <div className='mb-4'>
        <ListCategories heading={t('categories')} />
      </div>
      <Policy />
      <div className='mb-4'>
        <ListBestSellerProduct heading={t('bestSeller')} />
      </div>

      <div className='mb-4'>
        <ListHotStores heading={t('hotStore')} />
      </div>
    </MainLayout>
  )
}

export default HomePage
