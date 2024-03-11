import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { listStoresByUser } from '../../apis/store'
import StoreSmallCard from '../card/StoreSmallCard'
import ManagerRoleLabel from '../label/ManagerRoleLabel'
import StoreLicenseLabel from '../label/StoreLicenseLabel'
import StoreStatusLabel from '../label/StoreStatusLabel'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import SortByButton from './sub/SortByButton'
import { useTranslation } from 'react-i18next'

const UserStoresTable = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [stores, setStores] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'name',
    sortMoreBy: 'rating',
    order: 'asc',
    limit: 6,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setError('')
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
        setError('Server Error')
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
      {t('myStore') && (
        <h4 className='text-center text-uppercase'>{t('myStore')}</h4>
      )}
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      <div className='d-flex justify-content-between align-items-end'>
        <div className='d-flex align-items-center'>
          <SearchInput onChange={handleChangeKeyword} />
          <div className='ms-2'>
            <Link
              type='button'
              className='btn btn-primary ripple text-nowrap rounded-1'
              to='/account/storeManager/createNewStore'
            >
              <i className='fas fa-plus-circle'></i>
              <span className='ms-2 res-hide'>{t('createStore')}</span>
            </Link>
          </div>
        </div>
        <span className='me-2 text-nowrap res-hide'>
          {pagination.size || 0} {t('result')}
        </span>
      </div>
      <div className='table-scroll my-2'>
        <table className='table table-sm table-hover align-middle text-center'>
          <thead>
            <tr>
              <th scope='col'>
                {/* <SortByButton
                  currentSortBy={filter.sortBy}
                  title=''
                  sortBy='point'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                /> */}
              </th>
              <th scope='col'>
                <span
                  style={{ fontWeight: '400', fontSize: '.875rem' }}
                  className='text-secondary'
                >
                  Avatar
                </span>
              </th>
              <th scope='col'>
                <SortByButton
                  currentSortBy={filter.sortBy}
                  title={t('storeDetail.name')}
                  sortBy='name'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
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
                  title={t('storeDetail.licensed')}
                  sortBy='isActive'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentSortBy={filter.sortBy}
                  title={t('storeDetail.status')}
                  sortBy='isOpen'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>

              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => (
              <tr key={index}>
                <th scope='row'>
                  {index + 1 + (filter.page - 1) * filter.limit}
                </th>
                <th scope='text-start'>
                  <small className='hidden-name'>
                    <StoreSmallCard store={store} />
                  </small>
                </th>
                <td className='text-start'>
                  <small className='hidden-avatar'>
                    <StoreSmallCard store={store} />
                  </small>
                </td>
                <td className='text-center'>
                  <ManagerRoleLabel
                    role={_id === store.ownerId._id ? 'Owner' : 'Staff'}
                  />
                </td>
                <td className='text-center'>
                  <StoreLicenseLabel isActive={store.isActive} />
                </td>
                <td className='text-center'>
                  <StoreStatusLabel isOpen={store.isOpen} />
                </td>
                <td>
                  <Link
                    type='button'
                    className='btn btn-primary ripple rounded-1'
                    to={`/vendor/${store._id}`}
                    title='Quản lý'
                  >
                    <i className='fas fa-user-tie'></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default UserStoresTable
