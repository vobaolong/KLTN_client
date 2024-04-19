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
    fee: 0,
    isValidName: true,
    isValidDescription: true,
    isValidFee: true
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

    const { name, description, fee } = commission
    if (!name || !description || fee === '') {
      setCommission({
        ...commission,
        isValidName: regexTest('name', name),
        isValidDescription: regexTest('bio', description),
        isValidFee: numberTest('zeroTo100', fee)
      })
      return
    }

    const { isValidName, isValidDescription, isValidFee } = commission
    if (!isValidName || !isValidDescription || !isValidFee) return

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
            fee: 0,
            isValidName: true,
            isValidDescription: true,
            isValidFee: true
          })
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
            feedback={t('commissionDetail.validName')}
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
            required={true}
            feedback={t('commissionDetail.validDescription')}
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
            value={commission.fee}
            isValid={commission.isValidFee}
            feedback={t('commissionDetail.feeValid')}
            validator='zeroTo100'
            required={true}
            onChange={(value) => handleChange('fee', 'isValidFee', value)}
            onValidate={(flag) => handleValidate('isValidFee', flag)}
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
