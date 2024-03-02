const SalePercentLabel = ({ salePercent = {} }) => (
  <small
    className='badge bg-primary text-center ms-3'
    style={{ width: '70px' }}
  >
    <small className='d-flex justify-content-center'>{salePercent}% GIẢM</small>
  </small>
)

export default SalePercentLabel
