/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { listReportsForAdmin } from '../../apis/report'
import { humanReadableDate } from '../../helper/humanReadable'
import Pagination from '../ui/Pagination'
import SortByButton from './sub/SortByButton'
import Loading from '../ui/Loading'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import Error from '../ui/Error'
import boxImg from '../../assets/box.svg'

const AdminReportsTable = ({ heading = false, isStore = true }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [run, setRun] = useState('')
  const [error, setError] = useState('')
  const [reports, setReports] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'createAt',
    isStore,
    order: 'desc',
    limit: 10,
    page: 1
  })

  useEffect(() => {
    let isMounted = true

    const init = () => {
      setIsLoading(true)
      listReportsForAdmin(filter)
        .then((data) => {
          console.log(data)
          if (data.error) setError(data.error)
          else {
            if (isMounted) {
              setReports(data.reports)
              setPagination({
                size: data.size,
                pageCurrent: data.filter.pageCurrent,
                pageCount: data.filter.pageCount
              })
            }
          }
          if (isMounted) setIsLoading(false)
        })
        .catch((error) => {
          setError('Server Error')
          if (isMounted) setIsLoading(false)
        })
    }

    init()

    return () => {
      isMounted = false
    }
  }, [filter, run])

  useEffect(() => {
    setFilter({
      ...filter,
      isStore
    })
  }, [isStore])

  const handleChangePage = (newPage) => {
    setFilter({
      ...filter,
      page: newPage
    })
  }

  const handleSetSortBy = (order, sortBy) => {
    setFilter({
      ...filter,
      sortBy,
      order
    })
  }
  console.log(reports)
  return (
    <div className='position-relative'>
      {heading && (
        <h5 className='text-start'>
          {isStore ? t('title.listReportShop') : t('title.listReportProduct')}
        </h5>
      )}

      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div>
        <div className='p-3 box-shadow bg-body rounded-2'>
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
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('reportDetail.objectId')}
                        sortBy='objectId'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('reportDetail.userId')}
                        sortBy='reportBy'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
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
                      <td>{report.objectId?.name}</td>
                      <td>{report.reportBy?.email}</td>
                      <td>{report.reason}</td>
                      <td>{humanReadableDate(report.createdAt)}</td>
                      <td>
                        <button className='btn btn-sm btn-outline-primary rounded-1'>
                          <i className='fa-solid fa-eye'></i>
                        </button>
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
