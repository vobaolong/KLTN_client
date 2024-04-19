import { useTranslation } from 'react-i18next'

const StoreActiveLabel = ({ isActive = false, detail = true }) => {
  const { t } = useTranslation()
  return (
    <span className='d-inline-block position-relative'>
      <span
        className={`badge border rounded-1 p-1 ${
          isActive ? 'bg-success-rgba' : 'bg-danger-rgba'
        }`}
      >
        {isActive ? (
          <span className='px-1 text-success'>
            <i className='fa-regular fa-circle-check'></i>

            {detail && <span className='ms-2'>{t('status.active')}</span>}
          </span>
        ) : (
          <span className='px-1 text-danger'>
            <i className='fa-solid fa-ban'></i>
            {detail && <span className='ms-2'>{t('status.banned')}</span>}
          </span>
        )}
      </span>
    </span>
  )
}
export default StoreActiveLabel
