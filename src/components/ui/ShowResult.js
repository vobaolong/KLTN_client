import { useTranslation } from 'react-i18next'

const ShowResult = ({ limit = {}, size = {}, pageCurrent = {} }) => {
  const { t } = useTranslation()
  return (
    <span
      style={{ fontSize: '0.85rem' }}
      className='text-nowrap text-secondary'
    >
      {t('showing')} <b>{Math.min(limit, size - limit * (pageCurrent - 1))} </b>
      {t('of')} <b>{size}</b> {t('result')}
    </span>
  )
}
export default ShowResult
