import { useTranslation } from 'react-i18next'

const HotSaleLabel = ({ className = '' }) => {
  const { t } = useTranslation()
  return (
    <span
      style={{
        backgroundColor: '#FFE2C6',
        color: '#E36403',
        maxWidth: 'max-content'
      }}
      className={`badge rounded-2 ${className}`}
    >
      <i className='fa-solid fa-bolt-lightning me-1'></i>
      <span
        style={{ fontSize: '0.6rem', fontWeight: '700' }}
        className='text-uppercase'
      >
        {t('productDetail.hotSale')}
      </span>
    </span>
  )
}
export default HotSaleLabel
