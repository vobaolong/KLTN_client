import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { createCategory } from '../../../apis/category'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import InputFile from '../../ui/InputFile'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import CategorySelector from '../../selector/CategorySelector'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AdminCreateCategoryForm = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: '',
    image: '',
    categoryId: '',
    isValidName: true,
    isValidImage: true
  })

  const { _id, accessToken } = getToken()

  const handleChange = (name, isValidName, value) => {
    setNewCategory({
      ...newCategory,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setNewCategory({
      ...newCategory,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name } = newCategory
    if (!name) {
      setNewCategory({
        ...newCategory,
        isValidName: regexTest('anything', name)
      })
      return
    }

    const { isValidName } = newCategory
    if (!isValidName) return
    setIsConfirming(true)
  }

  const onSubmit = () => {
    const formData = new FormData()
    formData.set('name', newCategory.name)
    if (newCategory.categoryId)
      formData.set('categoryId', newCategory.categoryId)
    if (newCategory.image) formData.set('image', newCategory.image)
    setIsLoading(true)
    createCategory(_id, accessToken, formData)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else toast.success(t('toastSuccess.category.create'))
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative p-1'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('categoryDetail.add')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form
        className='border border-primary rounded-1 row mb-2'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary p-3'>
          <h1 className='text-white fs-5 m-0'>{t('categoryDetail.add')}</h1>
        </div>

        <div className='col-12 mt-4 px-4'>
          <p className=''>{t('categoryDetail.selectLargeCategory')}</p>
          <CategorySelector
            label={t('categoryDetail.selectLargeCategory')}
            selected='parent'
            isActive={false}
            onSet={(category) =>
              setNewCategory({
                ...newCategory,
                categoryId: category._id
              })
            }
          />
        </div>

        <div className='col-12 px-4 mt-2'>
          <Input
            type='text'
            label={t('categoryDetail.name')}
            value={newCategory.name}
            isValid={newCategory.isValidName}
            feedback={t('categoryValid.nameValid')}
            validator='anything'
            required={true}
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12 px-4 mt-2'>
          <InputFile
            label={t('categoryDetail.img')}
            size='avatar'
            noRadius={true}
            value={newCategory.image}
            isValid={newCategory.isValidImage}
            feedback={t('categoryValid.imgValid')}
            accept='image/jpg, image/jpeg, image/png, image/gif'
            onChange={(value) => handleChange('image', 'isValidImage', value)}
            onValidate={(flag) => handleValidate('isValidImage', flag)}
          />
        </div>

        <div className='col-12 px-4 pb-3 d-flex justify-content-between align-items-center mt-4 res-flex-reverse-md'>
          <Link
            to='/admin/category'
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
            {t('button.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminCreateCategoryForm
