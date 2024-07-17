import { useState } from 'react'
import { getToken } from '../../apis/auth'
import { sendConfirmationEmail } from '../../apis/auth'
import Loading from '../ui/Loading'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import Error from '../ui/Error'

const EmailActiveButton = ({
  email = '',
  isEmailActive = false,
  googleId = ''
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { t } = useTranslation()
  const handleSendEmail = () => {
    setError('')
    setIsLoading(true)
    const { _id, accessToken } = getToken()

    sendConfirmationEmail(_id, accessToken)
      .then((data) => {
        if (data.error) setError(data.error)
        else toast.success(t('userDetail.sentVerifyEmailSuccess'))
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError('Server error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
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

      {googleId && (
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
            linked
          </span>
          <small className='cus-tooltip-msg'>
            {t('userDetail.nonEditEmail')}
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
            <i className='fa-solid fa-envelope me-2'></i>
            {t('verifyNow')}!
          </button>
          <small className='cus-tooltip-msg'>{t('confirmEmail')}</small>
          {error && (
            <span>
              <Error msg={error} />
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default EmailActiveButton
