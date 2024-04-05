/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { updateCategory, getCategoryById } from '../../../apis/category'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import InputFile from '../../ui/InputFile'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import CategorySelector from '../../selector/CategorySelector'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AdminEditCategoryForm = ({ categoryId = '' }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: '',
    image: '',
    categoryId: '',
    defaultParentCategory: '',
    defaultSrc: '',
    isValidName: true,
    isValidImage: true
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setIsLoading(true)
    getCategoryById(categoryId)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else
          setNewCategory({
            name: data.category.name,
            image: '',
            categoryId: data.category.categoryId
              ? data.category.categoryId._id
              : '',
            defaultParentCategory: data.category.categoryId
              ? data.category.categoryId
              : '',
            defaultSrc: data.category.image,
            isValidName: true,
            isValidImage: true
          })
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [categoryId])

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

    const { isValidName, isValidImage } = newCategory
    if (!isValidName || !isValidImage) return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    const formData = new FormData()
    formData.set('name', newCategory.name)
    if (newCategory.image) formData.set('image', newCategory.image)
    if (newCategory.categoryId)
      formData.set('categoryId', newCategory.categoryId)
    setIsLoading(true)
    updateCategory(_id, accessToken, categoryId, formData)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else toast.success(t('toastSuccess.category.update'))
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='p-1 position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.updateCategory')}
          onSubmit={onSubmit}
          message={t('message.edit')}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form
        className='border border-primary rounded-1 row mb-2'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary p-3'>
          <h1 className='text-white fs-5 m-0'>{t('categoryDetail.edit')}</h1>
        </div>

        <div className='col-12 mt-4 px-4'>
          <CategorySelector
            label={t('categoryDetail.chosenParentCategory')}
            selected='parent'
            isActive={false}
            defaultValue={newCategory.defaultParentCategory}
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
            feedback='Please provide a valid category name.'
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
            defaultSrc={newCategory.defaultSrc}
            value={newCategory.image}
            isValid={newCategory.isValidImage}
            feedback='Please provide a valid category avatar.'
            accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
            onChange={(value) => handleChange('image', 'isValidImage', value)}
            onValidate={(flag) => handleValidate('isValidImage', flag)}
          />
        </div>
        <div className='col-12 px-4 pb-3 d-flex justify-content-between align-items-center mt-4 res-flex-reverse-md'>
          <Link
            to='/admin/category'
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

export default AdminEditCategoryForm
