import UserLevelLabel from '../label/UserLevelLabel'
import Paragraph from '../ui/Paragraph'

const UserLevelInfo = ({ user = {}, border = true }) => (
  <div className='container-fluid'>
    <div
      className={
        border
          ? 'row bg-body shadow rounded-3'
          : 'row py-2 border border-primary rounded-3'
      }
    >
      <div className='col-12'>
        <Paragraph
          label='Point'
          value={
            <span className='d-flex justify-content-right align-items-center'>
              {user.point}
              <small className='ms-2'>
                <UserLevelLabel level={user.level} />
              </small>
            </span>
          }
        />
      </div>

      <div className='col-12'>
        <Paragraph
          label='Successful / failed orders'
          value={
            <span>
              <i className='far fa-check-circle me-1 text-info'></i>
              {user.numberOfSuccessfulOrders} /{' '}
              <i className='far fa-times-circle me-1 text-danger'></i>
              {user.numberOfFailedOrders}
            </span>
          }
        />
      </div>
    </div>
  </div>
)

export default UserLevelInfo
