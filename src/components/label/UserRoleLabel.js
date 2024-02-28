const UserRoleLabel = ({ role = '', detail = true }) => (
  <span className='position-relative d-inline-block'>
    {role == 'user' ? (
      <span className='badge bg-primary cus-tooltip'>
        <i className='fas fa-user'></i>
        {detail && <span className='ms-2'>{role}</span>}
      </span>
    ) : (
      <span className='badge bg-primary cus-tooltip'>
        <i className='fas fa-user-tie'></i>
        {detail && <span className='ms-2'>{role}</span>}
      </span>
    )}
    {!detail ? (
      <small className='cus-tooltip-msg'>{role}</small>
    ) : (
      <small className='cus-tooltip-msg'>Role: {role}</small>
    )}
  </span>
)

export default UserRoleLabel
