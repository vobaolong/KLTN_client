import { useTranslation } from 'react-i18next'

const DeletedLabel = () => {
  const { t } = useTranslation()
  return (
    <span className='badge bg-danger rounded-1'>
      <span>{t('status.unActive')}</span>
      <i className='ms-2 fa-solid fa-toggle-off'></i>
    </span>
  )
}

export default DeletedLabel
