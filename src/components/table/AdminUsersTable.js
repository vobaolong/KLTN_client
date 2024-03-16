import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { listUserForAdmin } from '../../apis/user'
import { humanReadableDate } from '../../helper/humanReadable'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import SortByButton from './sub/SortByButton'
import UserSmallCard from '../card/UserSmallCard'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import { useTranslation } from 'react-i18next'

const AdminUsersTable = ({ heading = 'Users in the system' }) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'firstName',
    role: 'customer',
    order: 'asc',
    limit: 8,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setError('')
    setIsLoading(true)
    listUserForAdmin(_id, accessToken, filter)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setIsLoading(false)
        } else {
          setUsers(data.users)
          setPagination({
            size: data.size,
            pageCurrent: data.filter.pageCurrent,
            pageCount: data.filter.pageCount
          })
          setIsLoading(false)
        }
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
      {isLoading && <Loading />}
      {heading && <h4 className='text-center text-uppercase'>{heading}</h4>}
      {error && <Error msg={error} />}

      <div className='d-flex justify-content-between align-items-end'>
        <SearchInput onChange={handleChangeKeyword} />
        <span className='me-2 text-nowrap res-hide'>
          Showing{' '}
          <b>
            {Math.min(
              filter.limit,
              pagination.size - filter.limit * (pagination.pageCurrent - 1)
            )}{' '}
          </b>
          of {pagination.size} {t('result')}
        </span>
      </div>

      <div className='table-scroll my-2'>
        <table className='table align-middle table-hover table-striped table-sm text-end'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope='col' className='text-start'>
                <span
                  style={{ fontWeight: '400', fontSize: '.875rem' }}
                  className='text-dark'
                >
                  User Name
                </span>
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Point'
                  sortBy='point'
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
                <span
                  style={{ fontWeight: '400', fontSize: '.875rem' }}
                  className='text-dark'
                >
                  Phone
                </span>
                {/* <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title={t('userDetail.phone')}
                  sortBy=''
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                /> */}
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
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope='row'>
                  {index + 1 + (filter.page - 1) * filter.limit}
                </th>
                <td className='text-start'>
                  <UserSmallCard user={user} />
                </td>
                <td className='text-end'>
                  <small>{user.point}</small>
                </td>
                <td className='text-end'>
                  <small>{user.id_card || '-'}</small>
                </td>
                <td className='text-end'>
                  <small>{user.email || '-'}</small>
                </td>
                <td className='text-end'>
                  <small>{user.phone || '-'}</small>
                </td>
                <td className='text-end'>
                  <small>{humanReadableDate(user.createdAt)}</small>
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

export default AdminUsersTable
