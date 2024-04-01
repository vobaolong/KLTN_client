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
      <div className='d-flex align-items-center mb-2'>
        <div className='position-relative d-inline-block me-2'>
          <button
            type='button'
            className={`btn ${
              flag ? 'btn-primary' : 'btn-outline-primary'
            } btn-lg ripple cus-tooltip`}
            onClick={() => toggleFlag(true)}
          >
            <i className='fas fa-user-friends'></i>
          </button>

          <small className='cus-tooltip-msg'>
            {t('levelDetail.userLevel.userLevel')}
          </small>
        </div>

        <div className='position-relative d-inline-block'>
          <button
            type='button'
            className={`btn ${
              !flag ? 'btn-primary' : 'btn-outline-primary'
            } btn-lg ripple cus-tooltip`}
            onClick={() => toggleFlag(false)}
          >
            <i className='fas fa-store'></i>
          </button>

          <small className='cus-tooltip-msg'>
            {t('levelDetail.storeLevel.storeLevel')}
          </small>
        </div>
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
