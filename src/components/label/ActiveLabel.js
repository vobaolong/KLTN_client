import { useTranslation } from 'react-i18next'
const ActiveLabel = () => {
  const { t } = useTranslation()

  return (
    <span className='badge border bg-success-rgba text-success rounded-1'>
      <i className='fa-solid fa-toggle-on me-1'></i>
      <span>{t('status.active')}</span>
    </span>
  )
}
export default ActiveLabel
