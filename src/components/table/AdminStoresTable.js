import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import {
  listStoresForAdmin,
  activeStore as activeOrInactive
} from '../../apis/store'
import { humanReadableDate } from '../../helper/humanReadable'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import SortByButton from './sub/SortByButton'
import StoreSmallCard from '../card/StoreSmallCard'
import StarRating from '../label/StarRating'
import StoreStatusLabel from '../label/StoreStatusLabel'
import StoreCommissionLabel from '../label/StoreCommissionLabel'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import ConfirmDialog from '../ui/ConfirmDialog'

const AdminStoresTable = ({ heading = true, isActive = true }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [run, setRun] = useState('')

  const [stores, setStores] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'name',
    sortMoreBy: 'point',
    isActive,
    order: 'asc',
    limit: 6,
    page: 1
  })

  const [activeStore, setActiveStore] = useState({})

  const { _id, accessToken } = getToken()

  const init = () => {
    setError('')
    setIsLoading(true)
    listStoresForAdmin(_id, accessToken, filter)
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
  }, [filter, run])

  useEffect(() => {
    setFilter({
      ...filter,
      isActive
    })
  }, [isActive])

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

  const handleActiveStore = (store) => {
    setActiveStore(store)
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setIsLoading(true)
    const value = { isActive: !activeStore.isActive }
    activeOrInactive(_id, accessToken, value, activeStore._id)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setTimeout(() => {
            setError('')
          }, 3000)
        } else setRun(!run)
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative'>
      {heading && (
        <h4 className='text-center text-uppercase'>
          {isActive ? 'Licensed stores' : 'Unlicensed stores'}
        </h4>
      )}

      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={!activeStore.isActive ? 'License store' : 'Ban store'}
          color={!activeStore.isActive ? 'primary' : 'danger'}
          onClose={() => setIsConfirming(false)}
          onSubmit={onSubmit}
        />
      )}

      <div className='d-flex justify-content-between align-items-end'>
        <div className='option-wrap d-flex align-items-center'>
          <SearchInput onChange={handleChangeKeyword} />
        </div>
        <span className='me-2 text-nowrap res-hide'>
          {pagination.size || 0} results
        </span>
      </div>

      <div className='table-scroll my-2'>
        <table className='table align-middle table-hover table-sm text-center'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Store'
                  sortBy='name'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Rating'
                  sortBy='rating'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Status'
                  sortBy='isOpen'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Commission'
                  sortBy='commissionId'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Joined'
                  sortBy='createdAt'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>

              <th scope='col'>
                <span
                  style={{ fontWeight: '400', fontSize: '.875rem' }}
                  className='text-secondary'
                >
                  Action
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => (
              <tr key={index}>
                <th scope='row'>
                  <span className='text-center align-items-center'>
                    {index + 1 + (filter.page - 1) * filter.limit}
                  </span>
                </th>
                <td className=' text-start ps-2' style={{ maxWidth: '300px' }}>
                  <StoreSmallCard store={store} />
                </td>
                <td>
                  <small>
                    <StarRating stars={store.rating} />
                  </small>
                </td>
                <td>
                  <StoreStatusLabel isOpen={store.isOpen} />
                </td>
                <td>
                  <StoreCommissionLabel commission={store.commissionId} />
                </td>
                <td className='text-end'>
                  <small className='me-2'>
                    {humanReadableDate(store.createdAt)}
                  </small>
                </td>
                <td>
                  <button
                    type='button'
                    className={`btn ${
                      !store.isActive
                        ? 'btn-outline-success'
                        : 'btn-outline-danger'
                    } ripple cus-tooltip`}
                    onClick={() => handleActiveStore(store)}
                  >
                    {!store.isActive ? (
                      <>
                        <i className='far fa-check-circle'></i>
                        <span className='ms-2 res-hide'>License</span>
                      </>
                    ) : (
                      <>
                        <i className='fas fa-ban'></i>
                        <span className='ms-2 res-hide'>Ban</span>
                      </>
                    )}
                  </button>
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

export default AdminStoresTable
