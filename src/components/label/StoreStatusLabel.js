import { useTranslation } from 'react-i18next'

const StoreStatusLabel = ({ isOpen = true, detail = true }) => {
  const { t } = useTranslation()

  return (
    <span className='d-inline-block position-relative'>
      <span
        className={`badge border rounded-1 p-1 ${
          isOpen ? 'bg-success-rgba' : 'bg-warning-rgba'
        }`}
      >
        {isOpen ? (
          <span className='px-1 text-success'>
            <i className='fa-solid fa-circle'></i>
            {detail && <span className='ms-2'>{t('storeDetail.open')}</span>}
          </span>
        ) : (
          <span className='px-1 text-warning'>
            <i className='fa-solid fa-clock'></i>
            {detail && <span className='ms-2'>{t('storeDetail.close')}</span>}
          </span>
        )}
      </span>
    </span>
  )
}
export default StoreStatusLabel
