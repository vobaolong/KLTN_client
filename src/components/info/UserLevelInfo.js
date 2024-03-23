import { useTranslation } from 'react-i18next'
import UserLevelLabel from '../label/UserLevelLabel'
import Paragraph from '../ui/Paragraph'
import { formatDate } from '../../helper/humanReadable'
import UserRoleLabel from '../label/UserRoleLabel'

const UserLevelInfo = ({ user = {}, border = true }) => {
  const { t } = useTranslation()

  console.log(user)
  return (
    <div className='container-fluid'>
      <div className={border ? 'p-2' : 'border p-2'}>
        <div className='row mb-2'>
          <div className='col-12 mb-3'>
            <Paragraph
              label={
                <span>
                  <i class='fa-solid fa-user-check me-2 text-secondary'></i>
                  {t('joined')}
                </span>
              }
              colon
              value={formatDate(user.createdAt)}
            />
          </div>
          <div className='col-12 mb-3'>
            <Paragraph
              label={
                <span>
                  <i class='fa-solid fa-ranking-star me-2 text-secondary'></i>
                  {t('userDetail.level')}
                </span>
              }
              colon
              value={
                <span>
                  <UserLevelLabel level={user.level} />
                </span>
              }
            />
          </div>
          <div className='col-12 mb-3'>
            <Paragraph
              label={
                <span>
                  <i class='fa-solid fa-user-shield me-2 text-secondary'></i>
                  {t('role')}
                </span>
              }
              colon
              value={
                <span>
                  <UserRoleLabel role={user.role} />
                </span>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLevelInfo
