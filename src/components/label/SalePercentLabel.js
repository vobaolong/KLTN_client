const SalePercentLabel = ({ salePercent = {} }) => (
  <span className='badge bg-primary text-center ms-3' style={{ width: '70px' }}>
    <span className='d-flex justify-content-center'>{salePercent}% GIẢM</span>
  </span>
)

export default SalePercentLabel
