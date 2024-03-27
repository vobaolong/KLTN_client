import { useTranslation } from 'react-i18next'

const ShowResult = ({ limit = {}, size = {}, pageCurrent = {} }) => {
  const { t } = useTranslation()
  return (
    <small className='text-nowrap res-hide'>
      {t('showing')} <b>{Math.min(limit, size - limit * (pageCurrent - 1))} </b>
      {t('of')} {size} {t('result')}
    </small>
  )
}
export default ShowResult
