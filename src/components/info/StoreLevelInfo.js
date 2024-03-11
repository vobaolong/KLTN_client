import StoreLevelLabel from '../label/StoreLevelLabel'
import StarRating from '../label/StarRating'
import Paragraph from '../ui/Paragraph'
import { useTranslation } from 'react-i18next'

const StoreLevelInfo = ({ store = {}, border = true }) => {
  const { t } = useTranslation()
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
            label='Rating'
            value={
              <StarRating
                stars={
                  store.rating === 0 && store.numberOfReviews === 0
                    ? 3
                    : store.rating
                }
              />
            }
          />
        </div>

        <div className='col-sm-6'>
          <Paragraph
            label={t('success/failure')}
            value={
              <span>
                <i className='far fa-check-circle me-1 text-success'></i>
                {store.numberOfSuccessfulOrders}/
                <i className='far fa-times-circle me-1 text-danger'></i>
                {store.numberOfFailedOrders}
              </span>
            }
          />
        </div>

        <div className='col-sm-6'>
          <Paragraph
            label={t('userDetail.followers')}
            value={
              <span>
                <i className='fas fa-heart me-1 link-pink'></i>
                {store.numberOfFollowers}
              </span>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default StoreLevelInfo
