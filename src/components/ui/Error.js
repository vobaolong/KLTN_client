const Error = ({ msg = 'Something is wrong!' }) => (
  <p className='text-danger' role='alert'>
    {msg}
  </p>
)

export default Error
