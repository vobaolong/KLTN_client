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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isConfirmingBack, setIsConfirmingBack] = useState(false)
  const [isConfirmingUpdate, setIsConfirmingUpdate] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: '',
    image: '',
    categoryId: '',
    defaultParentCategory: '',
    defaultSrc: '',
    isValidName: true,
    isValidImage: true
  })
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
  const { _id, accessToken } = getToken()

  const handleBackClick = (e) => {
    e.preventDefault()
    setIsConfirmingBack(true)
  }

  const handleConfirmBack = () => {
    setIsConfirmingBack(false)
    window.history.back()
  }

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
        console.log('Some thing went wrong')
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

    setIsConfirmingUpdate(true)
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
        console.log('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='container-fluid position-relative'>
      {isLoading && <Loading />}
      {isConfirmingUpdate && (
        <ConfirmDialog
          title={t('dialog.updateCategory')}
          onSubmit={onSubmit}
          message={t('message.edit')}
          onClose={() => setIsConfirmingUpdate(false)}
        />
      )}
      {isConfirmingBack && (
        <ConfirmDialog
          title={t('dialog.cancelUpdate')}
          onSubmit={handleConfirmBack}
          message={t('confirmDialog')}
          onClose={() => setIsConfirmingBack(false)}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className='row box-shadow bg-body rounded-1'>
          <div className='col-12 bg-primary p-3 rounded-top-2'>
            <span className='text-white fs-5 m-0'>
              {t('categoryDetail.edit')}
            </span>
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
              feedback={t('categoryValid.validName')}
              validator='anything'
              required={true}
              onChange={(value) => handleChange('name', 'isValidName', value)}
              onValidate={(flag) => handleValidate('isValidName', flag)}
            />
          </div>

          <div className='col-12 px-4 mt-3'>
            <InputFile
              label={t('categoryDetail.img')}
              size='avatar'
              noRadius={true}
              defaultSrc={newCategory.defaultSrc}
              value={newCategory.image}
              isValid={newCategory.isValidImage}
              feedback={t('categoryValid.validImg')}
              accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
              onChange={(value) => handleChange('image', 'isValidImage', value)}
              onValidate={(flag) => handleValidate('isValidImage', flag)}
            />
          </div>
        </div>

        <div
          className={`bg-body ${
            isScrolled ? 'shadow' : 'box-shadow'
          } rounded-1 row px-4 my-3 p-3`}
          style={{ position: 'sticky', bottom: '0' }}
        >
          <div className='d-flex justify-content-end align-items-center'>
            <Link
              to='/admin/category'
              className='btn btn-outline-primary ripple res-w-100-md rounded-1 me-3'
              style={{ width: '200px', maxWidth: '100%' }}
              onClick={handleBackClick}
            >
              {t('button.cancel')}
            </Link>
            <button
              type='submit'
              className='btn btn-primary ripple res-w-100-md rounded-1'
              onClick={handleSubmit}
              style={{ width: '200px', maxWidth: '100%' }}
            >
              {t('button.save')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminEditCategoryForm
