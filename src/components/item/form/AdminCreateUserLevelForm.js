import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { createUserLevel } from '../../../apis/level'
import { regexTest, numberTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import ColorPickerInput from '../../ui/ColorPickerInput'

const AdminCreateUserLevelForm = ({ onRun = () => {} }) => {
  const { t } = useTranslation()

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
    setIsLoading(true)
    createUserLevel(_id, accessToken, level)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(data.success)
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
      })
      .catch((error) => {
        console.log('Something went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.createUserLevel')}
          onSubmit={onSubmit}
          message={t('confirmDialog')}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label={t('levelDetail.name')}
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
            label={t('levelDetail.floorPoint')}
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
            label={`${t('levelDetail.discount')} (%)`}
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
          {/* <Input
            type='text'
            label={t('levelDetail.color')}
            value={level.color}
            isValid={level.isValidColor}
            feedback='Please provide a valid color.'
            validator='anything'
            required={true}
            onChange={(value) => handleChange('color', 'isValidColor', value)}
            onValidate={(flag) => handleValidate('isValidColor', flag)}
          /> */}
          <ColorPickerInput
            label={t('levelDetail.color')}
            color={level.color}
            onChange={(selectedColor) =>
              handleChange('color', 'isValidColor', selectedColor)
            }
          />
        </div>
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

export default AdminCreateUserLevelForm
