const Error = ({ msg = 'Something is wrong!' }) => (
	<small className='text-danger' role='alert'>
		{msg}
	</small>
)

export default Error
