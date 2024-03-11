const UserRoleLabel = ({ role = '', detail = true }) => (
  <span className='position-relative d-inline-block'>
    {role == 'owner' ? (
      <span className='badge bg-primary cus-tooltip rounded-1'>
        <i className='fas fa-user-shield'></i>
        {detail && <span className='ms-2'>{role}</span>}
      </span>
    ) : (
      <span className='badge bg-primary cus-tooltip rounded-1'>
        <i className='fas fa-user-friends'></i>
        {detail && <span className='ms-2'>{role}</span>}
      </span>
    )}
    {/* {!detail ? (
      <small className='cus-tooltip-msg'>{role}</small>
    ) : (
      <small className='cus-tooltip-msg'>Role: {role}</small>
    )} */}
  </span>
)

export default UserRoleLabel
