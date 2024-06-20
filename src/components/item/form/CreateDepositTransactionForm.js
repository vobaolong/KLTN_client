import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import { createTransactionByStore } from '../../../apis/transaction'
import { regexTest, numberTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import Error from '../../ui/Error'

const CreateDepositTransactionForm = ({ eWallet = 0, storeId = '', onRun }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [updateDispatch] = useUpdateDispatch()

  const { _id: userId, accessToken } = getToken()

  const [transaction, setTransaction] = useState({
    isUp: 'true',
    amount: 10000000,
    currentPassword: '',
    isValidAmount: true,
    isValidCurrentPassword: true
  })

  const handleChange = (name, isValidName, value) => {
    setTransaction({
      ...transaction,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    if (isValidName === 'isValidAmount') {
      setTransaction({
        ...transaction
      })
    } else
      setTransaction({
        ...transaction,
        [isValidName]: flag
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { amount, currentPassword } = transaction

    if (!userId || !storeId || !amount || !currentPassword) {
      setTransaction({
        ...transaction,
        isValidAmount:
          numberTest('positive', amount) &&
          parseFloat(transaction.amount) <= parseFloat(eWallet),
        isValidCurrentPassword: regexTest('password', currentPassword)
      })
      return
    }

    if (!transaction.isValidAmount || !transaction.isValidCurrentPassword)
      return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setIsLoading(true)
    createTransactionByStore(userId, accessToken, transaction, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setTransaction({
            ...transaction,
            amount: 100000,
            currentPassword: '',
            isValidAmount: true,
            isValidCurrentPassword: true
          })
          updateDispatch('seller', data.store)
          toast.success(t('toastSuccess.withdraw'))
          if (onRun) onRun()
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError('Server error')
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
          title={t('title.createTransaction')}
          onSubmit={onSubmit}
          message={t('confirmDialog')}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='number'
            label={`${t('transactionDetail.amount')} (₫)`}
            value={transaction.amount}
            isValid={transaction.isValidAmount}
            required={true}
            feedback={t('transactionDetail.amountValid')}
            validator='positive'
            onChange={(value) => handleChange('amount', 'isValidAmount', value)}
            onValidate={(flag) => handleValidate('isValidAmount', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='password'
            label={t('transactionDetail.currentPw')}
            value={transaction.currentPassword}
            required={true}
            isValid={transaction.isValidCurrentPassword}
            feedback={t('transactionDetail.currentPwValid')}
            validator='password'
            onChange={(value) =>
              handleChange('currentPassword', 'isValidCurrentPassword', value)
            }
            onValidate={(flag) =>
              handleValidate('isValidCurrentPassword', flag)
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

export default CreateDepositTransactionForm
