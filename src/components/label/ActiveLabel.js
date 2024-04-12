import { useTranslation } from 'react-i18next'
const ActiveLabel = () => {
  const { t } = useTranslation()

  return (
    <span className='badge bg-success rounded-1'>
      <span>{t('status.active')}</span>

      <i className='ms-2 fa-solid fa-toggle-on'></i>
    </span>
  )
}
export default ActiveLabel
