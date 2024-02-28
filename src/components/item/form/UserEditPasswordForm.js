import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { updatePassword } from '../../../apis/user'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'

const UserEditPasswordForm = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [account, setAccount] = useState({
    currentPassword: '',
    newPassword: '',
    isValidCurrentPassword: true,
    isValidNewPassword: true
  })

  const { _id, accessToken } = getToken()

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

    if (!account.currentPassword || !account.newPassword) {
      setAccount({
        ...account,
        isValidCurrentPassword: regexTest('password', account.currentPassword),
        isValidNewPassword: regexTest('password', account.newPassword)
      })
      return
    }

    if (!account.isValidCurrentPassword || !account.isValidCurrentPassword)
      return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    const user = {
      currentPassword: account.currentPassword,
      newPassword: account.newPassword
    }

    setError('')
    setSuccess('')
    setIsLoading(true)
    updatePassword(_id, accessToken, user)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setAccount({
            currentPassword: '',
            newPassword: '',
            isValidCurrentPassword: true,
            isValidNewPassword: true
          })
          setSuccess(data.success)
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
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
    <div className='position-relative'>
      {isLoading && <Loading />}

      {isConfirming && (
        <ConfirmDialog
          title='Change password'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='password'
            label='Current password'
            value={account.currentPassword}
            isValid={account.isValidCurrentPassword}
            feedback='Please provide a valid password.'
            validator='password'
            onChange={(value) =>
              handleChange('currentPassword', 'isValidCurrentPassword', value)
            }
            onValidate={(flag) =>
              handleValidate('isValidCurrentPassword', flag)
            }
          />
        </div>

        <div className='col-12'>
          <Input
            type='password'
            label='New password'
            value={account.newPassword}
            isValid={account.isValidNewPassword}
            feedback='Password must contain at least 6 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character such as @, $, !, %, *, ?, &.'
            validator='password'
            onChange={(value) =>
              handleChange('newPassword', 'isValidNewPassword', value)
            }
            onValidate={(flag) => handleValidate('isValidNewPassword', flag)}
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
            className='btn btn-primary ripple'
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserEditPasswordForm
