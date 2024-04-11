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
import Logo from '../../layout/menu/Logo'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const CreateStoreForm = () => {
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

  const onSubmit = () => {
    const formData = new FormData()
    formData.set('name', store.name)
    formData.set('bio', store.bio)
    formData.set('address', store.address)
    formData.set('commissionId', store.commissionId)
    formData.set('avatar', store.avatar)
    formData.set('cover', store.cover)

    setIsLoading(true)
    createStore(_id, accessToken, formData)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setIsLoading(false)
        } else {
          history.push(`/vendor/${data.storeId}`)
          toast.success('Tạo cửa hàng thành công')
        }
      })
      .catch((error) => {
        setError('Something went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
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

      <form
        className='border rounded-1 row mb-2 bg-body'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary rounded-top-1 px-3 py-1 d-flex align-items-center'>
          <Logo />
          <h4 className='text-white border-start px-3 mb-0'>
            {t('storeDetail.createStore')}
          </h4>
        </div>

        <div className='col-12 px-4 mt-2'>
          {error1 && <Error msg={error1} />}
          {!error1 && (
            <DropDownMenu
              listItem={listActiveCommissions?.map((c, i) => {
                const newC = {
                  value: c._id,
                  label:
                    c.name + ' (' + c.cost.$numberDecimal + `%/${t('order')})`
                }
                return newC
              })}
              value={store.commissionId}
              setValue={handleSelectCommission}
              size='lg'
              label={t('storeDetail.commissions')}
              required={true}
              borderBtn={true}
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
            to='/account/store'
            className='text-decoration-none link-hover res-w-100-md my-2'
          >
            <i className='fa-solid fa-angle-left'></i>{' '}
            {t('storeDetail.backToStore')}
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
