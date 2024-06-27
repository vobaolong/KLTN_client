import { useTranslation } from 'react-i18next'

const LevelLabel = ({ level = {}, detail = true }) => {
  const { t } = useTranslation()
  return (
    <span className='position-relative d-inline-block'>
      <span
        className='badge cus-tooltip rounded-1 unselect'
        style={{ backgroundColor: level.color, color: 'high-muted-color' }}
      >
        <i className='fa-solid fa-shield-halved'></i>
        {detail && <span className='ms-1'>{t(`${level.name}`)}</span>}
      </span>
      {!detail ? (
        <small className='cus-tooltip-msg'>{t(`${level.name}`)}</small>
      ) : (
        <small className='cus-tooltip-msg'>
          {t('userLabel.pointFloor')}: {level.minPoint} -{' '}
          {t('userLabel.discount')}:{' '}
          {level.discount && level.discount.$numberDecimal}%
        </small>
      )}
    </span>
  )
}

export default LevelLabel
