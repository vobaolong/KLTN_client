import MainLayout from '../../components/layout/MainLayout'
import ListCategories from '../../components/list/ListCategories'
import ListBestSellerProduct from '../../components/list/ListBestSellerProduct'
import ListHotStores from '../../components/list/ListHotStores'

const HomePage = () => {
  return (
    <MainLayout container='container-md' navFor='user'>
      <div className='mb-4'>
        <ListCategories heading='Danh Mục' />
      </div>

      <div className='mb-4'>
        <ListBestSellerProduct heading='Bán Chạy' />
      </div>

      <div className='mb-4'>
        <ListHotStores heading='Shop Tiêu Biểu' />
      </div>
    </MainLayout>
  )
}

export default HomePage
