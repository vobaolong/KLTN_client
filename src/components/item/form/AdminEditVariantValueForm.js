import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateVariantValue } from '../../../apis/variant'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AdminEditValueStyleForm = ({ oldVariantValue = {}, onRun }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [newValue, setNewValue] = useState({
    _id: oldVariantValue._id,
    name: oldVariantValue.name,
    variantId: oldVariantValue.variantId,
    isValidName: true
  })

  const { _id, accessToken } = getToken()

  useEffect(() => {
    setNewValue({
      _id: oldVariantValue._id,
      name: oldVariantValue.name,
      variantId: oldVariantValue.variantId,
      isValidName: true
    })
  }, [oldVariantValue])

  const handleChange = (name, isValidName, value) => {
    setNewValue({
      ...newValue,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setNewValue({
      ...newValue,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, variantId } = newValue
    if (!name || !variantId) {
      setNewValue({
        ...newValue,
        isValidName: regexTest('anything', name)
      })
      return
    }

    const { isValidName } = newValue
    if (!isValidName) return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    setIsLoading(true)
    updateVariantValue(_id, accessToken, newValue._id, newValue)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          if (onRun) onRun()
          toast.success(data.success)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError(`Error occurred: ${error.message}`)
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}

      {isConfirming && (
        <ConfirmDialog
          title='Edit this value'
          onSubmit={onSubmit}
          message={t('message.edit')}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label={t('variantDetail.value.name')}
            value={newValue.name}
            isValid={newValue.isValidName}
            feedback='Please provide a valid value.'
            validator='anything'
            required={true}
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        {error && (
          <div className='col-12'>
            <Error msg={error} />
          </div>
        )}

        <div className='col-12 d-grid mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple rounded-1'
            onClick={handleSubmit}
          >
            {t('button.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminEditValueStyleForm
