import { useState } from 'react'
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

const apiUrl =
  'https://vietnam-administrative-division-json-server-swart.vercel.app'
const apiEndpointDistrict = apiUrl + '/district/?idProvince='
const apiEndpointCommune = apiUrl + '/commune/?idDistrict='

async function getDistrict(idProvince) {
  const { data: districtList } = await axios.get(
    apiEndpointDistrict + idProvince
  )
  return districtList
}

async function getCommune(idDistrict) {
  const { data: communeList } = await axios.get(apiEndpointCommune + idDistrict)
  return communeList
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
    commune: '',
    communeName: '',
    street: '',
    isValidStreet: true
  })
  const [districtList, setDistrictList] = useState([])
  const [communeList, setCommuneList] = useState([])
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false)
  const [isLoadingCommune, setIsLoadingCommune] = useState(false)

  const [updateDispatch] = useUpdateDispatch()
  const { _id, accessToken } = getToken()

  const handleProvinceChange = async (e) => {
    const value = e.target.value
    const name = e.target.options[e.target.selectedIndex].text.trim()
    setAddress({
      ...address,
      province: value,
      provinceName: name,
      district: '',
      districtName: '',
      commune: '',
      communeName: ''
    })
    if (value) {
      setIsLoadingDistrict(true)
      const districts = await getDistrict(value)
      setDistrictList(districts)
      setIsLoadingDistrict(false)
    } else {
      setDistrictList([])
      setCommuneList([])
    }
  }

  const handleDistrictChange = async (e) => {
    const value = e.target.value
    const name = e.target.options[e.target.selectedIndex].text.trim()
    setAddress({
      ...address,
      district: value,
      districtName: name,
      commune: '',
      communeName: ''
    })
    if (value) {
      setIsLoadingCommune(true)
      const communes = await getCommune(value)
      setCommuneList(communes)
      setIsLoadingCommune(false)
    } else {
      setCommuneList([])
    }
  }

  const handleCommuneChange = (e) => {
    const value = e.target.value
    const name = e.target.options[e.target.selectedIndex].text.trim()
    setAddress({ ...address, commune: value, communeName: name })
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

    const { provinceName, districtName, communeName, isValidStreet } = address
    if (!provinceName || !districtName || !communeName || !isValidStreet) {
      setError(t('addressFormValid.allFields'))
      return
    }
    setIsConfirming(true)
  }

  const onSubmit = () => {
    const addressString = `${address.street}, ${address.communeName}, ${address.districtName}, ${address.provinceName}`
    setError('')
    setIsLoading(true)
    addAddress(_id, accessToken, { address: addressString })
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          updateDispatch('account', data.user)
          setAddress({
            province: '',
            provinceName: '',
            district: '',
            districtName: '',
            commune: '',
            communeName: '',
            street: '',
            isValidStreet: false
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
            <option value='0'>{t('addressForm.selectProvince')}</option>
            <option value='01'>Thành phố Hà Nội</option>
            <option value='79'>Thành phố Hồ Chí Minh</option>
            <option value='31'>Thành phố Hải Phòng</option>
            <option value='48'>Thành phố Đà Nẵng</option>
            <option value='92'>Thành phố Cần Thơ</option>
            <option value='02'>Tỉnh Hà Giang</option>
            <option value='04'>Tỉnh Cao Bằng</option>
            <option value='06'>Tỉnh Bắc Kạn</option>
            <option value='08'>Tỉnh Tuyên Quang</option>
            <option value='10'>Tỉnh Lào Cai</option>
            <option value='11'>Tỉnh Điện Biên</option>
            <option value='12'>Tỉnh Lai Châu</option>
            <option value='14'>Tỉnh Sơn La</option>
            <option value='15'>Tỉnh Yên Bái</option>
            <option value='17'>Tỉnh Hoà Bình</option>
            <option value='19'>Tỉnh Thái Nguyên</option>
            <option value='20'>Tỉnh Lạng Sơn</option>
            <option value='22'>Tỉnh Quảng Ninh</option>
            <option value='24'>Tỉnh Bắc Giang</option>
            <option value='25'>Tỉnh Phú Thọ</option>
            <option value='26'>Tỉnh Vĩnh Phúc</option>
            <option value='27'>Tỉnh Bắc Ninh</option>
            <option value='30'>Tỉnh Hải Dương</option>
            <option value='33'>Tỉnh Hưng Yên</option>
            <option value='34'>Tỉnh Thái Bình</option>
            <option value='35'>Tỉnh Hà Nam</option>
            <option value='36'>Tỉnh Nam Định</option>
            <option value='37'>Tỉnh Ninh Bình</option>
            <option value='38'>Tỉnh Thanh Hóa</option>
            <option value='40'>Tỉnh Nghệ An</option>
            <option value='42'>Tỉnh Hà Tĩnh</option>
            <option value='44'>Tỉnh Quảng Bình</option>
            <option value='45'>Tỉnh Quảng Trị</option>
            <option value='46'>Tỉnh Thừa Thiên Huế</option>
            <option value='49'>Tỉnh Quảng Nam</option>
            <option value='51'>Tỉnh Quảng Ngãi</option>
            <option value='52'>Tỉnh Bình Định</option>
            <option value='54'>Tỉnh Phú Yên</option>
            <option value='56'>Tỉnh Khánh Hòa</option>
            <option value='58'>Tỉnh Ninh Thuận</option>
            <option value='60'>Tỉnh Bình Thuận</option>
            <option value='62'>Tỉnh Kon Tum</option>
            <option value='64'>Tỉnh Gia Lai</option>
            <option value='66'>Tỉnh Đắk Lắk</option>
            <option value='67'>Tỉnh Đắk Nông</option>
            <option value='68'>Tỉnh Lâm Đồng</option>
            <option value='70'>Tỉnh Bình Phước</option>
            <option value='72'>Tỉnh Tây Ninh</option>
            <option value='74'>Tỉnh Bình Dương</option>
            <option value='75'>Tỉnh Đồng Nai</option>
            <option value='77'>Tỉnh Bà Rịa - Vũng Tàu</option>
            <option value='80'>Tỉnh Long An</option>
            <option value='82'>Tỉnh Tiền Giang</option>
            <option value='83'>Tỉnh Bến Tre</option>
            <option value='84'>Tỉnh Trà Vinh</option>
            <option value='86'>Tỉnh Vĩnh Long</option>
            <option value='87'>Tỉnh Đồng Tháp</option>
            <option value='89'>Tỉnh An Giang</option>
            <option value='91'>Tỉnh Kiên Giang</option>
            <option value='93'>Tỉnh Hậu Giang</option>
            <option value='94'>Tỉnh Sóc Trăng</option>
            <option value='95'>Tỉnh Bạc Liêu</option>
            <option value='96'>Tỉnh Cà Mau</option>
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
          >
            <option value=''>{t('addressForm.selectDistrict')}</option>
            {districtList.map((district) => (
              <option key={district.idDistrict} value={district.idDistrict}>
                {district.name}
              </option>
            ))}
          </select>
          {isLoadingDistrict && <Loading />}
        </div>

        <div className='col-12 d-flex justify-content-between align-items-center'>
          <label className='col-3 me-3' htmlFor='commune'>
            {t('addressForm.commune')}
          </label>
          <select
            className='flex-grow-1 border rounded-1 px-2 py-1 select-item'
            id='commune'
            onChange={handleCommuneChange}
            value={address.commune}
          >
            <option value=''>{t('addressForm.selectCommune')}</option>
            {communeList.map((commune) => (
              <option key={commune.idCommune} value={commune.idCommune}>
                {commune.name}
              </option>
            ))}
          </select>
          {isLoadingCommune && <Loading />}
        </div>

        <div className='col-12'>
          <Input
            type='text'
            label={t('addressForm.street')}
            value={address.street}
            isValid={address.isValidStreet}
            feedback={t('addressFormValid.streetValid')}
            validator='address'
            required={true}
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
