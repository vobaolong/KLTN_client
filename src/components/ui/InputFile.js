import { useState, useEffect } from 'react'

const IMG = process.env.REACT_APP_STATIC_URL

const InputFile = ({
	onChange = () => { },
	onValidate = () => { },
	size = 'avatar',
	label = 'File',
	isValid = false,
	isDisabled = false,
	accept = '*/*',
	feedback = 'Please provide a valid file',
	defaultSrc = '',
	noRadius = false,
	required = false
}) => {
	const [src, setSrc] = useState('')

	useEffect(() => {
		if (defaultSrc) setSrc(IMG + defaultSrc)
	}, [defaultSrc])

	const onHandleChange = (e) => {
		const input = e.target
		if (input.files && input.files[0]) {
			const reader = new FileReader()
			reader.onload = (e) => {
				setSrc(e.target.result)
			}
			reader.readAsDataURL(input.files[0])
			onChange(input.files[0])
		} else {
			onValidate(false)
		}
	}

	const handleReset = () => {
		setSrc('')
		onChange('')
	}

	return (
		<div
			className={`cus-input-group cus-input-group--file ${size === 'avatar' ? 'cus-avatar-wrap' : ''
				}`}
		>
			<label className='cus-input-group-label cus-input-group-label--file text-muted'>
				{label} {required && <span style={{ color: 'red' }}>*</span>}
			</label>
			<div
				className={`${size === 'avatar' ? 'cus-avatar-box' : 'cus-cover-box '}`}
			>
				<div className={`${size === 'avatar' ? 'cus-avatar' : 'cus-cover'}`}>
					{src && (
						<img loading='lazy'

							src={src}
							className={size === 'avatar' ? 'cus-avatar-img' : 'cus-cover-img'}
							style={{ borderRadius: `${noRadius && 'unset'}` }}
							alt=''
						/>
					)}

					{src && (
						<label
							className={`${size === 'avatar'
									? 'cus-avatar-icon cus-avatar-icon--rm'
									: 'cus-cover-icon cus-cover-icon--rm'
								}`}
							onClick={handleReset}
						>
							<i className='fas fa-times'></i>
						</label>
					)}

					{src && (
						<label
							className={`${size === 'avatar' ? 'cus-avatar-icon' : 'cus-cover-icon'
								}`}
						>
							<i className='fas fa-camera'></i>
							<input
								className={`visually-hidden cus-input-group-input form-control ${isValid ? '' : 'is-invalid'
									}`}
								type='file'
								disabled={isDisabled}
								accept={accept}
								onChange={onHandleChange}
								required={required}
							/>
						</label>
					)}

					{!src && (
						<label
							className={`${size === 'avatar' ? 'cus-avatar-label' : 'cus-cover-label'
								}`}
							style={{ borderRadius: `${noRadius && '0'}` }}
						>
							<i className='fas fa-camera'></i>
							<input
								className={`visually-hidden cus-input-group-input form-control ${isValid ? '' : 'is-invalid'
									}`}
								type='file'
								disabled={isDisabled}
								accept={accept}
								onChange={onHandleChange}
							/>
							<small
								className='invalid-feedback ms-2 mt-0'
								style={{ width: 'unset' }}
							>
								{feedback}
							</small>
						</label>
					)}
				</div>
			</div>
		</div>
	)
}

export default InputFile
