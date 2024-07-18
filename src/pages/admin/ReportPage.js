import { useSelector } from 'react-redux'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { useTranslation } from 'react-i18next'
import AdminReportsTable from '../../components/table/AdminReportsTable'
import { useHistory } from 'react-router-dom'

const ReportPage = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)

  const [activeTab, setActiveTab] = useState('store')

  const reportTypes = useMemo(
    () => [
      { label: t('title.listReportShop'), value: 'store' },
      { label: t('title.listReportProduct'), value: 'product' },
      { label: t('title.listReportReview'), value: 'review' }
    ],
    [t]
  )

  const paths = useMemo(
    () => [
      { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
      { name: t('breadcrumbs.report'), url: '/admin/report' }
    ],
    [t]
  )

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab)
      history.push(`/admin/report/${tab}`)
    },
    [history]
  )
  useEffect(() => {
    const path = history.location.pathname
    const tab = path.split('/').pop()
    if (reportTypes.some((type) => type.value === tab)) {
      setActiveTab(tab)
    }
  }, [history, reportTypes])

  return (
    <AdminLayout user={user} paths={paths}>
      <div className='mb-2 bg-body rounded-top-1 box-shadow'>
        <ul className='nav nav-tabs'>
          {reportTypes.map((type) => (
            <li className='nav-item col-4 text-center pointer' key={type.value}>
              <span
                className={`nav-link ${
                  activeTab === type.value ? 'active' : ''
                }`}
                onClick={() => handleTabChange(type.value)}
              >
                <i
                  className={`${
                    activeTab === type.value ? 'fa-solid' : 'fa-light'
                  } ${
                    type.value === 'store'
                      ? 'fa-store'
                      : type.value === 'product'
                      ? 'fa-box'
                      : 'fa-comment'
                  } me-2`}
                ></i>
                <span className='res-hide'>{type.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <AdminReportsTable activeTab={activeTab} />
    </AdminLayout>
  )
}

export default memo(ReportPage)
