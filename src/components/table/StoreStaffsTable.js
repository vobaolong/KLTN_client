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
import Error from '../ui/Error'
import Success from '../ui/Success'
import ConfirmDialog from '../ui/ConfirmDialog'
import SortByButton from './sub/SortByButton'

const StoreStaffsTable = ({
  heading = `Store's staffs`,
  staffIds = [],
  ownerId = {},
  storeId = ''
}) => {
  const [deletedStaff, setDeletedStaff] = useState({})

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)

  const { _id: userId, accessToken } = getToken()
  const [updateDispatch] = useUpdateDispatch()

  const [listStaffs, setListStaffs] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
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
    setSuccess('')
    setIsLoading(true)
    deleteStaff(userId, accessToken, staff, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          updateDispatch('vendor', data.store)
          setSuccess(data.success)
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
        }, 3000)
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
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Delete staff'
          color='danger'
          message={
            <span className='mt-2 d-block'>
              Are you sure you want to delete{' '}
              <UserSmallCard user={deletedStaff} /> ?
            </span>
          }
          onSubmit={onDeleteSubmitStaff}
          onClose={() => setIsConfirming(false)}
        />
      )}

      {heading && <h4 className='text-center text-uppercase'>{heading}</h4>}

      {error && <Error msg={error} />}
      {success && <Success msg={success} />}

      <div className='d-flex justify-content-between align-items-end'>
        <div className='d-flex align-items-center'>
          <SearchInput onChange={handleChangeKeyword} />
          <div className='ms-2'>
            {ownerId && userId == ownerId._id ? (
              <StoreAddStaffItem
                storeId={storeId}
                owner={ownerId}
                staffs={staffIds}
              />
            ) : (
              <CancelStaffButton storeId={storeId} />
            )}
          </div>
        </div>
        <span className='me-2 text-nowrap res-hide'>
          {pagination.size || 0} results
        </span>
      </div>

      <div className='table-scroll my-2'>
        <table className='store-staffs-table table align-middle align-items-center table-hover table-sm text-center'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Staff'
                  sortBy='name'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Id card'
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
                  title='Phone'
                  sortBy='phone'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              {ownerId && userId == ownerId._id && <th scope='col'></th>}
            </tr>
          </thead>
          <tbody>
            {listStaffs?.map((staff, index) => (
              <tr key={index}>
                <th scope='row'>
                  {index + 1 + (filter.page - 1) * filter.limit}
                </th>
                <td className='text-center ps-2' style={{ maxWidth: '300px' }}>
                  <UserSmallCard user={staff} />
                </td>
                <td>
                  <small>{staff.id_card || '-'}</small>
                </td>
                <td>
                  <small>{staff.email || '-'}</small>
                </td>
                <td>
                  <small>{staff.phone || '-'}</small>
                </td>
                {ownerId && userId == ownerId._id && (
                  <td className='text-center'>
                    <button
                      type='button'
                      className='btn btn-outline-danger ripple cus-tooltip'
                      onClick={() => handleDeleteStaff(staff)}
                    >
                      <i className='fas fa-trash-alt'></i>
                      <span className='ms-2 res-hide'>Delete</span>
                    </button>
                  </td>
                )}
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

export default StoreStaffsTable

const compareFunc = (sortBy, order) => {
  return (a, b) => {
    let valueA =
      sortBy !== 'name' ? a[sortBy] : (a.firstName + a.lastName).toLowerCase()
    let valueB =
      sortBy !== 'name' ? b[sortBy] : (b.firstName + b.lastName).toLowerCase()

    if (typeof valueA === 'undefined') valueA = ''
    if (typeof valueB === 'undefined') valueB = ''

    if (order == 'asc')
      if (valueA < valueB) return -1
      else if (valueA > valueB) return 1
      else return 0
    else if (valueA < valueB) return 1
    else if (valueA > valueB) return -1
    else return 0
  }
}
