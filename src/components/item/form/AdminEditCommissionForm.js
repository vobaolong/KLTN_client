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
import Error from '../../ui/Error'

const AdminEditCommissionForm = ({ oldCommission = '', onRun = () => {} }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [commission, setCommission] = useState({
    name: oldCommission.name,
    description: oldCommission.description,
    fee: oldCommission.fee && oldCommission.fee.$numberDecimal,
    isValidName: true,
    isValidDescription: true,
    isValidFee: true
  })

  const { _id, accessToken } = getToken()

  useEffect(() => {
    setCommission({
      name: oldCommission.name,
      description: oldCommission.description,
      fee: oldCommission.fee && oldCommission.fee.$numberDecimal,
      isValidName: true,
      isValidDescription: true,
      isValidFee: true
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
    setError('')
    setIsLoading(true)
    updateCommission(_id, accessToken, oldCommission._id, commission)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.commission.edit'))
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
            feedback={t('commissionDetail.validDescription')}
            validator='bio'
            required={true}
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
            {t('button.save')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminEditCommissionForm
