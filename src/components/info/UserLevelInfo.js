import { useTranslation } from 'react-i18next'
import UserLevelLabel from '../label/UserLevelLabel'
import Paragraph from '../ui/Paragraph'

const UserLevelInfo = ({ user = {}, border = true }) => {
  const { t } = useTranslation()
  console.log(user)
  return (
    <div className='container-fluid'>
      <div
        className={
          border ? 'row bg-body shadow rounded-1' : 'row py-2 border rounded-1'
        }
      >
        <div className='col-12'>
          <Paragraph
            label={t('point')}
            colon
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
            label={t('success/failure')}
            value={
              <span>
                <i className='far fa-check-circle me-1 text-success'></i>
                {user.numberOfSuccessfulOrders}/
                <i className='far fa-times-circle me-1 text-danger'></i>
                {user.numberOfFailedOrders}
              </span>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default UserLevelInfo
