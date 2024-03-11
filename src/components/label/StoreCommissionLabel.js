const StoreCommissionLabel = ({ commission = {}, detail = true }) => (
  <span className='position-relative d-inline-block'>
    <span className='badge bg-secondary cus-tooltip rounded-1'>
      {detail && <span>{commission.name}</span>}
    </span>

    {!detail ? (
      <small className='cus-tooltip-msg'>{commission.name}</small>
    ) : (
      <small className='cus-tooltip-msg'>
        {commission.name?.charAt(0).toUpperCase() + commission.name?.slice(1)} -
        Commission: {commission.cost?.$numberDecimal}% / order
      </small>
    )}
  </span>
)

export default StoreCommissionLabel
