/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { deleteReport, listReportsForAdmin } from '../../apis/report'
import { humanReadableDate } from '../../helper/humanReadable'
import Pagination from '../ui/Pagination'
import SortByButton from './sub/SortByButton'
import Loading from '../ui/Loading'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import Error from '../ui/Error'
import boxImg from '../../assets/box.svg'
import { Link } from 'react-router-dom'
import SearchInput from '../ui/SearchInput'
import ConfirmDialog from '../ui/ConfirmDialog'

const AdminReportsTable = ({ heading = false, activeTab = 'store' }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [reports, setReports] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [isConfirming, setIsConfirming] = useState(false)
  const [reportToDelete, setReportToDelete] = useState(null)
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'createdAt',
    activeTab,
    order: 'desc',
    limit: 10,
    page: 1
  })
  const init = () => {
    let isMounted = true
    setIsLoading(true)
    listReportsForAdmin(filter)
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          if (isMounted) {
            setReports(data.reports || [])
            setPagination({
              size: data.size || 0,
              pageCurrent: data.filter.pageCurrent || 1,
              pageCount: data.filter.pageCount || 1
            })
          }
        }
        setTimeout(() => setError(''), 3000)
      })
      .catch(() => {
        setError('Server Error')
        setTimeout(() => setError(''), 3000)
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }

  useEffect(() => {
    init()
  }, [filter, reports.length, reportToDelete])

  const onSubmit = async () => {
    if (!reportToDelete) return

    setError('')
    setIsLoading(true)
    try {
      await deleteReport(reportToDelete)
      setReports(reports.filter((report) => report._id !== reportToDelete))
      setIsConfirming(false)
    } catch (error) {
      setError(t('Server Error'))
      setTimeout(() => {
        setError('')
      }, 3000)
    } finally {
      setIsLoading(false)
      setReportToDelete(null)
    }
  }
  const handleDeleteReport = (reportId) => {
    setReportToDelete(reportId)
    setIsConfirming(true)
  }

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      activeTab,
      isStore: activeTab === 'store',
      isProduct: activeTab === 'product',
      isReview: activeTab === 'review'
    }))
  }, [activeTab])

  const handleChangePage = (newPage) => {
    setFilter({
      ...filter,
      page: newPage
    })
  }
  const handleChangeKeyword = (keyword) => {
    setFilter({
      ...filter,
      search: keyword,
      page: 1
    })
  }
  const handleSetSortBy = (order, sortBy) => {
    setFilter({
      ...filter,
      sortBy,
      order
    })
  }

  const getLinkTo = (report) => {
    switch (activeTab) {
      case 'store':
        return `/store/${report.objectId?._id}`
      case 'product':
        return `/product/${report.objectId?._id}`
      case 'review':
        return `/review/${report.objectId?._id}`
      default:
        return '#'
    }
  }

  return (
    <div className='position-relative'>
      {heading && (
        <h5 className='text-start'>
          {activeTab === 'store'
            ? t('title.listReportShop')
            : activeTab === 'product'
            ? t('title.listReportProduct')
            : t('title.listReportReview')}
        </h5>
      )}

      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={t('reportDetail.delete')}
          color='danger'
          onSubmit={onSubmit}
          onClose={() => {
            setIsConfirming(false)
            setReportToDelete(null)
          }}
        />
      )}
      <div>
        <div className='p-3 box-shadow bg-body rounded-2'>
          <SearchInput onChange={handleChangeKeyword} />
          {!isLoading && pagination.size === 0 ? (
            <div className='my-4 text-center'>
              <img className='mb-3' src={boxImg} alt='boxImg' width={'80px'} />
              <h5>{t('reportDetail.none')}</h5>
            </div>
          ) : (
            <div className='table-scroll my-2'>
              <table className='table align-middle table-hover table-sm text-start'>
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>
                      <span>{t('reportDetail.id')}</span>
                    </th>
                    <th scope='col'>
                      <span>{t('reportDetail.objectId')}</span>
                    </th>
                    <th scope='col'>
                      <span>{t('reportDetail.objectName')}</span>
                    </th>
                    <th scope='col'>
                      <span>{t('reportDetail.userId')}</span>
                    </th>
                    <th scope='col'>
                      <span>{t('reportDetail.reason')}</span>
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('reportDetail.createAt')}
                        sortBy='createdAt'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>{t('action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report, index) => (
                    <tr key={index}>
                      <th scope='row' className='text-center'>
                        {index + 1 + (filter.page - 1) * filter.limit}
                      </th>
                      <td>{report._id}</td>
                      <td>{report.objectId?._id}</td>
                      <td
                        style={{
                          maxWidth: '400px',
                          minWidth: '300px',
                          whiteSpace: 'normal',
                          overflow: 'auto'
                        }}
                      >
                        {report.objectId?.name || report.objectId?.content}
                      </td>
                      <td>{report.reportBy?.email}</td>
                      <td>{report.reason}</td>
                      <td>{humanReadableDate(report.createdAt)}</td>
                      <td>
                        <div className='position-relative d-inline-block'>
                          <Link
                            type='button'
                            className='btn btn-sm btn-primary rounded-1 cus-tooltip'
                            to={getLinkTo(report)}
                          >
                            <i className='fa-solid fa-eye'></i>
                          </Link>
                          <span className='cus-tooltip-msg'>
                            {t('button.view')}
                          </span>
                          <div className='position-relative d-inline-block ms-2'>
                            <button
                              type='button'
                              className='btn btn-sm btn-outline-danger rounded-1 cus-tooltip'
                              onClick={() => handleDeleteReport(report._id)}
                            >
                              <i className='fa-solid fa-trash'></i>
                            </button>
                            <span className='cus-tooltip-msg'>
                              {t('button.delete')}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {
            <div className='d-flex justify-content-between align-items-center px-4'>
              <ShowResult
                limit={filter.limit}
                size={pagination.size}
                pageCurrent={pagination.pageCurrent}
              />
              {pagination.size !== 0 && (
                <Pagination
                  pagination={pagination}
                  onChangePage={handleChangePage}
                />
              )}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default AdminReportsTable
