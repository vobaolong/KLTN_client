import { useTranslation } from 'react-i18next'

const UserLevelLabel = ({ level = {}, detail = true }) => {
  const { t } = useTranslation()
  return (
    <span className='position-relative d-inline-block'>
      <span
        className='badge cus-tooltip rounded-1'
        style={{ backgroundColor: level.color }}
      >
        <i className='fas fa-shield-alt'></i>
        {detail && <span className='ms-1'>{level.name}</span>}
      </span>
      {!detail ? (
        <small className='cus-tooltip-msg'>{level.name}</small>
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

export default UserLevelLabel
