import { useState } from 'react'
import Language from './Language'
import Loading from './Loading'
import Paragraph from './Paragraph'
import { useTranslation } from 'react-i18next'

const AdminSetting = ({ heading = '' }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {heading && <h4 className='text-center text-uppercase'>{heading}</h4>}
      <div style={{ maxWidth: 'fit-content' }}>
        <Paragraph
          label={t('settingDetail.language')}
          colon
          value={<Language />}
        />
      </div>
    </div>
  )
}

export default AdminSetting
