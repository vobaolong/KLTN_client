import { useSelector } from 'react-redux'
import AdminReviewTable from '../../components/table/AdminReviewTable'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'

const ReviewPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const [selectedRating, setSelectedRating] = useState(0)

  const reviewRatings = [
    {
      label: t('status.all'),
      value: 0
    },
    { label: t('status.1'), value: 1 },
    { label: t('status.2'), value: 2 },
    { label: t('status.3'), value: 3 },
    { label: t('status.4'), value: 4 },
    { label: t('status.5'), value: 5 }
  ]

  const paths = [
    { name: t('breadcrumbs.home'), url: `/admin/dashboard` },
    { name: t('breadcrumbs.review'), url: `/admin/review/` }
  ]

  const handleRatingChange = (rating) => {
    setSelectedRating(rating)
  }

  return (
    <AdminLayout user={user} paths={paths}>
      <div className='nav nav-tabs bg-body rounded-top-1 box-shadow mb-2'>
        {reviewRatings.map((rating) => (
          <li
            className='nav-item flex-grow-1 text-center pointer'
            key={rating.value}
          >
            <span
              className={`nav-link h-100 ${
                selectedRating === rating.value ? `active` : ``
              }`}
              onClick={() => handleRatingChange(rating.value)}
            >
              {rating.label}
            </span>
          </li>
        ))}
      </div>
      <AdminReviewTable rating={selectedRating} />
    </AdminLayout>
  )
}

export default ReviewPage
