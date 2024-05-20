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
    commune: oldAddress.split(', ')[1],
    district: oldAddress.split(', ')[2],
    province: oldAddress.split(', ')[3]
  })

  const [updateDispatch] = useUpdateDispatch()
  const { _id, accessToken } = getToken()

  useEffect(() => {
    setAddress({
      street: oldAddress.split(', ')[0],
      commune: oldAddress.split(', ')[1],
      district: oldAddress.split(', ')[2],
      province: oldAddress.split(', ')[3],
      isValidStreet: true,
      isValidCommune: true,
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

    const { street, commune, district, province } = address
    if (!street || !commune || !district || !province) {
      setAddress({
        ...address,
        isValidStreet: regexTest('address', street),
        isValidCommune: regexTest('address', commune),
        isValidDistrict: regexTest('address', district),
        isValidProvince: regexTest('address', province)
      })
      return
    }

    const { isValidStreet, isValidCommune, isValidDistrict, isValidProvince } =
      address
    if (
      !isValidStreet ||
      !isValidCommune ||
      !isValidDistrict ||
      !isValidProvince
    )
      return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    const addressString = `${address.street}, ${address.commune}, ${address.district}, ${address.province}`

    setIsLoading(true)
    updateAddress(_id, accessToken, index, { address: addressString })
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          updateDispatch('account', data.user)
          toast.success(t('toastSuccess.address.update'))
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Some thing went wrong')
        setIsLoading(false)
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
            label={t('addressForm.commune')}
            required={true}
            value={address.commune}
            isValid={address.isValidCommune}
            feedback={t('addressFormValid.communeValid')}
            validator='address'
            onChange={(value) =>
              handleChange('commune', 'isValidCommune', value)
            }
            onValidate={(flag) => handleValidate('isValidCommune', flag)}
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
