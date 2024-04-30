import { useState } from 'react'
import { getToken } from '../../apis/auth'
import { sendConfirmationEmail } from '../../apis/auth'
import Loading from '../ui/Loading'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const EmailActiveButton = ({
  email = '',
  isEmailActive = false,
  googleId = '',
  facebookId = ''
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()
  const handleSendEmail = () => {
    setIsLoading(true)
    const { _id, accessToken } = getToken()

    sendConfirmationEmail(_id, accessToken)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else toast.success(data.success)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Something went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='d-inline-flex flex-column'>
      {email && isEmailActive && (
        <div className='position-relative d-inline-block'>
          <span className='badge text-success cus-tooltip rounded-1 bg-success-rgba'>
            <i className='fa-regular fa-circle-check me-2'></i>
            {t('verified')}
          </span>
          <small className='cus-tooltip-msg'>Email {t('verified')}</small>
        </div>
      )}

      {(googleId || facebookId) && (
        <div className='position-relative d-inline-block'>
          <span className='badge bg-primary d-inline-flex align-items-end cus-tooltip'>
            {googleId && (
              <img
                loading='lazy'
                className='social-img rounded-circle me-1 social-img--small'
                src='https://img.icons8.com/color/48/000000/google-logo.png'
                alt=''
              />
            )}
            {facebookId && (
              <img
                loading='lazy'
                className='social-img rounded-circle me-1 social-img--small'
                src='https://img.icons8.com/color/48/000000/facebook-new.png'
                alt=''
              />
            )}
            linked
          </span>
          <small className='cus-tooltip-msg'>
            Linked email is non editable
          </small>
        </div>
      )}

      {email && !isEmailActive && (
        <div className='position-relative d-inline-block'>
          {isLoading && <Loading size='small' />}
          <button
            className='btn btn-warning btn-sm text-white cus-tooltip ripple'
            onClick={handleSendEmail}
          >
            <i className='fa-regular fa-paper-plane me-2'></i>
            {t('verifyNow')}!
          </button>
          <small className='cus-tooltip-msg'>{t('confirmEmail')}</small>
        </div>
      )}
    </div>
  )
}

export default EmailActiveButton
