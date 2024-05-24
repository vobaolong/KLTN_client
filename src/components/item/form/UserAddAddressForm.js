import { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../../../apis/auth'
import { addAddress } from '../../../apis/user'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import Loading from '../../ui/Loading'
import Input from '../../ui/Input'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import Error from '../../ui/Error'

const apiEndpointProvince =
  'https://online-gateway.ghn.vn/shiip/public-api/master-data/province'
const apiEndpointDistrict =
  'https://online-gateway.ghn.vn/shiip/public-api/master-data/district'
const apiEndpointWard =
  'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward'

async function getDistricts(provinceId) {
  const { data: districtList } = await axios.get(apiEndpointDistrict, {
    headers: {
      Token: 'df39b10b-1767-11ef-bfe9-c2d25c6518ab'
    },
    params: {
      province_id: provinceId
    }
  })
  return districtList.data
}

async function getWards(districtId) {
  const { data: wardList } = await axios.get(apiEndpointWard, {
    headers: {
      Token: 'df39b10b-1767-11ef-bfe9-c2d25c6518ab'
    },
    params: {
      district_id: districtId
    }
  })
  return wardList.data
}

const UserAddAddressForm = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)
  const [address, setAddress] = useState({
    province: '',
    provinceName: '',
    district: '',
    districtName: '',
    ward: '',
    wardName: '',
    street: '',
    isValidStreet: true
  })
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false)
  const [isLoadingWard, setIsLoadingWard] = useState(false)

  const [updateDispatch] = useUpdateDispatch()
  const { _id, accessToken } = getToken()

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { data } = await axios.get(apiEndpointProvince, {
          headers: {
            Token: 'df39b10b-1767-11ef-bfe9-c2d25c6518ab'
          }
        })
        setProvinces(data.data)
      } catch (error) {
        console.error('Error fetching provinces:', error)
      }
    }

    fetchProvinces()
  }, [])

  const handleProvinceChange = async (e) => {
    const value = e.target.value
    const name = e.target.options[e.target.selectedIndex].text.trim()
    setAddress({
      ...address,
      province: value,
      provinceName: name,
      district: '',
      districtName: '',
      ward: '',
      wardName: ''
    })
    if (value) {
      setIsLoadingDistrict(true)
      const districts = await getDistricts(value)
      setDistricts(districts)
      setIsLoadingDistrict(false)
    } else {
      setDistricts([])
      setWards([])
    }
  }

  const handleDistrictChange = async (e) => {
    const value = e.target.value
    const name = e.target.options[e.target.selectedIndex].text.trim()
    setAddress({
      ...address,
      district: value,
      districtName: name,
      ward: '',
      wardName: ''
    })
    if (value) {
      setIsLoadingWard(true)
      const wards = await getWards(value)
      setWards(wards)
      setIsLoadingWard(false)
    } else {
      setWards([])
    }
  }

  const handleWardChange = (e) => {
    const value = e.target.value
    const name = e.target.options[e.target.selectedIndex].text.trim()
    setAddress({ ...address, ward: value, wardName: name })
  }

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

    const { provinceName, districtName, wardName, street } = address
    if (!provinceName || !districtName || !wardName || !street) {
      setError(t('addressFormValid.allFields'))
      return
    }
    setIsConfirming(true)
  }

  const onSubmit = () => {
    const addressString = `${address.street}, ${address.wardName}, ${address.districtName}, ${address.provinceName}`
    const addressData = {
      provinceID: address.province,
      districtID: address.district,
      wardID: address.ward,
      address: addressString
    }
    setError('')
    setIsLoading(true)
    addAddress(_id, accessToken, addressData)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          updateDispatch('account', data.user)
          setAddress({
            province: '',
            provinceName: '',
            district: '',
            districtName: '',
            ward: '',
            wardName: '',
            street: '',
            isValidStreet: true
          })
          toast.success(t('toastSuccess.address.add'))
        }
        setIsLoading(false)
        setTimeout(() => setError(''), 3000)
      })
      .catch(() => {
        setError('Server Error')
        setIsLoading(false)
        setTimeout(() => setError(''), 3000)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('userDetail.addAddress')}
          onSubmit={onSubmit}
          message={t('confirmDialog')}
          onClose={() => setIsConfirming(false)}
        />
      )}
      <form className='row mb-2 text-start gap-3' onSubmit={handleSubmit}>
        <div className='col-12 d-flex justify-content-between align-items-center'>
          <label className='col-3 me-3' htmlFor='province'>
            {t('addressForm.province')}
          </label>
          <select
            className='flex-grow-1 border rounded-1 px-2 py-1 select-item'
            id='province'
            onChange={handleProvinceChange}
            value={address.province}
          >
            <option value=''>{t('addressForm.selectProvince')}</option>
            {provinces.map((province) => (
              <option key={province.ProvinceID} value={province.ProvinceID}>
                {province.ProvinceName}
              </option>
            ))}
          </select>
        </div>

        <div className='col-12 d-flex justify-content-between align-items-center'>
          <label className='col-3 me-3' htmlFor='district'>
            {t('addressForm.district')}
          </label>
          <select
            className='flex-grow-1 border rounded-1 px-2 py-1 select-item'
            id='district'
            onChange={handleDistrictChange}
            value={address.district}
            disabled={!address.province}
          >
            <option value=''>{t('addressForm.selectDistrict')}</option>
            {districts.map((district) => (
              <option key={district.DistrictID} value={district.DistrictID}>
                {district.DistrictName}
              </option>
            ))}
          </select>
          {isLoadingDistrict && <Loading />}
        </div>

        <div className='col-12 d-flex justify-content-between align-items-center'>
          <label className='col-3 me-3' htmlFor='ward'>
            {t('addressForm.ward')}
          </label>
          <select
            className='flex-grow-1 border rounded-1 px-2 py-1 select-item'
            id='ward'
            onChange={handleWardChange}
            value={address.ward}
            disabled={!address.district}
          >
            <option value=''>{t('addressForm.selectWard')}</option>
            {wards.map((ward) => (
              <option key={ward.WardCode} value={ward.WardCode}>
                {ward.WardName}
              </option>
            ))}
          </select>
          {isLoadingWard && <Loading />}
        </div>

        <div className='col-12'>
          <Input
            type='text'
            name='street'
            label={t('addressForm.street')}
            value={address.street}
            onHandleChange={handleChange}
            onHandleValidate={handleValidate}
            isValid={address.isValidStreet}
            required
            maxLength='100'
            feedback={t('addressFormValid.streetValid')}
            validator='address'
            onChange={(value) => handleChange('street', 'isValidStreet', value)}
            onValidate={(flag) => handleValidate('isValidStreet', flag)}
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
            {t('button.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserAddAddressForm
