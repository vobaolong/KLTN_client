/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { getListUsers } from '../../apis/user'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import MainLayout from '../../components/layout/MainLayout'
import UserCard from '../../components/card/UserCard'
import Pagination from '../../components/ui/Pagination.js'
import Loading from '../../components/ui/Loading'
import Error from '../../components/ui/Error'
import { useTranslation } from 'react-i18next'

const UserSearchPage = () => {
  const { t } = useTranslation()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const keyword = new URLSearchParams(useLocation().search).get('keyword') || ''
  const [listUsers, setListUsers] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: keyword,
    sortBy: 'point',
    role: 'customer',
    order: 'desc',
    limit: 10,
    page: 1
  })

  const init = () => {
    setError('')
    setIsLoading(true)

    getListUsers(filter)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setPagination({
            size: data.size,
            pageCurrent: data.filter.pageCurrent,
            pageCount: data.filter.pageCount
          })
          setListUsers(data.users)
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

  useUpdateEffect(() => {
    setFilter({
      ...filter,
      search: keyword,
      page: 1
    })
  }, [keyword])

  const handleChangePage = (newPage) => {
    setFilter({
      ...filter,
      page: newPage
    })
  }

  return (
    <MainLayout>
      <div className='position-relative'>
        {isLoading && <Loading />}
        {error && <Error msg={error} />}

        <div className='d-flex justify-content-end'>
          <small className='text-nowrap res-hide'>
            {t('showing')}{' '}
            <b>
              {Math.min(
                filter.limit,
                pagination.size - filter.limit * (pagination.pageCurrent - 1)
              )}{' '}
            </b>
            {t('of')} {pagination.size} {t('result')}
          </small>
        </div>

        <div className='row mt-3'>
          {listUsers &&
            listUsers.map((user, index) => (
              <div
                className='col-xl-2-5 col-md-3 col-sm-4 col-6 mb-4'
                key={index}
              >
                <UserCard user={user} hasFollowBtn={getToken()} />
              </div>
            ))}
        </div>

        {pagination.size !== 0 && (
          <Pagination pagination={pagination} onChangePage={handleChangePage} />
        )}
      </div>
    </MainLayout>
  )
}

export default UserSearchPage
