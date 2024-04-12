/* eslint-disable react-hooks/exhaustive-deps */
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
import StoreCommissionLabel from '../label/StoreCommissionLabel'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import { toast } from 'react-toastify'
import StoreActiveLabel from '../label/StoreActiveLabel'

const AdminStoresTable = ({ heading = true, isActive = true }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
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
    limit: 8,
    page: 1
  })

  const [activeStore, setActiveStore] = useState({})

  const { _id, accessToken } = getToken()

  const init = () => {
    setIsLoading(true)
    listStoresForAdmin(_id, accessToken, filter)
      .then((data) => {
        if (data.error) toast.error(data.error)
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
        console.log('Some thing went wrong')
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
    setIsLoading(true)
    const value = { isActive: !activeStore.isActive }
    const active = activeStore.isActive
      ? t('toastSuccess.store.ban')
      : t('toastSuccess.store.active')
    activeOrInactive(_id, accessToken, value, activeStore._id)
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          toast.success(active)
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Some thing went wrong')
        setIsLoading(false)
      })
  }

  console.log(stores)
  return (
    <div className='position-relative'>
      {heading && (
        <h5 className='text-center text-uppercase'>
          {isActive ? t('title.listActiveStores') : t('title.listBannedStores')}
        </h5>
      )}

      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={
            !activeStore.isActive
              ? t('dialog.activeStore')
              : t('dialog.banStore')
          }
          color={!activeStore.isActive ? 'primary' : 'danger'}
          onClose={() => setIsConfirming(false)}
          onSubmit={onSubmit}
        />
      )}

      <div className='d-flex justify-content-between align-items-end'>
        <div className='option-wrap d-flex align-items-center'>
          <SearchInput onChange={handleChangeKeyword} />
        </div>
        <ShowResult
          limit={filter.limit}
          size={pagination.size}
          pageCurrent={pagination.pageCurrent}
        />
      </div>
      {!isLoading && pagination.size === 0 ? (
        <div className='d-flex justify-content-center mt-3 text-primary text-center'>
          <h5>{t('storeDetail.noStores')}</h5>
        </div>
      ) : (
        <div className='table-scroll my-2'>
          <table className='table align-middle table-hover table-striped table-sm text-center'>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col'>
                  <span style={{ fontWeight: '400', fontSize: '.875rem' }}>
                    {t('storeDetail.avatar')}
                  </span>
                </th>
                <th scope='col' className='text-start'>
                  <span style={{ fontWeight: '400', fontSize: '.875rem' }}>
                    {t('storeDetail.storeName')}
                  </span>
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('storeDetail.rating')}
                    sortBy='rating'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col' className='text-start'>
                  <span style={{ fontWeight: '400', fontSize: '.875rem' }}>
                    {t('storeDetail.contactPerson')}
                  </span>
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('storeDetail.commissions')}
                    sortBy='commissionId'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('status.status')}
                    sortBy='isActive'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col' className='text-end'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('joined')}
                    sortBy='createdAt'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>

                <th scope='col'>
                  <span
                    style={{ fontWeight: '400', fontSize: '.875rem' }}
                    className='text-secondary'
                  >
                    {t('action')}
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
                  <td className='hidden-name' style={{ maxWidth: '300px' }}>
                    <StoreSmallCard store={store} />
                  </td>
                  <td
                    className='text-start hidden-avatar'
                    style={{ maxWidth: '300px' }}
                  >
                    <StoreSmallCard store={store} />
                  </td>
                  <td>
                    <small>
                      <StarRating stars={store.rating} />
                    </small>
                  </td>
                  <td className='text-start'>
                    <small className='me-2'>
                      {t('userDetail.name')}:{' '}
                      <span className='text-primary'>
                        {store.ownerId.firstName +
                          ' ' +
                          store.ownerId.lastName || '-'}
                      </span>
                      <br />
                      Email:{' '}
                      <span className='text-primary'>
                        {store.ownerId.email || '-'}
                      </span>
                      <br />
                      {t('userDetail.phone')}:{' '}
                      <span className='text-primary'>
                        {store.ownerId.phone || '-'}
                      </span>
                    </small>
                  </td>
                  <td>
                    <StoreCommissionLabel commission={store.commissionId} />
                  </td>
                  <td>
                    <StoreActiveLabel isActive={store.isActive} />
                  </td>
                  <td className='text-end'>
                    <small className='me-2'>
                      {humanReadableDate(store.createdAt)}
                    </small>
                  </td>
                  <td className='py-1'>
                    <button
                      type='button'
                      className={`btn btn-sm rounded-1 ${
                        !store.isActive
                          ? 'btn-outline-success'
                          : 'btn-outline-danger'
                      } ripple cus-tooltip`}
                      onClick={() => handleActiveStore(store)}
                    >
                      {!store.isActive ? (
                        <>
                          <i className='fa-solid fa-circle-check'></i>
                          <span className='ms-2 res-hide'>
                            {t('button.active')}
                          </span>
                        </>
                      ) : (
                        <>
                          <i className='fa-solid fa-ban'></i>
                          <span className='ms-2 res-hide'>
                            {t('button.ban')}
                          </span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default AdminStoresTable
