import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateCommission } from '../../../apis/commission'
import { regexTest, numberTest } from '../../../helper/test'
import Input from '../../ui/Input'
import TextArea from '../../ui/TextArea'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AdminEditCommissionForm = ({ oldCommission = '', onRun = () => {} }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [commission, setCommission] = useState({
    name: oldCommission.name,
    description: oldCommission.description,
    cost: oldCommission.cost && oldCommission.cost.$numberDecimal,
    isValidName: true,
    isValidDescription: true,
    isValidCost: true
  })

  const { _id, accessToken } = getToken()

  useEffect(() => {
    setCommission({
      name: oldCommission.name,
      description: oldCommission.description,
      cost: oldCommission.cost && oldCommission.cost.$numberDecimal,
      isValidName: true,
      isValidDescription: true,
      isValidCost: true
    })
  }, [oldCommission])

  const handleChange = (name, isValidName, value) => {
    setCommission({
      ...commission,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setCommission({
      ...commission,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, description, cost } = commission
    if (!name || !description || cost === '') {
      setCommission({
        ...commission,
        isValidName: regexTest('name', name),
        isValidDescription: regexTest('bio', description),
        isValidCost: numberTest('zeroTo100', cost)
      })
      return
    }

    const { isValidName, isValidDescription, isValidCost } = commission
    if (!isValidName || !isValidDescription || !isValidCost) return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    setIsLoading(true)
    updateCommission(_id, accessToken, oldCommission._id, commission)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.commission.edit'))
          if (onRun) onRun()
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Something went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('commissionDetail.edit')}
          onSubmit={onSubmit}
          message={t('message.edit')}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label={t('commissionDetail.name')}
            value={commission.name}
            isValid={commission.isValidName}
            feedback='Please provide a valid commission name.'
            validator='bio'
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12'>
          <TextArea
            type='text'
            label={t('commissionDetail.description')}
            value={commission.description}
            isValid={commission.isValidDescription}
            feedback='Please provide a valid commission description.'
            validator='bio'
            onChange={(value) =>
              handleChange('description', 'isValidDescription', value)
            }
            onValidate={(flag) => handleValidate('isValidDescription', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='number'
            label={`${t('commissionDetail.fee')} (%)`}
            value={commission.cost}
            isValid={commission.isValidCost}
            feedback='Please provide a valid cost (>=0).'
            validator='zeroTo100'
            onChange={(value) => handleChange('cost', 'isValidCost', value)}
            onValidate={(flag) => handleValidate('isValidCost', flag)}
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

export default AdminEditCommissionForm
