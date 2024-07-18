import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { createBrand } from '../../../apis/brand'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import MultiCategorySelector from '../../selector/MultiCategorySelector'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import Error from '../../ui/Error'

const AdminCreateBrandForm = () => {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [error, setError] = useState('')

  const [isConfirmingBack, setIsConfirmingBack] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [newBrand, setNewBrand] = useState({
    name: '',
    categoryIds: '',
    isValidName: true
  })
  const history = useHistory()
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
    history.push('/admin/brand')
    setIsConfirmingBack(false)
  }

  const updateNewBrand = (updates) => {
    setNewBrand((prevState) => ({ ...prevState, ...updates }))
  }

  const handleChange = (name, isValidName, value) => {
    updateNewBrand({ [name]: value, [isValidName]: true })
  }

  const handleValidate = (isValidName, flag) => {
    updateNewBrand({ [isValidName]: flag })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, categoryIds } = newBrand
    if (!name || !categoryIds || categoryIds.length === 0) {
      updateNewBrand({ isValidName: regexTest('anything', name) })
      return
    }

    const { isValidName } = newBrand
    if (!isValidName) return
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setIsLoading(true)
    createBrand(_id, accessToken, newBrand)
      .then((data) => {
        if (data.error) setError(data.error)
        else toast.success(t('toastSuccess.brand.create'))
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
          title={t('brandDetail.add')}
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
          message={t('confirmDialog')}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className='row box-shadow bg-body rounded-1'>
          <div className='col-12 bg-primary p-3 rounded-top-2'>
            <span className='text-white fs-5 m-0'>{t('brandDetail.add')}</span>
          </div>

          <div className='col-12 mt-3 px-4'>
            <span className=''>{t('productDetail.chooseCategory')}</span>
            <MultiCategorySelector
              label={t('chosenCategory')}
              isActive={false}
              isRequired={true}
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

          <div className='col-12 px-4 my-3'>
            <Input
              type='text'
              label={t('brandDetail.name')}
              value={newBrand.name}
              isValid={newBrand.isValidName}
              feedback={t('brandDetail.validName')}
              required={true}
              validator='anything'
              onChange={(value) => handleChange('name', 'isValidName', value)}
              onValidate={(flag) => handleValidate('isValidName', flag)}
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
              to='/admin/brand'
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
              style={{ width: '300px', maxWidth: '100%' }}
            >
              {t('button.submit')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminCreateBrandForm
