import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminUserLevelsTable from '../../components/table/AdminUserLevelsTable'
import AdminStoreLevelsTable from '../../components/table/AdminStoreLevelsTable'
import { useTranslation } from 'react-i18next'

const LevelPage = () => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)
  const [flag, toggleFlag] = useToggle(true)
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.level'), url: '/admin/level' }
  ]

  return (
    <AdminLayout user={user} paths={paths}>
      <div className='mb-2 bg-body rounded-top-1 box-shadow'>
        <ul className='nav nav-tabs'>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${flag ? 'active' : ''}`}
              onClick={() => toggleFlag(true)}
            >
              <i
                className={`${
                  flag ? 'fa-solid' : 'fa-light'
                } fa-user-group me-2`}
              ></i>
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
              <i
                className={`${flag ? 'fa-light' : 'fa-solid'} fa-store me-2`}
              ></i>
              <span className='res-hide'>
                {t('levelDetail.storeLevel.storeLevel')}
              </span>
            </span>
          </li>
        </ul>
      </div>
      {flag ? <AdminUserLevelsTable /> : <AdminStoreLevelsTable />}
    </AdminLayout>
  )
}

export default LevelPage
