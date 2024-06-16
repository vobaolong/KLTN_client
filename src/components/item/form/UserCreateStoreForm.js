/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { createStore } from '../../../apis/store'
import { listActiveCommissions as getListCommissions } from '../../../apis/commission'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import InputFile from '../../ui/InputFile'
import TextArea from '../../ui/TextArea'
import DropDownMenu from '../../ui/DropDownMenu'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import AddressForm from './AddressForm'

const CreateStoreForm = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error1, setError1] = useState('')
  const [error, setError] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [listActiveCommissions, setListActiveCommissions] = useState([])
  const [addressDetail, setAddressDetail] = useState({})
  const [store, setStore] = useState({
    name: '',
    bio: '',
    address: '',
    commissionId: '',
    avatar: '',
    cover: '',
    isValidName: true,
    isValidBio: true,
    isValidAddress: true,
    isValidAvatar: true,
    isValidCover: true
  })

  const history = useHistory()
  const { _id, accessToken } = getToken()

  const init = () => {
    getListCommissions()
      .then((data) => {
        if (data.error) setError1(data.error)
        else {
          setListActiveCommissions(data.commissions)
          setStore({
            ...store,
            commissionId: data.commissions[0]._id
          })
        }
      })
      .catch((error) => setError1(error))
  }

  useEffect(() => {
    init()
  }, [])

  const handleChange = (name, isValidName, value) => {
    setStore({
      ...store,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setStore({
      ...store,
      [isValidName]: flag
    })
  }

  const handleSelectCommission = (value) => {
    setStore({
      ...store,
      commissionId: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !store.name ||
      !store.bio ||
      !store.address ||
      !store.avatar ||
      !store.cover
    ) {
      setStore({
        ...store,
        isValidName: regexTest('name', store.name),
        isValidBio: regexTest('bio', store.bio),
        isValidAddress: regexTest('address', store.address),
        isValidAvatar: !!store.avatar,
        isValidCover: !!store.cover
      })
      return
    }

    if (
      !store.isValidName ||
      !store.isValidBio ||
      !store.isValidAddress ||
      !store.avatar ||
      !store.cover
    )
      return
    setIsConfirming(true)
  }

  useEffect(() => {
    const checkScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      setIsScrolled(!isBottom)
    }
    window.addEventListener('scroll', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const onSubmit = () => {
    const formData = new FormData()
    formData.set('name', store.name)
    formData.set('bio', store.bio)
    formData.set('address', store.address)
    formData.set('commissionId', store.commissionId)
    formData.set('avatar', store.avatar)
    formData.set('cover', store.cover)
    formData.set('addressDetail', JSON.stringify(addressDetail))

    setIsLoading(true)
    createStore(_id, accessToken, formData)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setIsLoading(false)
          setTimeout(() => {
            setError('')
          }, 3000)
        } else {
          toast.success(t('toastSuccess.store.create'))
          history.push(`/seller/${data.storeId}`)
        }
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative container-fluid'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.createStore')}
          message={
            <small>
              {t('storeDetail.agreeBy')}{' '}
              <Link to='/legal/privacy' target='_blank'>
                {t('footer.policy')}.
                <br />
              </Link>
              {t('storeDetail.getPaid')}{' '}
              <Link to='/legal/sellOnZenpii' target='_blank'>
                {t('storeDetail.sellOn')}
              </Link>
              .
            </small>
          }
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='' onSubmit={handleSubmit}>
        <div className='box-shadow rounded-1 row mb-2 bg-body p-2'>
          <div className='col-12 py-2'>
            <span className='fw-normal fs-12'>
              {t('storeDetail.basicInfo')}
            </span>
          </div>

          <div className='col-12 px-4 mt-2'>
            {error1 && <Error msg={error1} />}
            {!error1 && (
              <DropDownMenu
                listItem={listActiveCommissions?.map((c, i) => {
                  const newC = {
                    value: c._id,
                    label:
                      c.name + ' (' + c.fee.$numberDecimal + `%/${t('order')})`
                  }
                  return newC
                })}
                value={store.commissionId}
                setValue={handleSelectCommission}
                size='lg'
                label={t('storeDetail.typeOfStall')}
                required={true}
                borderBtn={false}
              />
            )}
          </div>

          {error && (
            <div className='col-12'>
              <Error msg={error} />
            </div>
          )}
          <div className='col-12 px-4 mt-2'>
            <Input
              type='text'
              label={t('storeDetail.storeName')}
              value={store.name}
              isValid={store.isValidName}
              feedback={t('storeDetailValid.validName')}
              validator='name'
              required={true}
              onChange={(value) => handleChange('name', 'isValidName', value)}
              onValidate={(flag) => handleValidate('isValidName', flag)}
            />
          </div>

          <div className='col-12 px-4 mt-2'>
            <TextArea
              type='text'
              label='Bio'
              value={store.bio}
              isValid={store.isValidBio}
              feedback={t('storeDetailValid.bioValid')}
              validator='bio'
              required={true}
              onChange={(value) => handleChange('bio', 'isValidBio', value)}
              onValidate={(flag) => handleValidate('isValidBio', flag)}
            />
          </div>
          <div className='col-12 px-4 mt-2'>
            <AddressForm
              onChange={(value) => {
                setAddressDetail({ ...value })
                handleChange('address', 'isValidAddress', value.street)
              }}
            />
          </div>
        </div>

        <div className='box-shadow rounded-1 row mb-2 bg-body p-2 mt-3'>
          <div className='col-12 px-3 py-1'>
            <span className='fw-normal fs-12'>{t('storeDetail.imgInfo')}</span>
          </div>
          <div className='col-2 px-4'>
            <InputFile
              label={t('storeDetail.avatar')}
              size='avatar'
              value={store.avatar}
              isValid={store.isValidAvatar}
              feedback={t('storeDetailValid.avatarValid')}
              required={true}
              accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
              onChange={(value) =>
                handleChange('avatar', 'isValidAvatar', value)
              }
              onValidate={(flag) => handleValidate('isValidAvatar', flag)}
            />
          </div>

          <div className='col-10 px-4'>
            <InputFile
              label={t('storeDetail.cover')}
              size='cover'
              value={store.cover}
              isValid={store.isValidCover}
              required={true}
              feedback={t('storeDetailValid.coverValid')}
              accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
              onChange={(value) => handleChange('cover', 'isValidCover', value)}
              onValidate={(flag) => handleValidate('isValidCover', flag)}
            />
          </div>
        </div>

        <div
          className={`bg-body ${
            isScrolled ? 'shadow' : 'box-shadow'
          } rounded-1 row px-4 p-3 mt-3`}
          style={{ position: 'sticky', bottom: '0' }}
        >
          <div className='d-flex justify-content-between align-items-center'>
            <Link
              to='/account/store'
              className='text-decoration-none link-hover res-w-100-md my-2'
            >
              <i className='fa-solid fa-angle-left'></i>{' '}
              {t('storeDetail.backToStore')}
            </Link>
            <small className='text-center d-block mx-2'>
              <span className='text-muted'>{t('storeDetail.getPaid')}</span>{' '}
              <Link to='/legal/sellOnZenpii' target='_blank'>
                {t('storeDetail.sellOn')}
              </Link>
              <br className='res-hide' />
              <input
                type='checkbox'
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span className='ms-2 text-muted'>
                {t('storeDetail.agreeBy')}{' '}
              </span>
              <Link to='/legal/privacy' target='_blank'>
                {t('footer.policy')}
              </Link>
            </small>
            <button
              type='submit'
              className='btn btn-primary ripple res-w-100-md rounded-1'
              onClick={handleSubmit}
              disabled={!isChecked}
              style={{ width: '200px', maxWidth: '100%' }}
            >
              {t('button.submit')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateStoreForm
