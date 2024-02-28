const StoreStatusLabel = ({ isOpen = true, detail = true }) => (
  <span className='d-inline-block position-relative'>
    <span
      className={`badge ${isOpen ? 'bg-success' : 'bg-danger'} cus-tooltip`}
    >
      {isOpen ? (
        <span>
          <i className='fas fa-door-open'></i>
          {detail && <span className='ms-2'>Open</span>}
        </span>
      ) : (
        <span>
          <i className='fas fa-door-closed'></i>
          {detail && <span className='ms-2'>Closed</span>}
        </span>
      )}
    </span>
    {/* <small className='cus-tooltip-msg'>
      {isOpen
        ? 'This store is open, can order in this time.'
        : "This store is closed, can't order in this time"}
    </small> */}
  </span>
)

export default StoreStatusLabel
