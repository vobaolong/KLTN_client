/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { updateVariant, getVariantById } from '../../../apis/variant'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import MultiCategorySelector from '../../selector/MultiCategorySelector'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AdminEditVariantForm = ({ variantId = '' }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const [newVariant, setNewVariant] = useState({
    name: '',
    categoryIds: '',
    defaultParentCategories: '',
    isValidName: true
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setIsLoading(true)
    getVariantById(_id, accessToken, variantId)
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          setNewVariant({
            name: data.variant.name,
            defaultParentCategories: data.variant.categoryIds,
            categoryIds: data.variant.categoryIds.map(
              (category) => category._id
            ),
            isValidName: true
          })
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Something went wrong')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [variantId])

  const handleChange = (name, isValidName, value) => {
    setNewVariant({
      ...newVariant,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setNewVariant({
      ...newVariant,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, categoryIds } = newVariant
    if (!name || !categoryIds || categoryIds.length === 0) {
      setNewVariant({
        ...newVariant,
        isValidName: regexTest('anything', name)
      })
      return
    }

    const { isValidName } = newVariant
    if (!isValidName) return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    setIsLoading(true)
    updateVariant(_id, accessToken, variantId, newVariant)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else toast.success(t('toastSuccess.variant.update'))
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Something went wrong')
        setIsLoading(false)
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
          <h1 className='text-white fs-5 m-0'>{t('variantDetail.edit')}</h1>
        </div>

        <div className='col-12 mt-4 px-4'>
          <MultiCategorySelector
            label={t('categoryDetail.chosenParentCategory')}
            isActive={false}
            isRequired={true}
            defaultValue={newVariant.defaultParentCategories}
            onSet={(categories) =>
              setNewVariant({
                ...newVariant,
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
            label={t('variantDetail.name')}
            value={newVariant.name}
            isValid={newVariant.isValidName}
            feedback={t('categoryValid.validVariant')}
            validator='anything'
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12 px-4 pb-3 d-flex justify-content-between align-items-center mt-4 res-flex-reverse-md'>
          <Link
            to='/admin/variant'
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

export default AdminEditVariantForm
