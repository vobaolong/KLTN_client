import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { createStoreLevel } from '../../../apis/level'
import { regexTest, numberTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import ColorPickerInput from '../../ui/ColorPickerInput'
import { toast } from 'react-toastify'
import Error from '../../ui/Error'

const AdminCreateStoreLevelForm = ({ onRun = () => {} }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const [level, setLevel] = useState({
    name: '',
    minPoint: 0,
    discount: 0,
    color: '',
    isValidName: true,
    isValidMinPoint: true,
    isValidDiscount: true,
    isValidColor: true
  })

  const { _id, accessToken } = getToken()

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
    createStoreLevel(_id, accessToken, level)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.level.create'))
          setLevel({
            name: '',
            minPoint: 0,
            discount: 0,
            isValidName: true,
            isValidMinPoint: true,
            isValidDiscount: true
          })

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
          title={t('dialog.createStoreLevel')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label={t('levelDetail.name')}
            value={level.name}
            isValid={level.isValidName}
            feedback={t('levelDetail.validName')}
            validator='level'
            required={true}
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='number'
            label={t('levelDetail.floorPoint')}
            value={level.minPoint}
            isValid={level.isValidMinPoint}
            feedback={t('levelDetail.validFloorPoint')}
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
            label={`${t('levelDetail.discount')} (%)`}
            value={level.discount}
            isValid={level.isValidDiscount}
            feedback={t('levelDetail.validDiscount')}
            validator='zeroTo100'
            required={true}
            onChange={(value) =>
              handleChange('discount', 'isValidDiscount', value)
            }
            onValidate={(flag) => handleValidate('isValidDiscount', flag)}
          />
        </div>

        <div className='col-12'>
          <ColorPickerInput
            label={t('levelDetail.color')}
            color={level.color}
            onChange={(selectedColor) =>
              handleChange('color', 'isValidColor', selectedColor)
            }
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

export default AdminCreateStoreLevelForm
