const StoreLicenseLabel = ({ isActive = false, detail = true }) => (
  <span className='position-relative d-inline-block'>
    {isActive ? (
      <span className='badge bg-success cus-tooltip rounded-1'>
        <i className='fas fa-check-circle'></i>
        {detail && <span className='ms-2'>Licensed</span>}
      </span>
    ) : (
      <span className='badge bg-danger cus-tooltip'>
        <i className='fas fa-times-circle'></i>
        {detail && <span className='ms-2'>Unlicensed</span>}
      </span>
    )}
    {/* {isActive ? (
      <small className='cus-tooltip-msg'>
        This store is licensed by ZenMetic!
      </small>
    ) : (
      <small className='cus-tooltip-msg'>
        This store is banned by ZenMetic, contact us for more information!
      </small>
    )} */}
  </span>
)

export default StoreLicenseLabel
