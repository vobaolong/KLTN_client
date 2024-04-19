/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { listUserForAdmin } from '../../apis/user'
import { humanReadableDate } from '../../helper/humanReadable'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import SortByButton from './sub/SortByButton'
import UserSmallCard from '../card/UserSmallCard'
import Loading from '../ui/Loading'
import { useTranslation } from 'react-i18next'
import VerifyLabel from '../label/VerifyLabel'
import ShowResult from '../ui/ShowResult'
import { toast } from 'react-toastify'

const AdminUsersTable = ({ heading = false }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'createdAt',
    role: 'customer',
    order: 'asc',
    limit: 8,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setIsLoading(true)
    listUserForAdmin(_id, accessToken, filter)
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
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
        console.log('Some thing went wrong')
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
      {heading && <h5 className='text-start'>{t('title.userInSystem')}</h5>}

      <div className='p-3 box-shadow bg-body rounded-2'>
        <SearchInput onChange={handleChangeKeyword} />
        <div className='table-scroll my-2'>
          <table className='table align-middle table-hover table-sm text-start'>
            <thead>
              <tr>
                <th scope='col' className='text-center'></th>
                <th scope='col'>
                  <span style={{ fontWeight: '400' }}>
                    {t('userDetail.name')}
                  </span>
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('point')}
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
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('userDetail.KYC')}
                    sortBy='email'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>

                <th scope='col' className='text-secondary'>
                  <span style={{ fontWeight: '400', fontSize: '.875rem' }}>
                    {t('userDetail.phone')}
                  </span>
                </th>

                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('joined')}
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
                  <td>{user.point}</td>
                  <td>{user.id_card || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>
                    <VerifyLabel verify={user.isEmailActive} />
                  </td>
                  <td>{user.phone || '-'}</td>
                  <td>{humanReadableDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default AdminUsersTable
