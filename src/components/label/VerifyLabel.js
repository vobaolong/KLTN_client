const VerifyLabel = ({ verify }) => (
  <span>
    {verify ? (
      <span className='badge bg-success rounded-1' style={{ width: '80px' }}>
        <i class='fa-solid fa-circle-check me-1'></i>
        <span>Verified</span>
      </span>
    ) : (
      <span className='badge bg-danger rounded-1' style={{ width: '80px' }}>
        <i class='fa-solid fa-circle-xmark me-1'></i>
        <span>Not Verified</span>
      </span>
    )}
  </span>
)

export default VerifyLabel
