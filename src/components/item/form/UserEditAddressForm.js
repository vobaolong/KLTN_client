import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateAddress } from '../../../apis/user'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'

const UserEditAddressForm = ({ oldAddress = '', index = null }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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

    setError('')
    setSuccess('')
    setIsLoading(true)
    updateAddress(_id, accessToken, index, { address: addressString })
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
          title='Edit address'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label='Street address'
            value={address.street}
            isValid={address.isValidStreet}
            feedback='Please provide a valid street address ("," is not allowed).'
            validator='address'
            onChange={(value) => handleChange('street', 'isValidStreet', value)}
            onValidate={(flag) => handleValidate('isValidStreet', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='text'
            label='Ward'
            value={address.ward}
            isValid={address.isValidWard}
            feedback='Please provide a valid ward ("," is not allowed).'
            validator='address'
            onChange={(value) => handleChange('ward', 'isValidWard', value)}
            onValidate={(flag) => handleValidate('isValidWard', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='text'
            label='City / district'
            value={address.district_city}
            isValid={address.isValidDistrict}
            feedback='Please provide a valid city / district ("," is not allowed).'
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
            label='Province / city'
            value={address.city_province}
            isValid={address.isValidProvince}
            feedback='Please provide a valid province / city ("," is not allowed).'
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
            label='Country'
            value={address.country}
            isValid={address.isValidCountry}
            feedback='Please provide a valid country ("," is not allowed).'
            validator='address'
            onChange={(value) =>
              handleChange('country', 'isValidCountry', value)
            }
            onValidate={(flag) => handleValidate('isValidCountry', flag)}
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

export default UserEditAddressForm
