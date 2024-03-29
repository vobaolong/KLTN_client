import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { addAddress } from '../../../apis/user'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const UserAddAddressForm = (props) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [address, setAddress] = useState({
    street: '',
    ward: '',
    district_city: '',
    city_province: '',
    country: 'Việt Nam',
    isValidStreet: true,
    isValidWard: true,
    isValidDistrict: true,
    isValidProvince: true,
    isValidCountry: true
  })

  const [updateDispatch] = useUpdateDispatch()
  const { _id, accessToken } = getToken()

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
    addAddress(_id, accessToken, { address: addressString })
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          updateDispatch('account', data.user)
          setAddress({
            street: '',
            ward: '',
            district_city: '',
            city_province: '',
            country: 'Việt Nam',
            isValidStreet: true,
            isValidWard: true,
            isValidDistrict: true,
            isValidProvince: true,
            isValidCountry: true
          })
          toast.success(data.success)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('userDetail.addAddress')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label={t('addressForm.street')}
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
            {t('button.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserAddAddressForm
