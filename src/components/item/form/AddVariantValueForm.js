/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { createVariantValue } from '../../../apis/variant'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import Error from '../../ui/Error'

const AddVariantValueForm = ({ variantId = '', variantName = '', onRun }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const [newValue, setNewValue] = useState({
    name: '',
    variantId,
    variantName,
    isValidName: true
  })

  const { _id, accessToken } = getToken()

  useEffect(() => {
    setNewValue({
      ...newValue,
      variantId,
      variantName
    })
  }, [variantId])

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
    setError('')
    setIsLoading(true)
    createVariantValue(_id, accessToken, newValue)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setNewValue({
            ...newValue,
            name: ''
          })
          if (onRun) onRun()
          toast.success(t('toastSuccess.variantValue.add'))
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError('Sever error')
        setTimeout(() => {
          setError('')
        }, 3000)
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}

      {isConfirming && (
        <ConfirmDialog
          title={`Add new value for '${variantName}'`}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label='Value'
            value={newValue.name}
            isValid={newValue.isValidName}
            feedback='Please provide a valid value.'
            validator='anything'
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

export default AddVariantValueForm
