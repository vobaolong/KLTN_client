import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateProfile } from '../../../apis/user'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import Error from '../../ui/Error'

const UserEditProfileForm = ({
  firstName = '',
  lastName = '',
  email = '',
  phone = '',
  id_card = '',
  googleId = false
}) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
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
          [isValidName]: flag || (!email && profile.email === '')
        })
        return
      }
      case 'isValidPhone': {
        setProfile({
          ...profile,
          [isValidName]: flag || (!phone && profile.phone === '')
        })
        return
      }
      case 'isValidIdCard': {
        setProfile({
          ...profile,
          [isValidName]: flag || (!id_card && profile.id_card === '')
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
    if (!googleId && profile.email) user.email = profile.email
    if (profile.phone) user.phone = profile.phone
    if (profile.id_card) user.id_card = profile.id_card

    setError('')
    setIsLoading(true)
    updateProfile(_id, accessToken, user)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          updateDispatch('account', data.user)
          toast.success(t('toastSuccess.userDetail.updateProfile'))
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
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
          title={t('userDetail.editProfile')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-6'>
          <Input
            type='text'
            label={t('userDetail.firstName')}
            value={profile.firstName}
            isValid={profile.isValidFirstName}
            feedback={t('userDetail.validFirstName')}
            validator='name'
            required={true}
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
            value={profile.lastName}
            isValid={profile.isValidLastName}
            feedback={t('userDetail.validLastName')}
            validator='name'
            required={true}
            onChange={(value) =>
              handleChange('lastName', 'isValidLastName', value)
            }
            onValidate={(flag) => handleValidate('isValidLastName', flag)}
          />
        </div>

        {!googleId && (
          <div className='col-12'>
            <Input
              type='text'
              label='Email'
              value={profile.email}
              isValid={profile.isValidEmail}
              feedback={t('userDetail.emailValid')}
              validator='email'
              required={true}
              onChange={(value) => handleChange('email', 'isValidEmail', value)}
              onValidate={(flag) => handleValidate('isValidEmail', flag)}
            />
          </div>
        )}

        <div className='col-12'>
          <Input
            type='text'
            label={t('userDetail.phone')}
            value={profile.phone}
            isValid={profile.isValidPhone}
            feedback={t('userDetail.phoneValid')}
            validator='phone'
            required={true}
            onChange={(value) => handleChange('phone', 'isValidPhone', value)}
            onValidate={(flag) => handleValidate('isValidPhone', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='text'
            label='ID Card'
            value={profile.id_card}
            isValid={profile.isValidIdCard}
            feedback={t('userDetail.idCardValid')}
            validator='id_card'
            required={true}
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

        <div className='col-12 d-grid mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple rounded-1'
            onClick={handleSubmit}
          >
            {t('button.save')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserEditProfileForm
