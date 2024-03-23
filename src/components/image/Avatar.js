import UserAvatarUpload from './uploadButton/UserAvatarUpload'
import StoreAvatarUpload from './uploadButton/StoreAvatarUpload'
import ProductUpload from './uploadButton/ProductUpload'

const IMG = process.env.REACT_APP_STATIC_URL

const Avatar = ({
	storeId = '',
	productId = '',
	productIndex = '',
	avatar = '',
	name = '',
	alt = 'avatar',
	borderName = false,
	isEditable = false,
	size = '',
	noRadius = false,
	onRun,
	hide = false
}) => (
	<div className='cus-avatar-wrap'>
		<div className={`cus-avatar-box ${size && 'cus-avatar-box--small'}`}>
			<div className='cus-avatar'>
				<img
					src={`${IMG + avatar}`}
					className='cus-avatar-img'
					style={{ borderRadius: `${noRadius && '5px'}` }}
					alt={alt}
				/>
				{isEditable === 'user' && <UserAvatarUpload />}
				{isEditable === 'store' && <StoreAvatarUpload storeId={storeId} />}
				{isEditable === 'product' && (
					<ProductUpload
						productId={productId}
						index={productIndex}
						storeId={storeId}
						onRun={onRun}
					/>
				)}
			</div>
		</div>

		{(size !== 'small' || !hide) && (
			<h1
				className={`cus-avatar-name m-0 p-1 rounded-1 d-inline-block fs-5 ${borderName && 'bg-value shadow'
					}`}
			>
				{name}
			</h1>
		)}
	</div>
)

export default Avatar
