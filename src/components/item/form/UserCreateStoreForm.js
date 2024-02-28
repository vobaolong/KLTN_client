import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { createStore } from '../../../apis/store'
import { listActiveCommissions as getlistCommissions } from '../../../apis/commission'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import InputFile from '../../ui/InputFile'
import TextArea from '../../ui/TextArea'
import DropDownMenu from '../../ui/DropDownMenu'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import ConfirmDialog from '../../ui/ConfirmDialog'
import Logo from '../../layout/menu/Logo'

const CreateStoreForm = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error1, setError1] = useState('')
  const [error, setError] = useState('')

  const [listActiveCommissions, setListActiveCommissions] = useState([])
  const [store, setStore] = useState({
    name: '',
    bio: '',
    commissionId: '',
    avatar: '',
    cover: '',
    isValidName: true,
    isValidBio: true,
    isValidAvatar: true,
    isValidCover: true
  })

  const history = useHistory()
  const { _id, accessToken } = getToken()

  const init = () => {
    getlistCommissions()
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
      .catch((error) => setError1('Server Error'))
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
    if (!store.name || !store.bio || !store.avatar || !store.cover) {
      setStore({
        ...store,
        isValidName: regexTest('name', store.name),
        isValidBio: regexTest('bio', store.bio),
        isValidAvatar: !!store.avatar,
        isValidCover: !!store.cover
      })
      return
    }

    if (
      !store.isValidName ||
      !store.isValidBio ||
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
        setError('Server Error')
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
              By Creating your store, you agree to ZenMetic's{' '}
              <Link to='/legal/termsOfUse' target='_blank'>
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link to='/legal/privacy' target='_blank'>
                Privacy Policy
              </Link>
              . How you'll get paid? Set up billing?{' '}
              <Link to='/legal/sellOnZenMetic' target='_blank'>
                Sell on ZenMetic
              </Link>
              .
            </small>
          }
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form
        className='border border-primary rounded-3 row mb-2'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary p-3'>
          <Logo />
          <p className='text-white ms-2 fw-light'>Creating store is easy.</p>
        </div>

        <div className='col-12 px-4 mt-2'>
          <Input
            type='text'
            label='Store Name'
            value={store.name}
            isValid={store.isValidName}
            feedback='Please provide a valid store name.'
            validator='name'
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
            feedback='Please provide a valid store bio.'
            validator='bio'
            onChange={(value) => handleChange('bio', 'isValidBio', value)}
            onValidate={(flag) => handleValidate('isValidBio', flag)}
          />
        </div>

        <div className='col-12 px-4'>
          <InputFile
            label='Store Avatar'
            size='avatar'
            value={store.avatar}
            isValid={store.isValidAvatar}
            feedback='Please provide a valid store avatar.'
            accept='image/jpg, image/jpeg, image/png, image/gif'
            onChange={(value) => handleChange('avatar', 'isValidAvatar', value)}
            onValidate={(flag) => handleValidate('isValidAvatar', flag)}
          />
        </div>

        <div className='col-12 px-4'>
          <InputFile
            label='Store Cover'
            size='cover'
            value={store.cover}
            isValid={store.isValidCover}
            feedback='Please provide a valid store cover.'
            accept='image/jpg, image/jpeg, image/png, image/gif'
            onChange={(value) => handleChange('cover', 'isValidCover', value)}
            onValidate={(flag) => handleValidate('isValidCover', flag)}
          />
        </div>

        <div className='col-12 px-4 mt-2'>
          {error1 && <Error msg={error1} />}
          {!error1 && (
            <DropDownMenu
              listItem={
                listActiveCommissions &&
                listActiveCommissions.map((c, i) => {
                  const newC = {
                    value: c._id,
                    label: c.name + ' (' + c.cost.$numberDecimal + '%/order)'
                  }
                  return newC
                })
              }
              value={store.commissionId}
              setValue={handleSelect}
              size='large'
              label='Commission'
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
            <span className='text-muted'>
              How you'll get paid? Set up billing?{' '}
            </span>
            <Link to='/legal/sellOnZenMetic' target='_blank'>
              Sell on ZenMetic
            </Link>
            . <br className='res-hide' />
            <span className='text-muted'>
              By Creating store, you agree to ZenMetic's{' '}
            </span>
            <Link to='/legal/termsOfUse' target='_blank'>
              Terms of Use
            </Link>
            <span className='text-muted'> and </span>
            <Link to='/legal/privacy' target='_blank'>
              Privacy Policy
            </Link>
            .
          </small>
        </div>

        <div className='col-12 px-4 pb-3 d-flex justify-content-between align-items-center mt-4 res-flex-reverse-md'>
          <Link
            to='/account/storeManager'
            className='text-decoration-none link-hover res-w-100-md my-2'
          >
            <i className='fas fa-arrow-circle-left'></i> Back to store Manager
          </Link>
          <button
            type='submit'
            className='btn btn-primary ripple res-w-100-md'
            onClick={handleSubmit}
            style={{ width: '324px', maxWidth: '100%' }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateStoreForm
