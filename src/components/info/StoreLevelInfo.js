import Paragraph from '../ui/Paragraph'
import { useTranslation } from 'react-i18next'
import { formatDate } from '../../helper/humanReadable'

const StoreLevelInfo = ({ store = {}, border = true }) => {
  const { t } = useTranslation()
  const percent = Math.round(
    (store?.numberOfSuccessfulOrders /
      (store?.numberOfSuccessfulOrders + store?.numberOfFailedOrders)) *
      100 || 100
  )

  return (
    <div className='container-fluid'>
      <div className={`p-2 ${border ? '' : 'py-2'}`}>
        <div className='row mb-2'>
          <div className='col-lg-5 col-md-12 mb-3'>
            <Paragraph
              label={
                <span>
                  <i class='fa-solid fa-star me-2 text-secondary'></i>
                  {t('storeDetail.rating')}
                </span>
              }
              colon
              time={store.numberOfReviews}
              value={
                <span>
                  {store.rating === 0 && store.numberOfReviews === 0
                    ? '4'
                    : store.rating}{' '}
                  / 5 <i class='fa-solid fa-star text-warning'></i>
                </span>
              }
            />
          </div>
          <div className='col-lg-7 col-md-12 mb-3'>
            <Paragraph
              label={
                <span>
                  <i class='fa-solid fa-user-check me-2 text-secondary'></i>
                  {t('joined')}
                </span>
              }
              colon
              value={formatDate(store.createdAt)}
            />
          </div>
          <div className='col-lg-5 col-md-12 mb-3'>
            <Paragraph
              label={
                <span>
                  <i class='fa-solid fa-user-group me-2 text-secondary'></i>
                  {t('userDetail.followers')}
                </span>
              }
              colon
              value={<span>{store.numberOfFollowers}</span>}
            />
          </div>
          <div className='col-lg-7 col-md-12 mb-3'>
            <Paragraph
              label={
                <span>
                  <i class='fa-solid fa-square-check me-2 text-secondary'></i>
                  {t('success/failure')}
                </span>
              }
              colon
              value={<span>{percent} %</span>}
            />
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreLevelInfo
