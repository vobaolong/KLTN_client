import { useTranslation } from 'react-i18next'

const VerifyLabel = ({ verify }) => {
  const { t } = useTranslation()
  return (
    <span>
      <span
        className={`badge rounded-1 text-${verify ? 'success' : 'danger'} bg-${
          verify ? 'success' : 'danger'
        }-rgba`}
      >
        <i
          className={`fa-solid fa-circle-${verify ? 'check' : 'xmark'} me-1`}
        ></i>
        <span>{verify ? t('status.verified') : t('status.notVerified')}</span>
      </span>
    </span>
  )
}

export default VerifyLabel
