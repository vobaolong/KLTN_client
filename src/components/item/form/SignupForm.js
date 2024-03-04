import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../../../apis/auth'
import { regexTest } from '../../../helper/test'
import SocialForm from './SocialForm'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'

const SignupForm = ({ onSwap = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
    setSuccess('')
    setAccount({
      ...account,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setError('')
    setSuccess('')
    setAccount({
      ...account,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { firstName, lastName, username, password } = account
    if (!firstName || !lastName || !username || !password) {
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
      !account.isValidPassword
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
    setSuccess('')
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
          setSuccess(data.success)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server error!')
        setIsLoading(false)
      })
  }

  return (
    <div className='sign-up-form-wrap position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Đăng ký'
          message={
            <small className=''>
              <span className='text-muted'>
                Bằng việc đăng ký hoặc đăng ký với Google, bạn đã đồng ý với{' '}
              </span>
              <Link to='/legal/privacy' target='_blank'>
                Chính sách bảo mật
              </Link>{' '}
              của ZenMetic .
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
            label='Họ và tên đệm'
            value={account.firstName}
            isValid={account.isValidFirstName}
            feedback='Vui lòng cung cấp họ và tên đệm hợp lệ!'
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
            label='Tên'
            value={account.lastName}
            isValid={account.isValidLastName}
            feedback='Vui lòng cung cấp tên hợp lệ!'
            validator='name'
            onChange={(value) =>
              handleChange('lastName', 'isValidLastName', value)
            }
            onValidate={(flag) => handleValidate('isValidLastName', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='text'
            label='Địa chỉ Email hoặc số điện thoại'
            value={account.username}
            isValid={account.isValidUsername}
            feedback='Vui lòng cung cấp địa chỉ Email hoặc số điện thoại hợp lệ!'
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
            label='Mật khẩu'
            hasEditBtn={true}
            value={account.password}
            isValid={account.isValidPassword}
            feedback='Mật khẩu chứa ít nhất 6 ký tự, bao gồm ít nhất 1 ký tự chữ hoa, 1 ký tự chữ thường, 1 ký tự chữ số và 1 ký tự đặc biệt như @, $, !, %, *, ?, &!'
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

        {success && (
          <div className='col-12'>
            <Success msg={success} />
          </div>
        )}

        <div className='col-12 d-grid mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple fw-bold'
            onClick={handleSubmit}
          >
            Đăng ký
          </button>
        </div>

        <div className='col-12 mt-4'>
          <small className='text-center d-block text-muted'>
            Đã có tài khoản?{' '}
            <span
              className='sign-in-item text-primary text-decoration-underline'
              onClick={onSwap}
              style={{ cursor: 'pointer' }}
            >
              Đăng nhập ngay
            </span>
          </small>
        </div>

        {/* <div className='col-12 mt-4 cus-decoration-paragraph'>
          <p className='text-center text-muted cus-decoration-paragraph-p unselect'>
            HOẶC
          </p>
        </div>

        <div className='col-12 d-grid gap-2 mt-4'>
          <SocialForm />
        </div> */}

        <div className='col-12 mt-4'>
          <small className='text-center d-block mx-4'>
            <span className='text-muted'>
              Bằng việc đăng ký hoặc đăng ký với Google, bạn đã đồng ý với{' '}
            </span>
            <Link to='/legal/privacy' target='_blank'>
              Chính sách bảo mật
            </Link>{' '}
            của ZenMetic .
          </small>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
