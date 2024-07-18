/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { listReviews, deleteReviews } from '../../apis/review'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import Pagination from '../ui/Pagination'
import StarRating from '../label/StarRating'
import { useTranslation } from 'react-i18next'
import { humanReadableDate } from '../../helper/humanReadable'
import SortByButton from './sub/SortByButton'
import ShowResult from '../ui/ShowResult'
import box from '../../assets/box.svg'
import ProductSmallCard from '../card/ProductSmallCard'
import { getToken } from '../../apis/auth'
import { toast } from 'react-toastify'
import ConfirmDialog from '../ui/ConfirmDialog'

const AdminReviewTable = ({
  productId = '',
  storeId = '',
  userId = '',
  rating
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [reviews, setReviews] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [deleteReview, setDeleteReview] = useState(null)
  const [isConfirming, setIsConfirming] = useState(false)

  const [filter, setFilter] = useState({
    productId,
    storeId,
    userId,
    rating: rating,
    sortBy: 'createdAt',
    order: 'desc',
    limit: 7,
    page: 1
  })
  const handleDeleteReview = (review) => {
    setDeleteReview(review)
    setIsConfirming(true)
  }
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
        setTimeout(() => setError(''), 3000)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
        setTimeout(() => setError(''), 3000)
      })
  }

  const { _id, accessToken } = getToken()
  const onSubmit = () => {
    if (!deleteReview) return
    setError('')
    setIsLoading(true)
    deleteReviews(_id, accessToken, deleteReview._id)
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          init()
          toast.success(t('toastSuccess.review.delete'))
        }
        setIsLoading(false)
        setDeleteReview(null)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError('Server error')
        setIsLoading(false)
        setDeleteReview(null)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      rating: rating === 0 ? '' : rating,
      storeId
    }))
  }, [rating, storeId])

  useEffect(() => {
    init()
  }, [filter])

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
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.deleteReview')}
          color='danger'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}
      <div className='p-3 box-shadow bg-body rounded-1'>
        {!isLoading && pagination.size === 0 ? (
          <div className='my-4 text-center'>
            <img className='mb-3' src={box} alt='noItem' width={'100px'} />
            <h5>{t('reviewDetail.noReview')}</h5>
          </div>
        ) : (
          <div className='table-scroll my-2'>
            <table className='table table-sm table-hover align-middle text-start'>
              <thead>
                <tr>
                  <th scope='col' className='text-center'>
                    #
                  </th>
                  <th scope='col'>{t('productDetail.name')}</th>
                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('Rating')}
                      sortBy='rating'
                      onSet={handleSetSortBy}
                    />
                  </th>
                  <th scope='col'>{t('reviewDetail.content')}</th>
                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('createdAt')}
                      sortBy='createdAt'
                      onSet={handleSetSortBy}
                    />
                  </th>
                  <th scope='col'>
                    <span>{t('action')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={review._id}>
                    <th scope='row'>
                      {index + 1 + (filter.page - 1) * filter.limit}
                    </th>
                    <td
                      style={{
                        whiteSpace: 'normal',
                        minWidth: '400px',
                        width: 'fit-content'
                      }}
                    >
                      <small>
                        <ProductSmallCard product={review.productId} />
                      </small>
                    </td>
                    <td>
                      <StarRating stars={review.rating} />
                    </td>
                    <td
                      style={{
                        maxWidth: '400px',
                        minWidth: '300px',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        overflow: 'auto'
                      }}
                    >
                      {review.content}
                    </td>
                    <td>{humanReadableDate(review.createdAt)}</td>
                    <td>
                      <button
                        type='button'
                        className='btn btn-sm btn-danger'
                        onClick={() => handleDeleteReview(review)}
                      >
                        {t('button.delete')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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

export default AdminReviewTable
