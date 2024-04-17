import { useTranslation } from 'react-i18next'
const ActiveLabel = () => {
  const { t } = useTranslation()

  return (
    <span className='badge border bg-success-rgba text-success rounded-1'>
      <i className='me-2 fa-solid fa-toggle-on'></i>
      <span>{t('status.active')}</span>
    </span>
  )
}
export default ActiveLabel
