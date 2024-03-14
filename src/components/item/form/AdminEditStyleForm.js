import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { updateStyle, getStyleById } from '../../../apis/style'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'
import MultiCategorySelector from '../../selector/MultiCategorySelector'
import { useTranslation } from 'react-i18next'

const AdminEditStyleForm = ({ styleId = '' }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [newStyle, setNewStyle] = useState({
    name: '',
    categoryIds: '',
    defaultParentCategories: '',
    isValidName: true
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setError('')
    setIsLoading(true)
    getStyleById(_id, accessToken, styleId)
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setNewStyle({
            name: data.style.name,
            defaultParentCategories: data.style.categoryIds,
            categoryIds: data.style.categoryIds.map((category) => category._id),
            isValidName: true
          })
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [styleId])

  const handleChange = (name, isValidName, value) => {
    setNewStyle({
      ...newStyle,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setNewStyle({
      ...newStyle,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, categoryIds } = newStyle
    if (!name || !categoryIds || categoryIds.length === 0) {
      setNewStyle({
        ...newStyle,
        isValidName: regexTest('anything', name)
      })
      return
    }

    const { isValidName } = newStyle
    if (!isValidName) return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setSuccess('')
    setIsLoading(true)
    updateStyle(_id, accessToken, styleId, newStyle)
      .then((data) => {
        if (data.error) setError(data.error)
        else setSuccess(data.success)
        setIsLoading(false)
        setTimeout(() => {
          setSuccess('')
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError('Sever Error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='p-1 position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Update category'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form
        className='border border-primary rounded-1 row mb-2'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary p-3'>
          <h1 className='text-white fs-5 m-0'>Edit style</h1>
        </div>

        <div className='col-12 mt-4 px-4'>
          <MultiCategorySelector
            label='Chosen categories'
            isActive={false}
            isRequired={true}
            defaultValue={newStyle.defaultParentCategories}
            onSet={(categories) =>
              setNewStyle({
                ...newStyle,
                categoryIds: categories
                  ? categories.map((category) => category._id)
                  : ''
              })
            }
          />
        </div>

        <div className='col-12 px-4 mt-2'>
          <Input
            type='text'
            label='Style name'
            value={newStyle.name}
            isValid={newStyle.isValidName}
            feedback='Please provide a valid style name.'
            validator='anything'
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        {error && (
          <div className='col-12 px-4'>
            <Error msg={error} />
          </div>
        )}

        {success && (
          <div className='col-12 px-4'>
            <Success msg={success} />
          </div>
        )}
        <div className='col-12 px-4 pb-3 d-flex justify-content-between align-items-center mt-4 res-flex-reverse-md'>
          <Link
            to='/admin/style'
            className='text-decoration-none cus-link-hover res-w-100-md my-2'
          >
            <i className='fas fa-angle-left'></i> {t('button.back')}
          </Link>
          <button
            type='submit'
            className='btn btn-primary ripple res-w-100-md rounded-1'
            onClick={handleSubmit}
            style={{ width: '324px', maxWidth: '100%' }}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminEditStyleForm
