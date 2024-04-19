import { useTranslation } from 'react-i18next'

const MallLabel = ({ className = '' }) => {
  const { t } = useTranslation()
  return (
    <span
      style={{
        backgroundColor: '#F3F7FF',
        maxWidth: 'max-content'
      }}
      className={`badge rounded-2 text-primary ${className}`}
    >
      <i className='fa-regular fa-circle-check me-1'></i>
      <span
        style={{ fontSize: '0.6rem', fontWeight: '700' }}
        className='text-uppercase'
      >
        {t('productDetail.mall')}
      </span>
    </span>
  )
}
export default MallLabel
