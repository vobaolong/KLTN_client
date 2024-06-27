import { useTranslation } from 'react-i18next'
import { formatPrice } from '../../helper/formatPrice'
import { useState } from 'react'

const EWalletInfo = ({ eWallet = 0 }) => {
  const { t } = useTranslation()
  const [hide, setHide] = useState(false)
  const handleHide = () => {
    setHide(!hide)
  }
  return (
    <div className='d-inline-flex justify-content-start align-items-center text-dark-emphasis fs-5'>
      <span className='fs-6'>{t('myBalance')}: </span>
      <span className='mx-2'>
        {hide ? formatPrice(eWallet) : '**********'}
        <sup>₫</sup>
      </span>
      <span
        title={!hide ? t('button.show') : t('button.hide')}
        className='pointer'
        onClick={handleHide}
      >
        {hide ? (
          <i className='fa-solid fa-eye'></i>
        ) : (
          <i className='fa-solid fa-eye-slash'></i>
        )}
      </span>
    </div>
  )
}
export default EWalletInfo
