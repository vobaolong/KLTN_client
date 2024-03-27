import { useState, useEffect } from 'react'

const SortByButton = ({
	title = '',
	currentSortBy = '',
	currentOrder = 'asc',
	sortBy = '',
	onSet = () => { }
}) => {
	const [flag, setFlag] = useState('')

	useEffect(
		() => setFlag(() => (currentSortBy === sortBy ? currentOrder : '')),
		[currentSortBy, currentOrder]
	)

	const handleClick = () => {
		if (!flag) {
			onSet('asc', sortBy)
			setFlag('asc')
		} else {
			const newFlag = flag === 'asc' ? 'desc' : 'asc'
			onSet(newFlag, sortBy)
			setFlag(newFlag)
		}
	}

	return (
		<span
			className='btn btn-sm text-nowrap text-secondary pointer'
			onClick={handleClick}
		>
			{title}
			{!flag ? (
				<i className='fa-solid fa-sort ms-2'></i>
			) : flag === 'asc' ? (
				<i className='fa-solid fa-arrow-down-wide-short ms-2'></i>
			) : (
				<i className='fa-solid fa-arrow-up-wide-short ms-2'></i>
			)}
		</span>
	)
}

export default SortByButton
