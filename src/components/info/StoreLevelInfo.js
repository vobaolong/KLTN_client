import StoreLevelLabel from '../label/StoreLevelLabel'
import StarRating from '../label/StarRating'
import Paragraph from '../ui/Paragraph'
import { useTranslation } from 'react-i18next'

const StoreLevelInfo = ({ store = {}, border = true }) => {
  const { t } = useTranslation()
  console.log(store)
  return (
    <div className='container-fluid'>
      <div
        className={
          border ? 'row bg-body shadow rounded-1' : 'row py-2 border rounded-1'
        }
      >
        <div className='col-sm-6'>
          <Paragraph
            label='Point'
            colon
            value={
              <span className='d-flex justify-content-right align-items-center'>
                {store.point}
                <small className='ms-2'>
                  <StoreLevelLabel level={store.level} />
                </small>
              </span>
            }
          />
        </div>

        <div className='col-sm-6'>
          <Paragraph
            label={
              <span>
                <i class='fa-regular fa-star me-1 text-secondary'></i>
                Rating
              </span>
            }
            colon
            time={store.numberOfReviews}
            value={
              store.rating === 0 && store.numberOfReviews === 0
                ? '3'
                : store.rating
            }
          />
        </div>

        <div className='col-sm-6'>
          <Paragraph
            label={
              <span>
                <i class='fa-solid fa-user-group me-1 text-secondary'></i>
                {t('userDetail.followers')}
              </span>
            }
            colon
            value={<span>{store.numberOfFollowers}</span>}
          />
        </div>
        <div className='col-sm-6'>
          <small>{t('success/failure')}</small>
          <br />
          <small>
            <i className='far fa-check-circle me-1 text-success'></i>
            {store.numberOfSuccessfulOrders}/
            <i className='far fa-times-circle me-1 text-danger'></i>
            {store.numberOfFailedOrders}
          </small>
        </div>
      </div>
    </div>
  )
}

export default StoreLevelInfo
