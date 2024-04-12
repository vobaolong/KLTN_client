import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { createVariant } from '../../../apis/variant'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import MultiCategorySelector from '../../selector/MultiCategorySelector'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AdminCreateVariantForm = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [newVariant, setNewVariant] = useState({
    name: '',
    categoryIds: '',
    isValidName: true
  })

  const { _id, accessToken } = getToken()

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
    createVariant(_id, accessToken, newVariant)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else toast.success(data.success)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Something went wrong')
      })
  }

  return (
    <div className='p-1 position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('variantDetail.add')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
        />
      )}

      <form
        className='border border-primary rounded-1 row mb-2'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary p-3'>
          <h1 className='text-white fs-5 m-0'>{t('variantDetail.add')}</h1>
        </div>

        <div className='col-12 mt-4 px-4'>
          <p className=''>{t('productDetail.chooseCategory')}</p>
          <MultiCategorySelector
            label={t('chosenCategory')}
            isActive={false}
            isRequired={true}
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
            label={t('variantDetail.name')}
            value={newVariant.name}
            isValid={newVariant.isValidName}
            feedback={t('variantDetail.nameValid')}
            required={true}
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
            {t('button.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminCreateVariantForm
