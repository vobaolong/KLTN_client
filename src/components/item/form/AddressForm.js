/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Input from '../../ui/Input'
import axios from 'axios'

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

const AddressForm = ({ addressDetail, onChange }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [address, setAddress] = useState({
    province: addressDetail?.provinceID ?? '',
    provinceName: addressDetail?.provinceName ?? '',
    district: addressDetail?.districtID ?? '',
    districtName: addressDetail?.districtName ?? '',
    ward: addressDetail?.wardID ?? '',
    wardName: addressDetail?.wardName ?? '',
    street: addressDetail?.address?.split(', ')[0] ?? ''
  })
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const fetchProvinces = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(apiEndpointProvince, {
        headers: {
          Token: 'df39b10b-1767-11ef-bfe9-c2d25c6518ab'
        }
      })
      setProvinces(data.data)
    } catch (error) {
      console.error('Error fetching provinces:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDistricts = async () => {
    if (addressDetail?.provinceID) {
      const districts = await getDistricts(addressDetail?.provinceID)
      setDistricts(districts)
    }
    if (addressDetail?.districtID) {
      const wards = await getWards(addressDetail?.districtID)
      setWards(wards)
    }
  }

  useEffect(() => {
    fetchProvinces()
    fetchDistricts()
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
      try {
        setIsLoading(true)
        const districts = await getDistricts(value)
        setDistricts(districts)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
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
      try {
        setIsLoading(true)
        const wards = await getWards(value)
        setWards(wards)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      setWards([])
    }
  }

  const handleWardChange = (e) => {
    const value = e.target.value
    const name = e.target.options[e.target.selectedIndex].text.trim()
    setAddress({ ...address, ward: value, wardName: name })
  }

  const handleChange = (value) => {
    if (address.provinceName && address.districtName && address.wardName) {
      setAddress((prev) => ({
        ...prev,
        street: value
      }))

      const addressString = `${value}, ${address.wardName}, ${address.districtName}, ${address.provinceName}`

      onChange({ ...address, street: addressString })
    }
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      <div className='row mb-2 text-start gap-3'>
        <div className='col-12 d-flex justify-content-between align-items-center'>
          <label className='col-4 me-3' htmlFor='province'>
            {t('addressForm.province')} <span className='text-danger'>*</span>
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
          <label className='col-4 me-3' htmlFor='district'>
            {t('addressForm.district')} <span className='text-danger'>*</span>
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
        </div>

        <div className='col-12 d-flex justify-content-between align-items-center'>
          <label className='col-4 me-3' htmlFor='ward'>
            {t('addressForm.ward')} <span className='text-danger'>*</span>
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
        </div>

        <div className='col-12'>
          <Input
            isDisabled={
              !(
                address.districtName &&
                address.provinceName &&
                address.wardName
              )
            }
            type='text'
            name='street'
            label={t('addressForm.street')}
            value={address.street}
            isValid={address.isValidStreet}
            required
            maxLength='100'
            feedback={t('addressFormValid.streetValid')}
            validator='address'
            onChange={(value) => handleChange(value)}
          />
        </div>
        {error && (
          <div className='col-12'>
            <Error msg={error} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AddressForm
