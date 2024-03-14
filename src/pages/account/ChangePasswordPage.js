import { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { changePassword } from '../../apis/auth'
import Loading from '../../components/ui/Loading'
import Error from '../../components/ui/Error'
import Success from '../../components/ui/Success'
import Logo from '../../components/layout/menu/Logo'
import Input from '../../components/ui/Input'
import { regexTest } from '../../helper/test'

const ChangePasswordPage = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [redirect, setRedirect] = useState('')

  const { passwordCode } = useParams()
  const [account, setAccount] = useState({
    password: '',
    isValidPassword: true,
    passwordCode: passwordCode
  })

  useEffect(() => {
    setAccount({
      ...account,
      passwordCode: passwordCode
    })
  }, [passwordCode])

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

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!account.passwordCode || !account.password) {
      setAccount({
        ...account,
        isValidPassword: regexTest('password', account.password)
      })
      return
    }

    if (!account.isValidPassword) return
    else {
      setError('')
      setSuccess('')
      setIsLoading(true)
      changePassword(passwordCode, { password: account.password })
        .then((data) => {
          if (data.error) setError(data.error)
          else setSuccess(data.success)
          setIsLoading(false)
          setTimeout(() => {
            setError('')
          }, 3000)
        })
        .catch((error) => {
          setError('Server error')
          setIsLoading(false)
        })
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center mt-4'>
      <div
        className='position-relative'
        style={{ width: '460px', maxWidth: '100%' }}
      >
        {isLoading && <Loading />}
        {redirect && (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: props.location }
            }}
          />
        )}

        {success ? (
          <div className='p-2'>
            <Success msg={success} />
            <span
              className='text-primary text-decoration-underline pointer'
              onClick={() => setRedirect('/')}
            >
              Back to Login
            </span>
          </div>
        ) : (
          <form
            className='border border-primary rounded-1 row mb-2'
            onSubmit={handleSubmit}
          >
            <div className='col-12 bg-primary p-3'>
              <Logo />
              <p className='text-white fw-light'>Change password.</p>
            </div>

            <div className='col-12'>
              <Input
                type='password'
                label='New password'
                value={account.password}
                isValid={account.isValidPassword}
                feedback='Password must contain at least 6 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character such as @, $, !, %, *, ?, &.'
                validator='password'
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

            <div className='col-12 d-grid mt-4 mb-2'>
              <button
                type='submit'
                className='btn btn-primary ripple'
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ChangePasswordPage
