const UserRoleLabel = ({ role = '', detail = true }) => (
  <span className='position-relative d-inline-block'>
    {role === 'owner' ? (
      <span className='badge bg-primary cus-tooltip rounded-1'>
        {detail && <span>{role}</span>}
      </span>
    ) : (
      <span className='badge bg-primary cus-tooltip rounded-1'>
        {detail && <span>{role}</span>}
      </span>
    )}
  </span>
)

export default UserRoleLabel
