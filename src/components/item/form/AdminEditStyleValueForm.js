import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateStyleValue } from '../../../apis/style'
import { regexTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'

const AdminEditValueStyleForm = ({ oldStyleValue = {}, onRun }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [newValue, setNewValue] = useState({
    _id: oldStyleValue._id,
    name: oldStyleValue.name,
    styleId: oldStyleValue.styleId,
    isValidName: true
  })

  const { _id, accessToken } = getToken()

  useEffect(() => {
    setNewValue({
      _id: oldStyleValue._id,
      name: oldStyleValue.name,
      styleId: oldStyleValue.styleId,
      isValidName: true
    })
  }, [oldStyleValue])

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

    const { name, styleId } = newValue
    if (!name || !styleId) {
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
    setSuccess('')
    setIsLoading(true)
    updateStyleValue(_id, accessToken, newValue._id, newValue)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          if (onRun) onRun()
          setSuccess(data.success)
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
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
          title='Edit this value'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
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

        {success && (
          <div className='col-12'>
            <Success msg={success} />
          </div>
        )}

        <div className='col-12 d-grid mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple'
            onClick={handleSubmit}
          >
            {t('submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminEditValueStyleForm
