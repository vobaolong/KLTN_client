const StoreLevelLabel = ({ level = {}, detail = true }) => (
	<span className='position-relative d-inline-block'>
		<span
			className='badge cus-tooltip rounded-1'
			style={{ backgroundColor: level.color, color: 'high-muted-color' }}
		>
			<i className='fas fa-shield-alt'></i>
			{detail && <span className='ms-1'>{level.name}</span>}
		</span>
		{!detail ? (
			<small className='cus-tooltip-msg'>{level.name}</small>
		) : (
			<small className='cus-tooltip-msg'>
				Điểm gốc: {level.minPoint} - Giảm giá:{' '}
				{level.discount && (level.discount.$numberDecimal * 100).toFixed(2)}%
			</small>
		)}
	</span>
)

export default StoreLevelLabel
