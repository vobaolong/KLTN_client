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
import Logo from '../../layout/menu/Logo'
import { useTranslation } from 'react-i18next'

const CreateStoreForm = (props) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error1, setError1] = useState('')
  const [error, setError] = useState('')

  const [listActiveCommissions, setListActiveCommissions] = useState([])
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

  const handleSelect = (value) => {
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

  const onSubmit = () => {
    const formData = new FormData()
    formData.set('name', store.name)
    formData.set('bio', store.bio)
    formData.set('address', store.address)
    formData.set('commissionId', store.commissionId)
    formData.set('avatar', store.avatar)
    formData.set('cover', store.cover)

    setError('')
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
          history.push(`/vendor/${data.storeId}`)
        }
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative p-1'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Create store'
          message={
            <small>
              By Creating your store, you agree to Zenpii's{' '}
              <Link to='/legal/termsOfUse' target='_blank'>
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link to='/legal/privacy' target='_blank'>
                Privacy Policy
              </Link>
              . How you'll get paid? Set up billing?{' '}
              <Link to='/legal/sellOnZenpii' target='_blank'>
                Sell on Zenpii
              </Link>
              .
            </small>
          }
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form
        className='border border-primary rounded-1 row mb-2'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary p-3 d-flex align-items-center'>
          <Logo />
          <h4 className='text-white border-start px-3'>
            {t('storeDetail.createStore')}
          </h4>
        </div>

        <div className='col-12 px-4 mt-2'>
          <Input
            type='text'
            label={t('storeDetail.storeName')}
            value={store.name}
            isValid={store.isValidName}
            feedback={t('storeDetailValid.nameValid')}
            validator='name'
            required={true}
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12 px-4'>
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

        <div className='col-12 px-4'>
          <Input
            type='text'
            label={t('storeDetail.pickupAddress')}
            value={store.address}
            isValid={store.isValidAddress}
            feedback={t('storeDetailValid.addressValid')}
            validator='address'
            required={true}
            onChange={(value) =>
              handleChange('address', 'isValidAddress', value)
            }
            onValidate={(flag) => handleValidate('isValidAddress', flag)}
          />
        </div>
        <div className='col-12 px-4'>
          <InputFile
            label={t('storeDetail.avatar')}
            size='avatar'
            value={store.avatar}
            isValid={store.isValidAvatar}
            feedback={t('storeDetailValid.avatarValid')}
            required={true}
            accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
            onChange={(value) => handleChange('avatar', 'isValidAvatar', value)}
            onValidate={(flag) => handleValidate('isValidAvatar', flag)}
          />
        </div>

        <div className='col-12 px-4'>
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

        <div className='col-12 px-4 mt-2'>
          {error1 && <Error msg={error1} />}
          {!error1 && (
            <DropDownMenu
              listItem={listActiveCommissions?.map((c, i) => {
                const newC = {
                  value: c._id,
                  label: c.name + ' (' + c.cost.$numberDecimal + '%/order)'
                }
                return newC
              })}
              value={store.commissionId}
              setValue={handleSelect}
              size='large'
              label={t('storeDetail.commissions')}
            />
          )}
        </div>

        {error && (
          <div className='col-12'>
            <Error msg={error} />
          </div>
        )}

        <div className='col-12 px-4 mt-2'>
          <small className='text-center d-block mx-2'>
            <span className='text-muted'>{t('storeDetail.getPaid')}</span>{' '}
            <Link to='/legal/sellOnZenpii' target='_blank'>
              {t('storeDetail.sellOn')}
            </Link>
            <br className='res-hide' />
            <span className='text-muted'>{t('storeDetail.agreeBy')} </span>
            <Link to='/legal/privacy' target='_blank'>
              {t('footer.policy')}
            </Link>
          </small>
        </div>

        <div className='col-12 px-4 pb-3 d-flex justify-content-between align-items-center mt-4 res-flex-reverse-md'>
          <Link
            to='/account/storeManager'
            className='text-decoration-none link-hover res-w-100-md my-2'
          >
            <i className='fas fa-angle-left'></i> {t('storeDetail.backToStore')}
          </Link>
          <button
            type='submit'
            className='btn btn-primary ripple res-w-100-md rounded-1'
            onClick={handleSubmit}
            style={{ width: '200px', maxWidth: '100%' }}
          >
            {t('button.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateStoreForm
