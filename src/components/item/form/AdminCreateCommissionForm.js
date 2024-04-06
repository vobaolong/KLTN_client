import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { createCommission } from '../../../apis/commission'
import { regexTest, numberTest } from '../../../helper/test'
import TextArea from '../../ui/TextArea'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AdminCreateCommissionForm = ({ onRun = () => {} }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [commission, setCommission] = useState({
    name: '',
    description: '',
    cost: 0,
    isValidName: true,
    isValidDescription: true,
    isValidCost: true
  })

  const { _id, accessToken } = getToken()

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
    createCommission(_id, accessToken, commission)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.commission.create'))
          setIsLoading(false)
          setCommission({
            name: '',
            description: '',
            cost: 0,
            isValidName: true,
            isValidDescription: true,
            isValidCost: true
          })
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
          title={t('dialog.createCommission')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
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
            required={true}
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
            required={true}
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
            {t('button.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminCreateCommissionForm
