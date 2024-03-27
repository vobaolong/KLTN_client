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

const UserEditAddressForm = ({ oldAddress = '', index = null }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [address, setAddress] = useState({
    street: oldAddress.split(', ')[0],
    ward: oldAddress.split(', ')[1],
    district_city: oldAddress.split(', ')[2],
    city_province: oldAddress.split(', ')[3],
    country: oldAddress.split(', ')[4],
    isValidStreet: true,
    isValidWard: true,
    isValidDistrict: true,
    isValidProvince: true,
    isValidCountry: true
  })

  const [updateDispatch] = useUpdateDispatch()
  const { _id, accessToken } = getToken()

  useEffect(() => {
    setAddress({
      street: oldAddress.split(', ')[0],
      ward: oldAddress.split(', ')[1],
      district_city: oldAddress.split(', ')[2],
      city_province: oldAddress.split(', ')[3],
      country: oldAddress.split(', ')[4],
      isValidStreet: true,
      isValidWard: true,
      isValidDistrict: true,
      isValidProvince: true,
      isValidCountry: true
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

    const { street, ward, district_city, city_province, country } = address
    if (!street || !ward || !district_city || !city_province || !country) {
      setAddress({
        ...address,
        isValidStreet: regexTest('address', street),
        isValidWard: regexTest('address', ward),
        isValidDistrict: regexTest('address', district_city),
        isValidProvince: regexTest('address', city_province),
        isValidCountry: regexTest('address', country)
      })
      return
    }

    const {
      isValidStreet,
      isValidWard,
      isValidDistrict,
      isValidProvince,
      isValidCountry
    } = address
    if (
      !isValidStreet ||
      !isValidWard ||
      !isValidDistrict ||
      !isValidProvince ||
      !isValidCountry
    )
      return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    const addressString =
      address.street +
      ', ' +
      address.ward +
      ', ' +
      address.district_city +
      ', ' +
      address.city_province +
      ', ' +
      address.country
    setIsLoading(true)
    updateAddress(_id, accessToken, index, { address: addressString })
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          updateDispatch('account', data.user)
          toast.success(data.success)
        }
        setIsLoading(false)
        setTimeout(() => {}, 3000)
      })
      .catch((error) => {
        toast.error(error)
        setIsLoading(false)
        setTimeout(() => {}, 3000)
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

      <form className='row mb-2' onSubmit={handleSubmit}>
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
            value={address.district_city}
            isValid={address.isValidDistrict}
            feedback={t('addressFormValid.districtValid')}
            validator='address'
            onChange={(value) =>
              handleChange('district_city', 'isValidDistrict', value)
            }
            onValidate={(flag) => handleValidate('isValidDistrict', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='text'
            label={t('addressForm.provinceCity')}
            required={true}
            value={address.city_province}
            isValid={address.isValidProvince}
            feedback={t('addressFormValid.provinceCityValid')}
            validator='address'
            onChange={(value) =>
              handleChange('city_province', 'isValidProvince', value)
            }
            onValidate={(flag) => handleValidate('isValidProvince', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='text'
            label={t('addressForm.country')}
            required={true}
            value={address.country}
            isValid={address.isValidCountry}
            feedback={t('addressFormValid.countryValid')}
            validator='address'
            onChange={(value) =>
              handleChange('country', 'isValidCountry', value)
            }
            onValidate={(flag) => handleValidate('isValidCountry', flag)}
          />
        </div>
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
