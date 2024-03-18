import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { listFollowingStores } from '../../apis/follow'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import StoreCard from '../card/StoreCard'
import Pagination from '../ui/Pagination'
import { useTranslation } from 'react-i18next'

const FollowingStoresCollection = (props) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [run, setRun] = useState(false)

  const [listStores, setListStores] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'name',
    order: 'desc',
    limit: 8,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setError('')
    setIsLoading(true)
    listFollowingStores(_id, accessToken, filter)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setListStores(data.stores)
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

  const handleChangePage = (newPage) => {
    setFilter({
      ...filter,
      page: newPage
    })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div className='d-flex justify-content-between align-items-end'>
        <h4>{t('favStore')}</h4>
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

      <div className='container-fluid p-0 mt-3'>
        <div className='row'>
          {listStores &&
            listStores.map((store, index) => (
              <div className='col-lg-3 col-sm-4 col-6 mb-4' key={index}>
                <StoreCard store={store} onRun={() => setRun(!run)} />
              </div>
            ))}
        </div>
      </div>

      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default FollowingStoresCollection
