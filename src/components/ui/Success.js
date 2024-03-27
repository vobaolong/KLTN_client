const Success = ({ msg = 'Success!', color = 'success' }) => (
  <small className={`text-${color}`} role='alert'>
    {msg}
  </small>
)

export default Success
