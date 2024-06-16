/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { listFollowingStores } from '../../apis/follow'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import StoreCard from '../card/StoreCard'
import Pagination from '../ui/Pagination'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import boxImg from '../../assets/box.svg'

const FollowingStoresCollection = ({ heading = false }) => {
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
        setError(error)
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

      {heading && <h4 className='text-center'>{t('favStore')}</h4>}
      <div className='p-3 box-shadow bg-body rounded-2'>
        {!isLoading && pagination.size === 0 ? (
          <div className='m-4 text-center'>
            <img className='mb-3' src={boxImg} alt='boxImg' width={'80px'} />
            <h5>{t('noFavStore')}</h5>
          </div>
        ) : (
          <>
            <div className='container-fluid p-0 mt-3'>
              <div className='row'>
                {listStores?.map((store, index) => (
                  <div className='col-lg-3 col-sm-4 col-6 mb-4' key={index}>
                    <StoreCard store={store} onRun={() => setRun(!run)} />
                  </div>
                ))}
              </div>
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
          </>
        )}
      </div>
    </div>
  )
}

export default FollowingStoresCollection
