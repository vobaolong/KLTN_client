import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { signin, setToken, forgotPassword } from '../../../apis/auth'
import { regexTest } from '../../../helper/test'
import SocialForm from './SocialForm'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'

const SigninForm = ({ onSwap = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [account, setAccount] = useState({
    username: '',
    password: '',
    isValidUsername: true,
    isValidPassword: true
  })

  const history = useHistory()

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
          })
        }
      })
      .catch((error) => {
        setError('Server error!')
        setIsLoading(false)
      })
  }

  const handleForgorPassword = () => {
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
      setError('This feature is not available yet!')
      setTimeout(() => setError(''), 3000)
    } else {
      setError('')
      setSuccess('')
      setIsLoading(true)

      forgotPassword({ email: username })
        .then((data) => {
          if (data.error) setError(data.error)
          else setSuccess(data.success)
          setIsLoading(false)
          setTimeout(() => {
            setError('')
            setSuccess('')
          }, 3000)
        })
        .catch((error) => {
          setError('Server Error')
          setTimeout(() => setError(''), 3000)
          setIsLoading(false)
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
            label='Email address or phone number'
            value={account.username}
            isValid={account.isValidUsername}
            feedback='Please provide a valid email address or phone number.'
            validator='email|phone'
            onChange={(value) =>
              handleChange('username', 'isValidUsername', value)
            }
            onValidate={(flag) => handleValidate('isValidUsername', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='password'
            label='Password'
            validator='password'
            value={account.password}
            isValid={account.isValidPassword}
            feedback='Please provide a valid password.'
            onChange={(value) =>
              handleChange('password', 'isValidPassword', value)
            }
            onValidate={(flag) => handleValidate('isValidPassword', flag)}
          />
        </div>

        {success && (
          <div className='col-12'>
            <Success msg={success} />
          </div>
        )}

        {error && (
          <div className='col-12'>
            <Error msg={error} />
          </div>
        )}

        <div className='col-12 d-grid mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple fw-bold'
            onClick={handleFormSubmit}
          >
            Sign in
          </button>
        </div>

        <div className='col-12 mt-4'>
          <small className='text-center d-block text-muted'>
            Forgot password?{' '}
            <span
              className='text-primary text-decoration-underline'
              style={{ cursor: 'pointer' }}
              onClick={handleForgorPassword}
            >
              Send email
            </span>
          </small>

          <small className='text-center d-block text-muted'>
            Don't have an account?{' '}
            <span
              className='text-primary text-decoration-underline'
              style={{ cursor: 'pointer' }}
              onClick={onSwap}
            >
              Sign up
            </span>
          </small>
        </div>

        <div className='col-12 mt-4 cus-decoration-paragraph'>
          <p className='text-center text-muted cus-decoration-paragraph-p unselect'>
            OR
          </p>
        </div>

        <div className='col-12 d-grid gap-2 mt-4'>
          <SocialForm />
        </div>

        <div className='col-12 mt-4'>
          <small className='text-center d-block mx-4'>
            <span className='text-muted'>
              By Signing in or Continue with Google or Facebook, you agree to
              ZenMetic's{' '}
            </span>
            <Link to='/legal/termsOfUse' target='_blank'>
              Terms of Use
            </Link>
            <span className='text-muted'> and </span>
            <Link to='/legal/privacy' target='_blank'>
              Privacy Policy
            </Link>
            .
          </small>
        </div>
      </form>
    </div>
  )
}

export default SigninForm
