import { useState } from 'react'
import { getToken } from '../../apis/auth'
import { removeReview } from '../../apis/review'
import StarRating from '../label/StarRating'
import ProductSmallCard from '../card/ProductSmallCard'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import ConfirmDialog from '../ui/ConfirmDialog'
import EditReviewItem from '../item/EditReviewItem'
import { humanReadableDate } from '../../helper/humanReadable'
import { useTranslation } from 'react-i18next'
import { calcTime } from '../../helper/calcTime'

const ReviewInfo = ({ review = {}, about = true, onRun }) => {
	const { t } = useTranslation()
	const [isLoading, setIsLoading] = useState(false)
	const [isConfirming, setIsConfirming] = useState(false)
	const [error, setError] = useState('')
	const handleRemove = () => {
		if (!isReviewAllowed) return
		setIsConfirming(true)
	}

	const onSubmit = () => {
		const { _id, accessToken } = getToken()
		setError('')
		setIsLoading(true)
		removeReview(_id, accessToken, review._id)
			.then((data) => {
				if (data.error) {
					setError(data.error)
					setTimeout(() => {
						setError('')
					}, 3000)
				} else if (onRun) onRun()
				setIsLoading(false)
			})
			.catch((error) => {
				setError('Server error')
				setTimeout(() => {
					setError('')
				}, 3000)
			})
	}
	const hoursDifference = calcTime(review?.orderId?.updatedAt)
	const isReviewAllowed = hoursDifference < 720 //30days
	return (
		<div className='row py-2 border-bottom position-relative'>
			{isLoading && <Loading />}
			{error && <Error msg={error} />}
			{isConfirming && (
				<ConfirmDialog
					title={t('reviewDetail.delete')}
					onSubmit={onSubmit}
					onClose={() => setIsConfirming(false)}
				/>
			)}

			<div className='col-12 px-1 d-flex justify-content-between align-items-center'>
				<div className='d-flex justify-content-between flex-grow-1'>
					<small className='hidden-avatar d-inline-flex gap-2'>
						<StarRating stars={review.rating} />
						<span className='text-primary fw-medium'>
							{review?.userId?.firstName} {review?.userId?.lastName}
						</span>
						{/* <span className='text-secondary'>{review?.productId?.name}</span> */}
						<span className='text-success rounded-1 px-1 bg-value'>
							<i class='fa-solid fa-circle-check'></i>{' '}
							{t('productDetail.purchased')}
						</span>
						{about && (
							<>
								<i className='fas fa-comment-dots text-primary mx-4'></i>
								<ProductSmallCard
									borderName={true}
									product={review.productId}
								/>
							</>
						)}
					</small>

					<span style={{ fontSize: '0.8rem', color: '#555' }}>
						{humanReadableDate(review.createdAt)}
					</span>
				</div>
			</div>
			<div className='col-10 mt-1 px-1'>
				<span style={{ fontSize: '0.9rem' }}>{review.content}</span>
			</div>
			{getToken()?._id === review.userId?._id && isReviewAllowed && (
				<div className='col-2 d-flex justify-content-end align-items-end flex-wrap px-1 mt-1'>
					<EditReviewItem oldReview={review} onRun={onRun} />
					<div className='d-inline-block position-relative ms-1'>
						<button
							type='button'
							className='btn btn-outline-danger rounded-1 btn-sm ripple cus-tooltip'
							onClick={handleRemove}
						>
							<i className='fas fa-trash-alt'></i>
						</button>
						<small className='cus-tooltip-msg'>
							{t('reviewDetail.delete')}
						</small>
					</div>
				</div>
			)}
		</div>
	)
}

export default ReviewInfo
