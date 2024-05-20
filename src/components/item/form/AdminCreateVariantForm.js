import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isConfirmingBack, setIsConfirmingBack] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [newVariant, setNewVariant] = useState({
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
    history.push('/admin/variant')
    setIsConfirmingBack(false)
  }

  const updateNewVariant = (updates) => {
    setNewVariant((prevState) => ({ ...prevState, ...updates }))
  }

  const handleChange = (name, isValidName, value) => {
    updateNewVariant({ [name]: value, [isValidName]: true })
  }

  const handleValidate = (isValidName, flag) => {
    updateNewVariant({ [isValidName]: flag })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, categoryIds } = newVariant
    if (!name || !categoryIds || categoryIds.length === 0) {
      updateNewVariant({ isValidName: regexTest('anything', name) })
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
        else toast.success(t('toastSuccess.variant.create'))
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Something went wrong')
      })
  }

  return (
    <div className='container-fluid position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('variantDetail.add')}
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
            <span className='text-white fs-5 m-0'>
              {t('variantDetail.add')}
            </span>
          </div>

          <div className='col-12 mt-3 px-4'>
            <span className=''>{t('productDetail.chooseCategory')}</span>
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

          <div className='col-12 px-4 my-3'>
            <Input
              type='text'
              label={t('variantDetail.name')}
              value={newVariant.name}
              isValid={newVariant.isValidName}
              feedback={t('variantDetail.validName')}
              required={true}
              validator='anything'
              onChange={(value) => handleChange('name', 'isValidName', value)}
              onValidate={(flag) => handleValidate('isValidName', flag)}
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
              to='/admin/variant'
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

export default AdminCreateVariantForm
