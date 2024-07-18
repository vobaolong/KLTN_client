/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { updateBrand, getBrandById } from '../../../apis/brand'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import ConfirmDialog from '../../ui/ConfirmDialog'
import MultiCategorySelector from '../../selector/MultiCategorySelector'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AdminEditBrandForm = ({ brandId = '' }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const [newBrand, setNewBrand] = useState({
    name: '',
    categoryIds: '',
    defaultParentCategories: '',
    isValidName: true
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setError('')
    setIsLoading(true)
    getBrandById(_id, accessToken, brandId)
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setNewBrand({
            name: data.brand.name,
            defaultParentCategories: data.brand.categoryIds,
            categoryIds: data.brand.categoryIds.map((category) => category._id),
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
  }, [brandId])

  const handleChange = (name, isValidName, value) => {
    setNewBrand({
      ...newBrand,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setNewBrand({
      ...newBrand,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, categoryIds } = newBrand
    if (!name || !categoryIds || categoryIds.length === 0) {
      setNewBrand({
        ...newBrand,
        isValidName: regexTest('anything', name)
      })
      return
    }

    const { isValidName } = newBrand
    if (!isValidName) return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setIsLoading(true)
    updateBrand(_id, accessToken, brandId, newBrand)
      .then((data) => {
        if (data.error) setError(data.error)
        else toast.success(t('toastSuccess.brand.update'))
        setIsLoading(false)
        setTimeout(() => {
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
    <div className='container-fluid position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('categoryDetail.edit')}
          onSubmit={onSubmit}
          message={t('message.edit')}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form
        className='border bg-body rounded-1 row mb-2'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary rounded-top-1 px-4 py-3'>
          <h1 className='text-white fs-5 m-0'>{t('brandDetail.edit')}</h1>
        </div>

        <div className='col-12 mt-4 px-4'>
          <MultiCategorySelector
            label={t('categoryDetail.chosenParentCategory')}
            isActive={false}
            isRequired={true}
            defaultValue={newBrand.defaultParentCategories}
            onSet={(categories) =>
              setNewBrand({
                ...newBrand,
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
            required={true}
            label={t('brandDetail.name')}
            value={newBrand.name}
            isValid={newBrand.isValidName}
            feedback={t('categoryValid.validBrand')}
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

        <div className='col-12 px-4 pb-3 d-flex justify-content-between align-items-center mt-4 res-flex-reverse-md'>
          <Link
            to='/admin/brand'
            className='text-decoration-none cus-link-hover res-w-100-md my-2'
          >
            <i className='fa-solid fa-angle-left'></i> {t('button.back')}
          </Link>
          <button
            type='submit'
            className='btn btn-primary ripple res-w-100-md rounded-1'
            onClick={handleSubmit}
            style={{ width: '300px', maxWidth: '100%' }}
          >
            {t('button.save')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminEditBrandForm
