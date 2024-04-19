import { useTranslation } from 'react-i18next'

const DeletedLabel = () => {
  const { t } = useTranslation()
  return (
    <span className='badge border bg-danger-rgba text-danger rounded-1'>
      <i className='fa-solid fa-toggle-off me-1'></i>
      <span>{t('status.unActive')}</span>
    </span>
  )
}

export default DeletedLabel
