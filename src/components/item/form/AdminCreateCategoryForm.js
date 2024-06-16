import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
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
import Error from '../../ui/Error'

const AdminCreateCategoryForm = () => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmingBack, setIsConfirmingBack] = useState(false)
  const history = useHistory()
  const [newCategory, setNewCategory] = useState({
    name: '',
    image: '',
    categoryId: '',
    isValidName: true,
    isValidImage: true
  })

  const { _id, accessToken } = getToken()

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

  const handleBackClick = (e) => {
    e.preventDefault()
    setIsConfirmingBack(true)
  }

  const handleConfirmBack = () => {
    setIsConfirmingBack(false)
    history.push('/admin/category')
  }

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
    setError('')
    setIsLoading(true)
    createCategory(_id, accessToken, formData)
      .then((data) => {
        if (data.error) setError(data.error)
        else toast.success(t('toastSuccess.category.create'))
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
          title={t('categoryDetail.add')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
        />
      )}

      {isConfirmingBack && (
        <ConfirmDialog
          title={t('dialog.cancelCreate')}
          onSubmit={handleConfirmBack}
          onClose={() => setIsConfirmingBack(false)}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className='row box-shadow bg-body rounded-1'>
          <div className='col-12 bg-primary p-3 rounded-top-2'>
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
              feedback={t('categoryValid.validName')}
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
              feedback={t('categoryValid.validImg')}
              accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
              onChange={(value) => handleChange('image', 'isValidImage', value)}
              onValidate={(flag) => handleValidate('isValidImage', flag)}
            />
          </div>
        </div>
        {error && (
          <div className='col-12 px-4'>
            <Error msg={error} />
          </div>
        )}
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
              {t('button.submit')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminCreateCategoryForm
