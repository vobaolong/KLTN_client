import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { createCategory } from '../../../apis/category'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import InputFile from '../../ui/InputFile'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'
import CategorySelector from '../../selector/CategorySelector'

const AdminCreateCategoryForm = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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

    const { name, image } = newCategory
    if (!name || !image) {
      setNewCategory({
        ...newCategory,
        isValidName: regexTest('anything', name),
        isValidImage: !!image
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
    formData.set('image', newCategory.image)
    if (newCategory.categoryId)
      formData.set('categoryId', newCategory.categoryId)

    setError('')
    setSuccess('')
    setIsLoading(true)
    createCategory(_id, accessToken, formData)
      .then((data) => {
        if (data.error) setError(data.error)
        else setSuccess(data.success)
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
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
    <div className='position-relative p-1'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Create category'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form
        className='border border-primary rounded-3 row mb-2'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary p-3'>
          <h1 className='text-white fs-5 m-0'>Create new category</h1>
        </div>

        <div className='col-12 mt-4 px-4'>
          <p className=''>Choose parent category</p>
          <CategorySelector
            label='Chosen parent category'
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
            label='Category name'
            value={newCategory.name}
            isValid={newCategory.isValidName}
            feedback='Please provide a valid category name.'
            validator='anything'
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12 px-4 mt-2'>
          <InputFile
            label='Category image'
            size='avatar'
            noRadius={true}
            value={newCategory.image}
            isValid={newCategory.isValidImage}
            feedback='Please provide a valid category avatar.'
            accept='image/jpg, image/jpeg, image/png, image/gif'
            onChange={(value) => handleChange('image', 'isValidImage', value)}
            onValidate={(flag) => handleValidate('isValidImage', flag)}
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
            to='/admin/category'
            className='text-decoration-none cus-link-hover res-w-100-md my-2'
          >
            <i className='fas fa-arrow-circle-left'></i> Back to Category
            Manager
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

export default AdminCreateCategoryForm
