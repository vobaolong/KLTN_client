import { useState, useEffect } from 'react'
import { listReviews } from '../../apis/review'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import Pagination from '../ui/Pagination'
import ReviewInfo from '../info/ReviewInfo'
import StarRating from '../label/StarRating'
import { useTranslation } from 'react-i18next'

const ListReviews = ({
  productId = '',
  storeId = '',
  userId = '',
  heading = 'Đánh Giá Sản Phẩm'
}) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [run, setRun] = useState(true)

  const [reviews, setReviews] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    productId,
    storeId,
    userId,
    rating: '',
    sortBy: 'rating',
    order: 'desc',
    limit: 6,
    page: 1
  })

  const init = () => {
    setError('')
    setIsLoading(true)
    listReviews(filter)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setReviews(data.reviews)
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
    if (!filter.productId && !filter.storeId) return
    init()
  }, [filter, run])

  useEffect(() => {
    setFilter({
      ...filter,
      productId,
      storeId,
      userId
    })
  }, [productId, storeId, userId])

  const handleChangePage = (newPage) => {
    setFilter({
      ...filter,
      page: newPage
    })
  }

  const renderFilterRating = () => {
    const render = []
    for (let i = 0; i <= 5; i++)
      render.push(
        <div
          key={i}
          className='form-check me-3 d-flex justify-content-start align-items-center'
        >
          <input
            className='form-check-input pointer'
            type='radio'
            name='rating'
            id={`rating${i}`}
            defaultChecked={
              i !== 0 ? filter.rating === i : filter.rating === ''
            }
            onClick={() => {
              if (i === 0)
                setFilter({
                  ...filter,
                  rating: ''
                })
              else
                setFilter({
                  ...filter,
                  rating: i
                })
            }}
          />
          <label
            className='form-check-label ms-1 pointer'
            htmlFor={`rating${i}`}
          >
            {i === 0 ? (
              <span>All</span>
            ) : (
              <small>
                <StarRating stars={i} />
              </small>
            )}
          </label>
        </div>
      )
    return render
  }

  return (
    <div className='container-fluid position-relative'>
      {heading && <h5 className='mb-3'>{heading}</h5>}

      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div className='d-flex justify-content-between align-items-end p-2 rounded-sm rounded border'>
        <div className='d-flex flex-wrap justify-content-start align-items-center'>
          {renderFilterRating()}
        </div>
        <span className='me-2 text-nowrap'>
          {pagination.size || 0} {t('result')}
        </span>
      </div>

      <div className='row mt-2'>
        {reviews?.map((review, index) => (
          <div className='col-12 mb-2' key={index}>
            <ReviewInfo
              review={review}
              about={!!storeId}
              onRun={() => setRun(!run)}
            />
          </div>
        ))}
      </div>

      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default ListReviews
