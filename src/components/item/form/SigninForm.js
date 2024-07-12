import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { signin, setToken, forgotPassword } from '../../../apis/auth'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import SocialForm from './SocialForm'

const SigninForm = ({ onSwap = () => {} }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [account, setAccount] = useState({
    username: '',
    password: '',
    isValidUsername: true,
    isValidPassword: true
  })

  const handleChange = (name, isValidName, value) => {
    setAccount({
      ...account,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setAccount({
      ...account,
      [isValidName]: flag
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const { username, password } = account
    if (!username || !password) {
      setAccount({
        ...account,
        isValidUsername:
          regexTest('email', username) || regexTest('phone', username),
        isValidPassword: regexTest('password', password)
      })
      return
    }

    const { isValidUsername, isValidPassword } = account
    if (!isValidUsername || !isValidPassword) return

    const user = { password }
    regexTest('email', username) && (user.email = username)
    regexTest('phone', username) && (user.phone = username)

    setIsLoading(true)
    setError('')
    signin(user)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setIsLoading(false)
        } else {
          const { accessToken, refreshToken, _id, role } = data
          setToken({ accessToken, refreshToken, _id, role }, () => {
            if (role === 'admin') history.push('/admin/dashboard')
            else history.go(0)
            toast.success(t('toastSuccess.signIn'))
          })
        }
        setTimeout(() => setError(''), 3000)
      })
      .catch((error) => {
        setError('Server error')
        setIsLoading(false)
        setTimeout(() => setError(''), 3000)
      })
  }

  const handleForgotPassword = () => {
    const { username } = account
    if (!username) {
      setAccount({
        ...account,
        isValidUsername:
          regexTest('email', username) || regexTest('phone', username)
      })
      return
    }

    const { isValidUsername } = account
    if (!isValidUsername) return

    if (regexTest('phone', username)) {
      setError(t('notAvailable'))
    } else {
      setIsLoading(true)

      forgotPassword({ email: username })
        .then((data) => {
          if (data.error) setError(data.error)
          else toast.success(t('toastSuccess.signIn'))
          setIsLoading(false)
          setTimeout(() => {
            setError('')
          }, 5000)
        })
        .catch((error) => {
          setError('Server error')
          setIsLoading(false)
          setTimeout(() => setError(''), 3000)
        })
    }
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      <form className='mb-2 row' onSubmit={handleFormSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label={t('signInForm.emailLabel')}
            value={account.username}
            isValid={account.isValidUsername}
            feedback={t('signInForm.emailFeedback')}
            validator='email|phone'
            required={true}
            placeholder='Ví dụ: example@gmail.com'
            onChange={(value) =>
              handleChange('username', 'isValidUsername', value)
            }
            onValidate={(flag) => handleValidate('isValidUsername', flag)}
          />
        </div>

        <div className='col-12 mt-3'>
          <Input
            type='password'
            label={t('signInForm.passwordLabel')}
            validator='password'
            value={account.password}
            isValid={account.isValidPassword}
            required={true}
            feedback={t('signInForm.passwordFeedback')}
            onChange={(value) =>
              handleChange('password', 'isValidPassword', value)
            }
            onValidate={(flag) => handleValidate('isValidPassword', flag)}
          />
        </div>

        {error && (
          <div className='col-12'>
            <Error msg={error} />
          </div>
        )}

        <div className='col-12 d-grid mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple fw-bold rounded-1'
            onClick={handleFormSubmit}
          >
            {t('button.signIn')}
          </button>
        </div>

        <div className='col-12 mt-4 cus-decoration-paragraph'>
          <p className='text-center text-muted cus-decoration-paragraph-p unselect text-uppercase'>
            {t('or')}
          </p>
        </div>
        <div className='col-12 d-grid gap-2 mt-4'>
          <SocialForm />
        </div>
        <div className='col-12 mt-4'>
          <small className='text-center d-block text-muted'>
            {t('button.forgotPW')}?{' '}
            <span
              className='pointer text-primary text-decoration-underline'
              onClick={handleForgotPassword}
            >
              {t('button.sendEmail')}
            </span>
          </small>

          <small className='text-center d-block text-muted'>
            {t('signInForm.dontHaveAccount')}{' '}
            <span
              className='text-primary pointer text-decoration-underline'
              onClick={onSwap}
            >
              {t('button.signUp')}
            </span>
          </small>
        </div>
      </form>
    </div>
  )
}

export default SigninForm
