/* eslint-disable jsx-a11y/no-distracting-elements */
import MainLayout from '../../components/layout/MainLayout'
import ListCategories from '../../components/list/ListCategories'
import ListBestSellerProduct from '../../components/list/ListBestSellerProduct'
import { useTranslation } from 'react-i18next'
import MetaData from '../../components/layout/meta/MetaData'
import Offers from '../../components/ui/Offers'
import ListBanner from '../../components/list/ListBanner'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <MainLayout container='container-md' navFor='user'>
      <MetaData title={`Zenpii Việt Nam | Mua và Bán Trên Website`} />
      <div className='mb-4 pt-4'>
        <ListBanner />
      </div>
      <div className='mb-4'>
        <ListCategories heading={t('categories')} />
      </div>
      <Offers />
      <div className='mb-4'>
        <ListBestSellerProduct heading={t('bestSeller')} sortBy='sold' />
      </div>
      <div className='mb-4'>
        <ListBestSellerProduct heading={t('newProduct')} sortBy='createdAt' />
      </div>
    </MainLayout>
  )
}

export default HomePage
