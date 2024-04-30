import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateUserLevel } from '../../../apis/level'
import { regexTest, numberTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AdminEditUserLevelForm = ({ oldLevel = '', onRun = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const { t } = useTranslation()
  const [level, setLevel] = useState({})
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
    setIsLoading(true)
    updateUserLevel(_id, accessToken, oldLevel._id, level)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.level.edit'))
          if (onRun) onRun()
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Something went wrong')
        setIsLoading(false)
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
          <Input
            type='text'
            label={t('levelDetail.color')}
            value={level.color}
            isValid={level.isValidColor}
            feedback={t('levelDetail.validColor')}
            validator='anything'
            required={true}
            onChange={(value) => handleChange('color', 'isValidColor', value)}
            onValidate={(flag) => handleValidate('isValidDiscount', flag)}
          />
        </div>

        <div className='col-12 d-grid mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple rounded-1'
            onClick={handleSubmit}
          >
            {t('button.save')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminEditUserLevelForm
