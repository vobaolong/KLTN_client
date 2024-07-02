import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateProfile } from '../../../apis/store'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import Input from '../../ui/Input'
import TextArea from '../../ui/TextArea'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import AddressForm from './AddressForm'
import { getAddressCache } from '../../../apis/address'
import Error from '../../ui/Error'

const StoreEditProfileForm = ({
  name = '',
  bio = '',
  address = '',
  storeId = ''
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [profile, setProfile] = useState({})
  const [error, setError] = useState('')
  const [updateDispatch] = useUpdateDispatch()
  const { _id, accessToken } = getToken()
  const { t } = useTranslation()
  const [addressDetail, setAddressDetail] = useState(null)

  const fetchAddress = async (address) => {
    setIsLoading(true)
    const res = await getAddressCache(encodeURIComponent(address))
    setAddressDetail(res)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAddress(address)
    setProfile({
      name: name,
      bio: bio,
      address: address,
      isValidName: true,
      isValidBio: true,
      isValidAddress: true
    })
  }, [name, bio, address, storeId])

  const handleChange = (name, isValidName, value) => {
    setProfile({
      ...profile,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setProfile({
      ...profile,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!profile.isValidName || !profile.isValidBio || !profile.isValidAddress)
      return
    setIsConfirming(true)
  }

  const onSubmit = () => {
    let store = {
      name: profile.name,
      bio: profile.bio,
      address: profile.address,
      addressDetail: addressDetail
    }
    setError('')
    setIsLoading(true)
    updateProfile(_id, accessToken, store, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.store.update'))
          updateDispatch('seller', data.store)
        }
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
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('storeDetail.editProfile')}
          onSubmit={onSubmit}
          message={t('message.edit')}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label={t('storeDetail.storeName')}
            value={profile.name}
            isValid={profile.isValidName}
            feedback={t('storeDetailValid.validName')}
            validator='name'
            required={true}
            placeholder='Ví dụ: Cửa hàng giày ABC'
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12 mt-3'>
          <TextArea
            type='text'
            label={t('storeDetail.bio')}
            value={profile.bio}
            isValid={profile.isValidBio}
            feedback={t('storeDetailValid.bioValid')}
            validator='bio'
            onChange={(value) => handleChange('bio', 'isValidBio', value)}
            onValidate={(flag) => handleValidate('isValidBio', flag)}
            row={5}
          />
        </div>

        <div className='col-12 mt-3'>
          {addressDetail !== null && (
            <AddressForm
              addressDetail={addressDetail}
              onChange={(value) => {
                setAddressDetail({ ...addressDetail, ...value })
                handleChange('address', 'isValidAddress', value.street)
              }}
            />
          )}
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

export default StoreEditProfileForm
