import { useTranslation } from 'react-i18next'

const SuccessLabel = () => {
  const { t } = useTranslation()
  return (
    <span className='badge border bg-success-rgba text-success rounded-1'>
      <i className='fa-solid fa-circle-check'></i>
      <span className='ms-2'>{t('status.success')}</span>
    </span>
  )
}

export default SuccessLabel
