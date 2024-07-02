import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import AdminLayout from '../../components/layout/AdminLayout'
import { useTranslation } from 'react-i18next'
import AdminReportsTable from '../../components/table/AdminReportsTable'

const ReportPage = () => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)
  const [flag, toggleFlag] = useToggle(true)
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.report'), url: '/admin/report' }
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
                className={`${flag ? 'fa-solid' : 'fa-light'} fa-store me-2`}
              ></i>
              <span className='res-hide'>{t('title.listReportShop')}</span>
            </span>
          </li>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${!flag ? 'active' : ''}`}
              onClick={() => toggleFlag(false)}
            >
              <i
                className={`${flag ? 'fa-light' : 'fa-solid'} fa-box me-2`}
              ></i>
              <span className='res-hide'>{t('title.listReportProduct')}</span>
            </span>
          </li>
        </ul>
      </div>
      <AdminReportsTable isStore={flag} />
    </AdminLayout>
  )
}

export default ReportPage
