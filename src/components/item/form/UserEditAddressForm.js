import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateAddress } from '../../../apis/user'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import Error from '../../ui/Error'

const UserEditAddressForm = ({ oldAddress = '', index = null }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [address, setAddress] = useState({
    street: oldAddress.split(', ')[0],
    ward: oldAddress.split(', ')[1],
    district: oldAddress.split(', ')[2],
    province: oldAddress.split(', ')[3]
  })

  const [updateDispatch] = useUpdateDispatch()
  const { _id, accessToken } = getToken()

  useEffect(() => {
    setAddress({
      street: oldAddress.split(', ')[0],
      ward: oldAddress.split(', ')[1],
      district: oldAddress.split(', ')[2],
      province: oldAddress.split(', ')[3],
      isValidStreet: true,
      isValidWard: true,
      isValidDistrict: true,
      isValidProvince: true
    })
  }, [oldAddress, index])

  const handleChange = (name, isValidName, value) => {
    setAddress({
      ...address,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setAddress({
      ...address,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { street, ward, district, province } = address
    if (!street || !ward || !district || !province) {
      setAddress({
        ...address,
        isValidStreet: regexTest('address', street),
        isValidWard: regexTest('address', ward),
        isValidDistrict: regexTest('address', district),
        isValidProvince: regexTest('address', province)
      })
      return
    }

    const { isValidStreet, isValidWard, isValidDistrict, isValidProvince } =
      address
    if (!isValidStreet || !isValidWard || !isValidDistrict || !isValidProvince)
      return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    const addressString = `${address.street}, ${address.ward}, ${address.district}, ${address.province}`

    setError('')
    setIsLoading(true)
    updateAddress(_id, accessToken, index, { address: addressString })
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          updateDispatch('account', data.user)
          toast.success(t('toastSuccess.address.update'))
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError('Sever error')
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
          title={t('userDetail.editAddress')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2 gap-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label={t('addressForm.street')}
            required={true}
            value={address.street}
            isValid={address.isValidStreet}
            feedback={t('addressFormValid.streetValid')}
            validator='address'
            onChange={(value) => handleChange('street', 'isValidStreet', value)}
            onValidate={(flag) => handleValidate('isValidStreet', flag)}
          />
        </div>
        <div className='col-12'>
          <Input
            type='text'
            label={t('addressForm.ward')}
            required={true}
            value={address.ward}
            isValid={address.isValidWard}
            feedback={t('addressFormValid.wardValid')}
            validator='address'
            onChange={(value) => handleChange('ward', 'isValidWard', value)}
            onValidate={(flag) => handleValidate('isValidWard', flag)}
          />
        </div>
        <div className='col-12'>
          <Input
            type='text'
            label={t('addressForm.district')}
            required={true}
            value={address.district}
            isValid={address.isValidDistrict}
            feedback={t('addressFormValid.districtValid')}
            validator='address'
            onChange={(value) =>
              handleChange('district', 'isValidDistrict', value)
            }
            onValidate={(flag) => handleValidate('isValidDistrict', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='text'
            label={t('addressForm.province')}
            required={true}
            value={address.province}
            isValid={address.isValidProvince}
            feedback={t('addressFormValid.provinceValid')}
            validator='address'
            onChange={(value) =>
              handleChange('province', 'isValidProvince', value)
            }
            onValidate={(flag) => handleValidate('isValidProvince', flag)}
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

export default UserEditAddressForm
