/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { deleteStaff } from '../../apis/store'
import useUpdateDispatch from '../../hooks/useUpdateDispatch'
import UserSmallCard from '../card/UserSmallCard'
import StoreAddStaffItem from '../item/StoreAddStaffItem'
import CancelStaffButton from '../button/CancelStaffButton'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import SortByButton from './sub/SortByButton'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import ShowResult from '../ui/ShowResult'
import Error from '../ui/Error'
import Alert from '../ui/Alert'

const StoreStaffsTable = ({
  heading = false,
  staffIds = [],
  ownerId = {},
  storeId = ''
}) => {
  const { t } = useTranslation()
  const [deletedStaff, setDeletedStaff] = useState({})
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const { _id: userId, accessToken } = getToken()
  const [updateDispatch] = useUpdateDispatch()
  const [listStaffs, setListStaffs] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [alerts, setAlerts] = useState(true)
  const [filter, setFilter] = useState({
    search: '',
    limit: 6,
    sortBy: 'name',
    order: 'asc',
    page: 1
  })

  useEffect(() => {
    if (!staffIds || staffIds.length <= 0) {
      setListStaffs([])
      setPagination({
        ...pagination,
        size: 0
      })
      return
    }

    const search = filter.search.toLowerCase()
    const filterList = staffIds
      .filter(
        (staff) =>
          staff.firstName.toLowerCase().includes(search) ||
          staff.lastName.toLowerCase().includes(search)
      )
      .sort(compareFunc(filter.sortBy, filter.order))

    const limit = filter.limit
    const size = filterList.length
    const pageCurrent = filter.page
    const pageCount = Math.ceil(size / limit)
    let skip = limit * (pageCurrent - 1)
    if (pageCurrent > pageCount) {
      skip = (pageCount - 1) * limit
    }

    const newListStaffs = filterList.slice(skip, skip + limit)
    setListStaffs(newListStaffs)
    setPagination({
      size,
      pageCurrent,
      pageCount
    })
  }, [filter, staffIds])

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

  const handleDeleteStaff = (staff) => {
    setDeletedStaff(staff)
    setIsConfirming(true)
  }

  const onDeleteSubmitStaff = () => {
    const staff = deletedStaff._id
    setError('')
    setIsLoading(true)
    deleteStaff(userId, accessToken, staff, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          updateDispatch('seller', data.store)
          toast.success(t('toastSuccess.staff.removeStaff'))
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError(`Server Error`)
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative'>
      {alerts ? (
        <Alert
          icon={<i className='text-primary fa-solid fa-circle-info'></i>}
          msg1={`${t('alert.listStaff')}`}
          alert={`${t('alert.thisSectionContains')}`}
          msg2={`${t('alert.theShopStaffs.')}`}
          onClose={() => setAlerts(false)}
        />
      ) : null}

      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('staffDetail.delete')}
          color='danger'
          message={t('message.removeStaff')}
          onSubmit={onDeleteSubmitStaff}
          onClose={() => setIsConfirming(false)}
        />
      )}

      {heading && <h5 className='text-start'>{t('staffDetail.staffList')}</h5>}
      {error && <Error msg={error} />}
      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className=' d-flex align-items-center justify-content-between mb-3'>
          {pagination.size !== 0 && (
            <SearchInput onChange={handleChangeKeyword} />
          )}
          {ownerId && userId === ownerId._id ? (
            <StoreAddStaffItem
              storeId={storeId}
              owner={ownerId}
              staffs={staffIds}
            />
          ) : (
            <CancelStaffButton storeId={storeId} />
          )}
        </div>

        {!isLoading && pagination.size === 0 ? (
          <div className='my-4 text-danger text-center'>
            <h5>{t('staffDetail.noStaff')}</h5>
          </div>
        ) : (
          <div className='table-scroll my-2'>
            <table className='store-staffs-table table align-middle align-items-center table-hover table-sm text-start'>
              <thead>
                <tr>
                  <th scope='col' className='text-center'>
                    #
                  </th>
                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('staffDetail.name')}
                      sortBy='name'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title='ID Card'
                      sortBy='id_card'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title='Email'
                      sortBy='email'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('userDetail.phone')}
                      sortBy='phone'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>

                  {ownerId && userId === ownerId._id && (
                    <th scope='col'>
                      <span style={{ fontWeight: '400', fontSize: '.875rem' }}>
                        {t('action')}
                      </span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {listStaffs?.map((staff, index) => (
                  <tr key={index}>
                    <th scope='row' className='text-center'>
                      {index + 1 + (filter.page - 1) * filter.limit}
                    </th>
                    <td style={{ maxWidth: '300px' }}>
                      <UserSmallCard user={staff} />
                    </td>
                    <td>{staff.id_card || '-'}</td>
                    <td>{staff.email || '-'}</td>
                    <td>{staff.phone || '-'}</td>
                    {ownerId && userId === ownerId._id && (
                      <td>
                        <button
                          type='button'
                          className='btn btn-sm btn-outline-danger rounded-1 ripple cus-tooltip'
                          onClick={() => handleDeleteStaff(staff)}
                          title={t('button.delete')}
                        >
                          <i className='d-none res-dis-sm fa-solid fa-user-minus'></i>
                          <span className='res-hide'>{t('button.delete')}</span>
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className='d-flex justify-content-between align-items-center px-4'>
          {pagination.size !== 0 && (
            <ShowResult
              limit={filter.limit}
              size={pagination.size}
              pageCurrent={pagination.pageCurrent}
            />
          )}
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

export default StoreStaffsTable

const compareFunc = (sortBy, order) => {
  return (a, b) => {
    let valueA =
      sortBy !== 'name' ? a[sortBy] : (a.firstName + a.lastName).toLowerCase()
    let valueB =
      sortBy !== 'name' ? b[sortBy] : (b.firstName + b.lastName).toLowerCase()

    if (typeof valueA === 'undefined') valueA = ''
    if (typeof valueB === 'undefined') valueB = ''

    if (order === 'asc')
      if (valueA < valueB) return -1
      else if (valueA > valueB) return 1
      else return 0
    else if (valueA < valueB) return 1
    else if (valueA > valueB) return -1
    else return 0
  }
}
