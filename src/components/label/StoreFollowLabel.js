const StoreFollowLabel = ({ numberOfFollowers = 0 }) => (
  <span className='position-relative d-inline-block'>
    <span className='badge bg-pink cus-tooltip rounded-1'>
      <i className='fas fa-heart me-1'></i>
      {numberOfFollowers}
    </span>
    <small className='cus-tooltip-msg'>followers</small>
  </span>
)

export default StoreFollowLabel
