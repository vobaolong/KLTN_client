import { useTranslation } from 'react-i18next'

const VerifyLabel = ({ verify }) => {
  const { t } = useTranslation()
  return (
    <span>
      {verify ? (
        <span
          className='badge rounded-1 text-success'
          style={{ backgroundColor: '#c7f6d3' }}
        >
          <i className='fa-solid fa-circle-check me-1'></i>
          <span>{t('status.verified')}</span>
        </span>
      ) : (
        <span
          className='badge rounded-1 text-danger'
          style={{ backgroundColor: '#ff99a0' }}
        >
          <i className='fa-solid fa-circle-xmark me-1'></i>
          <span>{t('status.notVerified')}</span>
        </span>
      )}
    </span>
  )
}

export default VerifyLabel
