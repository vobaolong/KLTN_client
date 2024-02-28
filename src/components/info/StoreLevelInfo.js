import StoreLevelLabel from '../label/StoreLevelLabel'
import StarRating from '../label/StarRating'
import Paragraph from '../ui/Paragraph'

const StoreLevelInfo = ({ store = {}, border = true }) => (
  <div className='container-fluid'>
    <div
      className={
        border
          ? 'row bg-body shadow rounded-3'
          : 'row py-2 border border-primary rounded-3'
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
                store.rating == 0 && store.numberOfReviews == 0
                  ? 3
                  : store.rating
              }
            />
          }
        />
      </div>

      <div className='col-sm-6'>
        <Paragraph
          label='Successful / failed orders'
          value={
            <span>
              <i className='far fa-check-circle me-1 text-info'></i>
              {store.numberOfSuccessfulOrders} /{' '}
              <i className='far fa-times-circle me-1 text-danger'></i>
              {store.numberOfFailedOrders}
            </span>
          }
        />
      </div>

      <div className='col-sm-6'>
        <Paragraph
          label='Followers'
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

export default StoreLevelInfo
