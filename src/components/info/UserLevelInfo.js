import { useTranslation } from 'react-i18next'
import UserLevelLabel from '../label/UserLevelLabel'
import Paragraph from '../ui/Paragraph'
import { formatDate } from '../../helper/humanReadable'
import UserRoleLabel from '../label/UserRoleLabel'
import Skeleton from 'react-loading-skeleton'

const UserLevelInfo = ({ user = {}, border = true }) => {
  const { t } = useTranslation()

  return (
    <div className={border ? 'p-2 px-4' : 'p-2 border bg-body rounded-2'}>
      <div className='row mb-2 gap-2'>
        <div className='col-12'>
          {user.createdAt ? (
            <Paragraph
              label={
                <span>
                  <i className='fa-light fa-user-check me-2 text-secondary'></i>
                  {t('joined')}
                </span>
              }
              colon
              value={
                <span className='text-primary'>
                  {formatDate(user.createdAt)}
                </span>
              }
            />
          ) : (
            <Skeleton width={200} height={30} />
          )}
        </div>
        <div className='col-12'>
          {user.level ? (
            <Paragraph
              label={
                <span>
                  <i className='fa-light fa-ranking-star me-2 text-secondary'></i>
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
          ) : (
            <Skeleton width={200} height={30} />
          )}
        </div>
        <div className='col-12'>
          {user.role ? (
            <Paragraph
              label={
                <span>
                  <i className='fa-light fa-user-tag me-2 text-secondary'></i>
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
          ) : (
            <Skeleton width={200} height={30} />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserLevelInfo
