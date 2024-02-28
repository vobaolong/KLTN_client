const ProductLicenseLabel = ({ isActive = false, detail = true }) => (
  <span className='position-relative d-inline-block'>
    {isActive ? (
      <span className='badge bg-primary cus-tooltip'>
        <i className='fas fa-check-circle'></i>
        {detail && <span className='ms-2'>Licensed</span>}
      </span>
    ) : (
      <span className='badge bg-danger cus-tooltip'>
        <i className='fas fa-times-circle'></i>
        {detail && <span className='ms-2'>unLicensed</span>}
      </span>
    )}
    {isActive ? (
      <small className='cus-tooltip-msg'>
        This product is licensed by ZenMetic!
      </small>
    ) : (
      <small className='cus-tooltip-msg'>
        This product is banned by ZenMetic, contact us for more information!
      </small>
    )}
  </span>
)

export default ProductLicenseLabel
