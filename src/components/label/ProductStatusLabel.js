import { useTranslation } from 'react-i18next'

const ProductStatusLabel = ({ isSelling = true, detail = true }) => {
  const { t } = useTranslation()
  return (
    <span className='d-inline-block position-relative'>
      <span
        className={`badge border rounded-1 ${
          isSelling ? 'bg-success' : 'bg-secondary'
        } cus-tooltip`}
      >
        {isSelling ? (
          <span>{detail && <span>{t('status.show')}</span>}</span>
        ) : (
          <span>{detail && <span>{t('status.stored')}</span>}</span>
        )}
      </span>
      {/* <small className='cus-tooltip-msg'>
        {isSelling
          ? 'This product is selling, can order in this time.'
          : "This product is stored, can't order in this time"}
      </small> */}
    </span>
  )
}
export default ProductStatusLabel
