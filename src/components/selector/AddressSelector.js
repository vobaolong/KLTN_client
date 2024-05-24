import { useState, useEffect } from 'react'
import axios from 'axios'

const apiUrl =
  'https://vietnam-administrative-division-json-server-swart.vercel.app'
const apiEndpointDistrict = apiUrl + '/district/?idProvince='
const apiEndpointWard = apiUrl + '/ward/?idDistrict='

async function getDistrict(idProvince) {
  const { data: districtList } = await axios.get(
    apiEndpointDistrict + idProvince
  )
  return districtList
}

async function getWard(idDistrict) {
  const { data: wardList } = await axios.get(apiEndpointWard + idDistrict)
  return wardList
}

const AddressSelector = ({ address, setAddress }) => {
  const [districtList, setDistrictList] = useState([])
  const [wardList, setWardList] = useState([])
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false)
  const [isLoadingWard, setIsLoadingWard] = useState(false)

  useEffect(() => {
    if (address.province) {
      setIsLoadingDistrict(true)
      getDistrict(address.province).then((districts) => {
        setDistrictList(districts)
        setIsLoadingDistrict(false)
      })
    } else {
      setDistrictList([])
      setWardList([])
    }
  }, [address.province])

  useEffect(() => {
    if (address.district) {
      setIsLoadingWard(true)
      getWard(address.district).then((wards) => {
        setWardList(wards)
        setIsLoadingWard(false)
      })
    } else {
      setWardList([])
    }
  }, [address.district])

  const handleProvinceChange = (selectedOption) => {
    setAddress({
      ...address,
      province: selectedOption.value,
      district: '',
      ward: ''
    })
  }

  const handleDistrictChange = (selectedOption) => {
    setAddress({ ...address, district: selectedOption.value, ward: '' })
  }

  const handleWardChange = (selectedOption) => {
    setAddress({ ...address, ward: selectedOption.value })
  }

  const provinceOptions = [
    { value: '01', label: 'Thành phố Hà Nội' },
    { value: '79', label: 'Thành phố Hồ Chí Minh' },
    { value: '31', label: 'Thành phố Hải Phòng' },
    { value: '48', label: 'Thành phố Đà Nẵng' },
    { value: '92', label: 'Thành phố Cần Thơ' },
    { value: '02', label: 'Tỉnh Hà Giang' },
    { value: '04', label: 'Tỉnh Cao Bằng' },
    { value: '06', label: 'Tỉnh Bắc Kạn' },
    { value: '08', label: 'Tỉnh Tuyên Quang' },
    { value: '10', label: 'Tỉnh Lào Cai' },
    { value: '11', label: 'Tỉnh Điện Biên' },
    { value: '12', label: 'Tỉnh Lai Châu' },
    { value: '14', label: 'Tỉnh Sơn La' },
    { value: '15', label: 'Tỉnh Yên Bái' },
    { value: '17', label: 'Tỉnh Hoà Bình' },
    { value: '19', label: 'Tỉnh Thái Nguyên' },
    { value: '20', label: 'Tỉnh Lạng Sơn' },
    { value: '22', label: 'Tỉnh Quảng Ninh' },
    { value: '24', label: 'Tỉnh Bắc Giang' },
    { value: '25', label: 'Tỉnh Phú Thọ' },
    { value: '26', label: 'Tỉnh Vĩnh Phúc' },
    { value: '27', label: 'Tỉnh Bắc Ninh' },
    { value: '30', label: 'Tỉnh Hải Dương' },
    { value: '33', label: 'Tỉnh Hưng Yên' },
    { value: '34', label: 'Tỉnh Thái Bình' },
    { value: '35', label: 'Tỉnh Hà Nam' },
    { value: '36', label: 'Tỉnh Nam Định' },
    { value: '37', label: 'Tỉnh Ninh Bình' },
    { value: '38', label: 'Tỉnh Thanh Hóa' },
    { value: '40', label: 'Tỉnh Nghệ An' },
    { value: '42', label: 'Tỉnh Hà Tĩnh' },
    { value: '44', label: 'Tỉnh Quảng Bình' },
    { value: '45', label: 'Tỉnh Quảng Trị' },
    { value: '46', label: 'Tỉnh Thừa Thiên Huế' },
    { value: '49', label: 'Tỉnh Quảng Nam' },
    { value: '51', label: 'Tỉnh Quảng Ngãi' },
    { value: '52', label: 'Tỉnh Bình Định' },
    { value: '54', label: 'Tỉnh Phú Yên' },
    { value: '56', label: 'Tỉnh Khánh Hòa' },
    { value: '58', label: 'Tỉnh Ninh Thuận' },
    { value: '60', label: 'Tỉnh Bình Thuận' },
    { value: '62', label: 'Tỉnh Kon Tum' },
    { value: '64', label: 'Tỉnh Gia Lai' },
    { value: '66', label: 'Tỉnh Đắk Lắk' },
    { value: '67', label: 'Tỉnh Đắk Nông' },
    { value: '68', label: 'Tỉnh Lâm Đồng' },
    { value: '70', label: 'Tỉnh Bình Phước' },
    { value: '72', label: 'Tỉnh Tây Ninh' },
    { value: '74', label: 'Tỉnh Bình Dương' },
    { value: '75', label: 'Tỉnh Đồng Nai' },
    { value: '77', label: 'Tỉnh Bà Rịa - Vũng Tàu' },
    { value: '80', label: 'Tỉnh Long An' },
    { value: '82', label: 'Tỉnh Tiền Giang' },
    { value: '83', label: 'Tỉnh Bến Tre' },
    { value: '84', label: 'Tỉnh Trà Vinh' },
    { value: '86', label: 'Tỉnh Vĩnh Long' },
    { value: '87', label: 'Tỉnh Đồng Tháp' },
    { value: '89', label: 'Tỉnh An Giang' },
    { value: '91', label: 'Tỉnh Kiên Giang' },
    { value: '93', label: 'Tỉnh Hậu Giang' },
    { value: '94', label: 'Tỉnh Sóc Trăng' },
    { value: '95', label: 'Tỉnh Bạc Liêu' },
    { value: '96', label: 'Tỉnh Cà Mau' }
  ]

  const districtOptions = districtList.map((district) => ({
    value: district.idDistrict,
    label: district.name
  }))

  const wardOptions = wardList.map((ward) => ({
    value: ward.idWard,
    label: ward.name
  }))

  return (
    <div>
      <div className='col-12'>
        <label htmlFor='province'>Tỉnh/Thành phố</label>
        <select
          id='province'
          options={provinceOptions}
          onChange={handleProvinceChange}
          value={provinceOptions.find(
            (option) => option.value === address.province
          )}
        />
      </div>
      <div className='col-12'>
        <label htmlFor='district'>Quận/Huyện</label>
        <select
          id='district'
          options={districtOptions}
          onChange={handleDistrictChange}
          value={districtOptions.find(
            (option) => option.value === address.district
          )}
          isLoading={isLoadingDistrict}
        />
      </div>
      <div className='col-12'>
        <label htmlFor='ward'>Xã/Phường</label>
        <select
          id='ward'
          options={wardOptions}
          onChange={handleWardChange}
          value={wardOptions.find((option) => option.value === address.ward)}
          isLoading={isLoadingWard}
        />
      </div>
    </div>
  )
}

export default AddressSelector
