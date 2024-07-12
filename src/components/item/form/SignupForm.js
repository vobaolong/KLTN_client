import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../../../apis/auth'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import SocialForm from './SocialForm'
import { toast } from 'react-toastify'

const SignupForm = ({ onSwap = () => {} }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [isValidPasswordConfirmation, setIsValidPasswordConfirmation] =
    useState(true)
  const [account, setAccount] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    isValidFirstName: true,
    isValidLastName: true,
    isValidUsername: true,
    isValidPassword: true
  })

  const handleChange = (name, isValidName, value) => {
    setError('')
    setAccount({
      ...account,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setError('')
    setAccount({
      ...account,
      [isValidName]: flag
    })
  }
  const handleChangePasswordConfirmation = (value) => {
    setPasswordConfirmation(value)
  }

  const handleValidatePasswordConfirmation = (flag) => {
    setIsValidPasswordConfirmation(flag)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const { firstName, lastName, username, password } = account
    if (password !== passwordConfirmation) {
      setError('Mật khẩu không khớp, vui lòng thử lại!')
      return
    }
    if (
      !firstName ||
      !lastName ||
      !username ||
      !password ||
      !passwordConfirmation
    ) {
      setAccount({
        ...account,
        isValidFirstName: regexTest('name', firstName),
        isValidLastName: regexTest('name', lastName),
        isValidUsername:
          regexTest('email', username) || regexTest('phone', username),
        isValidPassword: regexTest('password', password)
      })
      return
    }
    if (
      !account.isValidFirstName ||
      !account.isValidLastName ||
      !account.isValidUsername ||
      !account.isValidPassword ||
      !isValidPasswordConfirmation ||
      password !== passwordConfirmation
    )
      return
    setIsConfirming(true)
  }

  const onSignupSubmit = () => {
    const { firstName, lastName, username, password } = account
    const user = { firstName, lastName, password }
    regexTest('email', username) && (user.email = username)
    regexTest('phone', username) && (user.phone = username)

    setIsLoading(true)
    setError('')
    signup(user)
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setAccount({
            ...account,
            firstName: '',
            lastName: '',
            username: '',
            password: ''
          })
          toast.success(t('toastSuccess.signUp'))
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
      })
  }

  return (
    <div className='sign-up-form-wrap position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.signUp')}
          message={
            <small className=''>
              <span className='text-muted'>{t('signInForm.agreeBy')} </span>
              <Link to='/legal/privacy' target='_blank'>
                {t('footer.policy')}
              </Link>
            </small>
          }
          onSubmit={onSignupSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='sign-up-form mb-2 row' onSubmit={handleSubmit}>
        <div className='col-6'>
          <Input
            type='text'
            label={t('userDetail.firstName')}
            value={account.firstName}
            isValid={account.isValidFirstName}
            feedback={t('userDetail.validFirstName')}
            placeholder='Nguyen Van'
            required={true}
            validator='name'
            onChange={(value) =>
              handleChange('firstName', 'isValidFirstName', value)
            }
            onValidate={(flag) => handleValidate('isValidFirstName', flag)}
          />
        </div>

        <div className='col-6'>
          <Input
            type='text'
            label={t('userDetail.lastName')}
            value={account.lastName}
            isValid={account.isValidLastName}
            feedback={t('userDetail.validLastName')}
            validator='name'
            placeholder='A'
            required={true}
            onChange={(value) =>
              handleChange('lastName', 'isValidLastName', value)
            }
            onValidate={(flag) => handleValidate('isValidLastName', flag)}
          />
        </div>

        <div className='col-12 mt-3'>
          <Input
            type='text'
            label={t('signInForm.emailLabel')}
            value={account.username}
            isValid={account.isValidUsername}
            feedback={t('signInForm.emailFeedback')}
            validator='email|phone'
            required={true}
            placeholder='Ví dụ: example@gmail.com hoặc 098***3434'
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
            hasEditBtn={true}
            value={account.password}
            isValid={account.isValidPassword}
            feedback={t('passwordFeedback')}
            validator='password'
            required={true}
            onChange={(value) =>
              handleChange('password', 'isValidPassword', value)
            }
            onValidate={(flag) => handleValidate('isValidPassword', flag)}
          />
        </div>
        <div className='col-12 mt-3'>
          <Input
            type='password'
            label={t('confirmPw')}
            value={passwordConfirmation}
            isValid={isValidPasswordConfirmation}
            feedback={t('passwordFeedback')}
            validator='password'
            required={true}
            onChange={(value) => handleChangePasswordConfirmation(value)}
            onValidate={(flag) => handleValidatePasswordConfirmation(flag)}
          />
        </div>

        {error && (
          <div className='col-12 mt-3'>
            <Error msg={error} />
          </div>
        )}

        <div className='col-12 d-grid mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple fw-bold rounded-1'
            onClick={handleSubmit}
          >
            {t('button.signUp')}
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
            {t('signInForm.haveAnAccount')}{' '}
            <span
              className='sign-in-item text-primary text-decoration-underline pointer'
              onClick={onSwap}
            >
              {t('button.signIn')}
            </span>
          </small>
        </div>
        <div className='col-12 mt-1'>
          <small className='text-center d-block mx-4'>
            <span className='text-muted'>{t('signInForm.agreeBy')} </span>
            <Link className='text-primary' to='/legal/privacy' target='_blank'>
              {t('footer.policy')}
            </Link>
          </small>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
