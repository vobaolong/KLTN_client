import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminUserLevelsTable from '../../components/table/AdminUserLevelsTable'
import AdminStoreLevelTable from '../../components/table/AdminStoreLevelTable'
import { useTranslation } from 'react-i18next'

const LevelPage = () => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)
  const [flag, toggleFlag] = useToggle(true)

  return (
    <AdminLayout user={user}>
      <div className='mb-4 bg-body rounded-top-1 box-shadow'>
        <ul className='nav nav-tabs'>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${flag ? 'active' : ''}`}
              onClick={() => toggleFlag(true)}
            >
              <i class='fa-solid fa-user-group me-2'></i>
              <span className='res-hide'>
                {t('levelDetail.userLevel.userLevel')}
              </span>
            </span>
          </li>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${!flag ? 'active' : ''}`}
              onClick={() => toggleFlag(false)}
            >
              <i class='fa-solid fa-store me-2'></i>
              <span className='res-hide'>
                {t('levelDetail.storeLevel.storeLevel')}
              </span>
            </span>
          </li>
        </ul>
      </div>
      {flag ? (
        <AdminUserLevelsTable heading={t('levelDetail.userLevel.userLevel')} />
      ) : (
        <AdminStoreLevelTable
          heading={t('levelDetail.storeLevel.storeLevel')}
        />
      )}
    </AdminLayout>
  )
}

export default LevelPage
