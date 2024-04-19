import { useTranslation } from 'react-i18next'

const ProductActiveLabel = ({ isActive = false, detail = true }) => {
  const { t } = useTranslation()
  return (
    <span className='position-relative d-inline-block'>
      {isActive ? (
        <span className='badge border bg-success-rgba text-success rounded-1 default'>
          <i className='fa-regular fa-circle-check'></i>
          {detail && <span className='ms-2'>{t('status.active')}</span>}
        </span>
      ) : (
        <span className='badge border bg-danger-rgba text-danger rounded-1 default'>
          <i className='fa-solid fa-ban'></i>
          {detail && <span className='ms-2'>{t('status.banned')}</span>}
        </span>
      )}
      {/* {isActive ? (
        <small className='cus-tooltip-msg'>
          This product is licensed by Zenpii!
        </small>
      ) : (
        <small className='cus-tooltip-msg'>
          This product is banned by Zenpii, contact us for more information!
        </small>
      )} */}
    </span>
  )
}
export default ProductActiveLabel
