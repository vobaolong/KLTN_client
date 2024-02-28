import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateProfile } from '../../../apis/user'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'

const UserEditProfileForm = ({
  firstName = '',
  lastName = '',
  email = '',
  phone = '',
  id_card = '',
  googleId = false,
  facebookId = false
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [profile, setProfile] = useState({})

  const [updateDispatch] = useUpdateDispatch()
  const { _id, accessToken } = getToken()

  useEffect(() => {
    setProfile({
      firstName: firstName,
      lastName: lastName,
      email: email || '',
      phone: phone || '',
      id_card: id_card || '',
      isValidFirstName: true,
      isValidLastName: true,
      isValidEmail: true,
      isValidPhone: true,
      isValidIdCard: true
    })
  }, [firstName, lastName, email, phone, id_card])

  const handleChange = (name, isValidName, value) => {
    setProfile({
      ...profile,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    switch (isValidName) {
      case 'isValidEmail': {
        setProfile({
          ...profile,
          [isValidName]: flag || (!email && profile.email == '')
        })
        return
      }
      case 'isValidPhone': {
        setProfile({
          ...profile,
          [isValidName]: flag || (!phone && profile.phone == '')
        })
        return
      }
      case 'isValidIdCard': {
        setProfile({
          ...profile,
          [isValidName]: flag || (!id_card && profile.id_card == '')
        })
        return
      }

      default: {
        setProfile({
          ...profile,
          [isValidName]: flag
        })
        return
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !profile.isValidFirstName ||
      !profile.isValidLastName ||
      !profile.isValidEmail ||
      !profile.isValidPhone ||
      !profile.isValidIdCard
    )
      return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    let user = { firstName: profile.firstName, lastName: profile.lastName }
    if (!googleId && !facebookId && profile.email) user.email = profile.email
    if (profile.phone) user.phone = profile.phone
    if (profile.id_card) user.id_card = profile.id_card

    setError('')
    setSuccess('')
    setIsLoading(true)
    updateProfile(_id, accessToken, user)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          updateDispatch('account', data.user)
          setSuccess(data.success)
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
        }, 3000)
      })
      .catch((error) => {
        setIsLoading(false)
        setError('Server error')
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
          title='Edit profile'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-6'>
          <Input
            type='text'
            label='First name'
            value={profile.firstName}
            isValid={profile.isValidFirstName}
            feedback='Please provide a valid firstName.'
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
            label='Last name'
            value={profile.lastName}
            isValid={profile.isValidLastName}
            feedback='Please provide a valid lastName.'
            validator='name'
            onChange={(value) =>
              handleChange('lastName', 'isValidLastName', value)
            }
            onValidate={(flag) => handleValidate('isValidLastName', flag)}
          />
        </div>

        {!googleId && !facebookId && (
          <div className='col-12'>
            <Input
              type='text'
              label='Email address'
              value={profile.email}
              isValid={profile.isValidEmail}
              feedback='Please provide a valid email address.'
              validator='email'
              onChange={(value) => handleChange('email', 'isValidEmail', value)}
              onValidate={(flag) => handleValidate('isValidEmail', flag)}
            />
          </div>
        )}

        <div className='col-12'>
          <Input
            type='text'
            label='Phone number'
            value={profile.phone}
            isValid={profile.isValidPhone}
            feedback='Please provide a valid phone number.'
            validator='phone'
            onChange={(value) => handleChange('phone', 'isValidPhone', value)}
            onValidate={(flag) => handleValidate('isValidPhone', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='text'
            label='Id card'
            value={profile.id_card}
            isValid={profile.isValidIdCard}
            feedback='Please provide a valid id card.'
            validator='id_card'
            onChange={(value) =>
              handleChange('id_card', 'isValidIdCard', value)
            }
            onValidate={(flag) => handleValidate('isValidIdCard', flag)}
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

export default UserEditProfileForm
