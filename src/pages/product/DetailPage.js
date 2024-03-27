/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { useParams } from 'react-router-dom'
import { getProduct } from '../../apis/product'
import {
	getNumberOfFollowersForProduct,
	checkFollowingProduct
} from '../../apis/follow'
import Error from '../../components/ui/Error'
import { useTranslation } from 'react-i18next'
import Loading from '../../components/ui/Loading'
import { FacebookShareButton } from 'react-share'
import Carousel from '../../components/image/Carousel'
import { formatPrice } from '../../helper/formatPrice'
import StarRating from '../../components/label/StarRating'
import MainLayout from '../../components/layout/MainLayout'
import ListReviews from '../../components/list/ListReviews'
import SigninButton from '../../components/item/SigninItem'
import StoreSmallCard from '../../components/card/StoreSmallCard'
import AddToCartForm from '../../components/item/form/AddToCartForm'
import SalePercentLabel from '../../components/label/SalePercentLabel'
import CategorySmallCard from '../../components/card/CategorySmallCard'
import ListProductsByStore from '../../components/list/ListProductsByStore'
import FollowProductButton from '../../components/button/FollowProductButton'
import ListBestSellerProducts from '../../components/list/ListBestSellerProduct'
import { calcPercent } from '../../helper/calcPercent'
import StoreCardSmall from '../../components/card/StoreCardSmall'

const DetailPage = () => {
	const { t } = useTranslation()
	const { productId } = useParams()
	const [error, setError] = useState('')
	const [product, setProduct] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	const init = () => {
		setError('')
		setIsLoading(true)
		getProduct(productId)
			.then(async (data) => {
				if (data.error) setError(data.error)
				else if (
					data.product &&
					data.product.storeId &&
					!data.product.storeId.isActive
				)
					setError('This store is banned by Zenpii!')
				else {
					const newProduct = data.product
					try {
						const res = await getNumberOfFollowersForProduct(newProduct._id)
						newProduct.numberOfFollowers = res.count
					} catch {
						newProduct.numberOfFollowers = 0
					}

					try {
						const { _id, accessToken } = getToken()
						const res = await checkFollowingProduct(
							_id,
							accessToken,
							newProduct._id
						)
						newProduct.isFollowing = res.success ? true : false
					} catch {
						newProduct.isFollowing = false
					}

					setProduct(newProduct)
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
	}, [productId])

	const salePercent = calcPercent(product.price, product.salePrice)

	return (
		<MainLayout>
			<div className='position-relative'>
				{isLoading && <Loading />}
				{error ? (
					<Error msg={error} />
				) : (
					<div className='container-fluid'>
						<div className='mb-2 hidden-avatar mx-0!important'>
							<CategorySmallCard category={product.categoryId} parent={true} />
						</div>
						<div
							className='row bg-white rounded-1 box-shadow'
							style={{ paddingTop: '12px', paddingBottom: '12px' }}
						>
							<div className='col-lg-5 col-md-6 '>
								<Carousel
									listImages={product.listImages}
									alt={product.name}
									style={{
										paddingBottom: 'calc(2/3*100%)'
									}}
								/>
							</div>
							<div className='col-lg-7 col-md-6 ps-4'>
								<small className='text-primary'>
									<StoreSmallCard store={product.storeId} />
								</small>
								<h5 className=''>{product.name}</h5>
								<div className='d-flex'>
									<a
										href='#review'
										className='me-2 border-bottom border-primary text-primary text-decoration-none'
									>
										{product.rating}
									</a>
									<StarRating stars={product.rating} />
									<span className='mx-2 px-2 border-start'>
										{product.sold}
										<span className='text-muted ms-1'>
											{t('productDetail.sold')}
										</span>
									</span>
								</div>
								<div className='price-div d-flex flex-wrap justify-content-start align-items-center mt-3 bg-light px-3 py-2 rounded rounded-sm'>
									{product.salePrice?.$numberDecimal !==
										product.price?.$numberDecimal && (
											<del className=' text-muted mt-1'>
												{formatPrice(product.price?.$numberDecimal)} <sup> ₫</sup>
											</del>
										)}
									<h2 className='text-primary fs-3 m-0 ms-3'>
										{formatPrice(product.salePrice?.$numberDecimal)}
										<sup> ₫</sup>
									</h2>

									{salePercent > 5 && (
										<SalePercentLabel salePercent={salePercent} />
									)}

									<small className='ms-2'> {t('productDetail.vat')}</small>
								</div>

								<div className='mt-4'>
									{product.storeId && !product.storeId.isOpen && (
										<Error msg="This store is closed, can' t order in this time!" />
									)}
									{product.quantity <= 0 && (
										<Error msg={t('productDetail.soldOut')} />
									)}
									{!getToken() && (
										<SigninButton
											className='w-100 btn-lg'
											title={t('button.signInToShopping')}
										/>
									)}
									{product.storeId?.isOpen &&
										product.quantity > 0 &&
										getToken() &&
										getToken().role === 'user' && (
											<AddToCartForm product={product} />
										)}
									<div className='d-flex align-items-center mt-4'>
										{getToken() && (
											<FollowProductButton
												productId={product._id}
												isFollowing={product.isFollowing}
												onRun={() =>
													setProduct({
														...product,
														numberOfFollowers: product.isFollowing
															? product.numberOfFollowers - 1
															: product.numberOfFollowers + 1,
														isFollowing: !product.isFollowing
													})
												}
												className='btn-lg'
											/>
										)}
										{product?.numberOfFollowers > 0 && (
											<span className='ms-2'>
												{product?.numberOfFollowers} đã thích
											</span>
										)}
									</div>

									<div>
										<FacebookShareButton
											className='mt-2'
											url={
												window.location.href
													? 'https://hasaki.vn/san-pham/gel-rua-mat-la-roche-posay-cho-da-dau-nhay-cam-400ml-68810.html?gad_source=1&gclid=CjwKCAjw17qvBhBrEiwA1rU9wwx0pGlaJp9LXom7lUNIZFUsUSDTAe2iT_w7EfZcGZdnsMMcaIJROxoCL-oQAvD_BwE'
													: ''
											}
											quote={product.name}
										>
											<i className='fa-solid fa-share-from-square text-secondary'></i>
										</FacebookShareButton>
									</div>
								</div>
							</div>
						</div>
						<div className='row mt-3'>
							<div className='col-lg-9 col-md-12 rounded-1 box-shadow bg-white'>
								<div className='row res-flex-reverse-md'>
									<div className='container'>
										<ul className='nav nav-tabs justify-content-center' id='myTab' role='tablist'>
											<li className='nav-item' role='presentation'>
												<a
													className='nav-link active'
													id='details-tab'
													data-bs-toggle='tab'
													href='#details'
													role='tab'
													aria-controls='details'
													aria-selected='true'
												>
													{t('productDetail.description')}
												</a>
											</li>
											<li className='nav-item' role='presentation'>
												<a
													className='nav-link'
													id='reviews-tab'
													data-bs-toggle='tab'
													href='#reviews'
													role='tab'
													aria-controls='reviews'
													aria-selected='false'
												>
													{t('productDetail.productReview')}
												</a>
											</li>
										</ul>
										<div className='tab-content' id='myTabContent'>
											<div
												className='tab-pane fade show active'
												id='details'
												role='tabpanel'
												aria-labelledby='details-tab'
											>
												<div className='mb-5 py-2'>
													<span
														style={{
															whiteSpace: 'pre-line',
															textAlign: 'justify',
															fontSize: '0.9rem'
														}}
													>
														{product.description}
													</span>
												</div>
											</div>
											<div
												className='tab-pane fade'
												id='reviews'
												role='tabpanel'
												aria-labelledby='reviews-tab'
											>
												<div id='review'>
													<ListReviews
														heading={t('productDetail.productReview')}
														productId={product._id}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='col-lg-3 pe-0 d-lg-block d-md-none'>
								<div className='box-shadow w-100 mb-2'>
									<StoreCardSmall store={product.storeId} />
								</div>

							</div>
						</div>
						<div className='col-12'>
							{product.categoryId && (
								<div className='mt-4'>
									<ListBestSellerProducts
										heading={t('similarProducts')}
										categoryId={product.categoryId._id}
									/>
								</div>
							)}

							{product.storeId && (
								<div className='mt-4'>
									<ListProductsByStore
										heading={t('sameShop')}
										storeId={product.storeId._id}
									/>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</MainLayout >
	)
}

export default DetailPage
