/* eslint-disable jsx-a11y/no-distracting-elements */
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
      <marquee className='mb-4 text-muted'>
        <span className='me-5'>
          <i class='fa-solid fa-repeat me-2 text-primary'></i>
          Được hoàn tiền 111% nếu là hàng giả.
        </span>
        <span className='me-5'>
          <i class='fa-solid fa-rotate-left me-2 text-primary'></i>
          Đổi trả miễn phí tại nhà trong 30 ngày nếu sản phẩm lỗi.
        </span>
        <span className='me-5'>
          <i class='fa-solid fa-box-open me-2 text-primary'></i>
          Được mở hộp kiểm tra khi nhận hàng.
        </span>
      </marquee>
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
