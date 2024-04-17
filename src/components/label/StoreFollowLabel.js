import { useTranslation } from 'react-i18next'

const StoreFollowLabel = ({ numberOfFollowers = 0 }) => {
  const { t } = useTranslation()
  return (
    <span className='position-relative d-inline-block'>
      <span className='badge bg-danger-rgba text-danger border cus-tooltip rounded-1'>
        <i className='fa-solid fa-heart me-1'></i>
        {numberOfFollowers}
      </span>
      <small className='cus-tooltip-msg'>{t('userDetail.followers')}</small>
    </span>
  )
}
export default StoreFollowLabel
