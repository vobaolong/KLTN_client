const Success = ({ msg = 'Success!', color = 'success' }) => (
  <p className={`text-${color}`} role='alert'>
    {msg}
  </p>
)

export default Success
