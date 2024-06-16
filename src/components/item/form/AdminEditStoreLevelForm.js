import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateStoreLevel } from '../../../apis/level'
import { regexTest, numberTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AdminEditStoreLevelForm = ({ oldLevel = '', onRun = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [level, setLevel] = useState({
    name: oldLevel.name,
    minPoint: oldLevel.minPoint,
    discount: oldLevel.discount && oldLevel.discount.$numberDecimal,
    color: oldLevel.color,
    isValidName: true,
    isValidMinPoint: true,
    isValidDiscount: true,
    isValidColor: true
  })
  const { t } = useTranslation()
  const { _id, accessToken } = getToken()

  useEffect(() => {
    setLevel({
      name: oldLevel.name,
      minPoint: oldLevel.minPoint,
      discount: oldLevel.discount && oldLevel.discount.$numberDecimal,
      color: oldLevel.color,
      isValidName: true,
      isValidMinPoint: true,
      isValidDiscount: true,
      isValidColor: true
    })
  }, [oldLevel])

  const handleChange = (name, isValidName, value) => {
    setLevel({
      ...level,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setLevel({
      ...level,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, minPoint, discount, color } = level
    if (!name || minPoint === '' || discount === '' || !color) {
      setLevel({
        ...level,
        isValidName: regexTest('name', name),
        isValidMinPoint:
          numberTest('positive', minPoint) || numberTest('zero', minPoint),
        isValidDiscount: numberTest('zeroTo100', discount),
        isValidColor: regexTest('anything', color)
      })
      return
    }

    const { isValidName, isValidMinPoint, isValidDiscount, isValidColor } =
      level
    if (!isValidName || !isValidMinPoint || !isValidDiscount || !isValidColor)
      return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setIsLoading(true)
    updateStoreLevel(_id, accessToken, oldLevel._id, level)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(data.success)
          if (onRun) onRun()
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError('Sever error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}

      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.editLevel')}
          onSubmit={onSubmit}
          message={t('message.edit')}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label='Level name'
            value={level.name}
            isValid={level.isValidName}
            feedback='Please provide a valid level name.'
            validator='level'
            required={true}
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='number'
            label='Floor point'
            value={level.minPoint}
            isValid={level.isValidMinPoint}
            feedback='Please provide a valid floor point (>=0).'
            validator='positive|zero'
            required={true}
            onChange={(value) =>
              handleChange('minPoint', 'isValidMinPoint', value)
            }
            onValidate={(flag) => handleValidate('isValidMinPoint', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='number'
            label='Discount (%)'
            value={level.discount}
            isValid={level.isValidDiscount}
            feedback='Please provide a valid floor point (0% - 100%).'
            validator='zeroTo100'
            required={true}
            onChange={(value) =>
              handleChange('discount', 'isValidDiscount', value)
            }
            onValidate={(flag) => handleValidate('isValidDiscount', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='text'
            label='Color'
            value={level.color}
            isValid={level.isValidColor}
            feedback='Please provide a valid color.'
            validator='anything'
            required={true}
            onChange={(value) => handleChange('color', 'isValidColor', value)}
            onValidate={(flag) => handleValidate('isValidDiscount', flag)}
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
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminEditStoreLevelForm
