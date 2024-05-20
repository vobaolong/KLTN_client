/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { listStoresByUser } from '../../apis/store'
import StoreSmallCard from '../card/StoreSmallCard'
import ManagerRoleLabel from '../label/ManagerRoleLabel'
import StoreActiveLabel from '../label/StoreActiveLabel'
import StoreStatusLabel from '../label/StoreStatusLabel'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import SortByButton from './sub/SortByButton'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import { formatDate } from '../../helper/humanReadable'

const UserStoresTable = ({ heading = false }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [stores, setStores] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'point',
    sortMoreBy: 'rating',
    order: 'desc',
    limit: 8,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setIsLoading(true)
    listStoresByUser(_id, accessToken, filter)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setStores(data.stores)
          setPagination({
            size: data.size,
            pageCurrent: data.filter.pageCurrent,
            pageCount: data.filter.pageCount
          })
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [filter])

  const handleChangeKeyword = (keyword) => {
    setFilter({
      ...filter,
      search: keyword,
      page: 1
    })
  }

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

  return (
    <div className='position-relative'>
      {heading && <h5 className='text-start'>{t('myStore')}</h5>}
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className=' d-flex align-items-center justify-content-between mb-3'>
          <SearchInput onChange={handleChangeKeyword} />
          <div className='ms-2'>
            <Link
              type='button'
              className='btn btn-primary ripple text-nowrap rounded-1'
              to='/account/store/create'
            >
              <i className='fa-light fa-plus'></i>
              <span className='ms-2 res-hide'>{t('createStore')}</span>
            </Link>
          </div>
        </div>

        {!isLoading && stores.length === 0 ? (
          <div className='d-flex justify-content-center mt-3 text-primary text-center'>
            <h5>{t('storeDetail.noStores')}</h5>
          </div>
        ) : (
          <div className='table-scroll my-2'>
            <table className='table table-sm table-hover align-middle text-start'>
              <thead>
                <tr>
                  <th scope='col' className='text-center'>
                    <SortByButton
                      currentSortBy={filter.sortBy}
                      title=''
                      sortBy='point'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col'>
                    <span
                      style={{ fontWeight: '400' }}
                      className='text-secondary'
                    >
                      {t('storeDetail.avatar')}
                    </span>
                  </th>
                  <th scope='col'>
                    <SortByButton
                      currentSortBy={filter.sortBy}
                      title={t('storeDetail.storeName')}
                      sortBy='name'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col'>
                    <span>{t('storeDetail.address')}</span>
                  </th>
                  <th scope='col'>
                    <SortByButton
                      currentSortBy={filter.sortBy}
                      title={t('storeDetail.role')}
                      sortBy='ownerId'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col'>
                    <SortByButton
                      currentSortBy={filter.sortBy}
                      title={t('status.active')}
                      sortBy='isActive'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col'>
                    <SortByButton
                      currentSortBy={filter.sortBy}
                      title={t('status.status')}
                      sortBy='isOpen'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col'>
                    <SortByButton
                      currentSortBy={filter.sortBy}
                      title={t('joined')}
                      sortBy='createdAt'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col'>
                    <span>{t('action')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store, index) => (
                  <tr key={index}>
                    <th scope='row' className='text-center'>
                      {index + 1 + (filter.page - 1) * filter.limit}
                    </th>
                    <th>
                      <small className='hidden-name'>
                        <StoreSmallCard store={store} />
                      </small>
                    </th>
                    <td>
                      <small className='hidden-avatar'>
                        <StoreSmallCard store={store} />
                      </small>
                    </td>
                    <th>{store.address}</th>
                    <td>
                      <ManagerRoleLabel
                        role={_id === store.ownerId._id ? 'owner' : 'staff'}
                      />
                    </td>
                    <td>
                      <StoreActiveLabel isActive={store.isActive} />
                    </td>
                    <td>
                      <StoreStatusLabel isOpen={store.isOpen} />
                    </td>
                    <td>
                      <span>{formatDate(store.createdAt)}</span>
                    </td>
                    <td>
                      <Link
                        type='button'
                        className='btn btn-sm btn-outline-secondary ripple rounded-1'
                        to={`/vendor/${store._id}`}
                        title={t('admin.adDashboard.dashboard')}
                      >
                        <i className='res-dis-sm d-none fa-solid fa-eye'></i>
                        <span className='res-hide'>
                          {t('admin.adDashboard.dashboard')}
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
      </div>
    </div>
  )
}

export default UserStoresTable
