import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import { createTransactionByStore } from '../../../apis/transaction'
import { regexTest, numberTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'

const CreateTransactionForm = ({ eWallet = 0, storeId = '', onRun }) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [updateDispatch] = useUpdateDispatch()

  const { _id: userId, accessToken } = getToken()

  const [transaction, setTransaction] = useState({
    isUp: 'false',
    amount: 50000,
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
        ...transaction,
        isValidAmount:
          flag && parseFloat(transaction.amount) <= parseFloat(eWallet)
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
    setSuccess('')
    setIsLoading(true)
    createTransactionByStore(userId, accessToken, transaction, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setTransaction({
            ...transaction,
            amount: 50000,
            currentPassword: '',
            isValidAmount: true,
            isValidCurrentPassword: true
          })
          updateDispatch('vendor', data.store)
          setSuccess('Rút tiền thành công!')
          if (onRun) onRun()
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
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
          title='Create transaction'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='number'
            label='Amount'
            value={transaction.amount}
            isValid={transaction.isValidAmount}
            feedback='Please provide a valid amount.'
            validator='positive'
            onChange={(value) => handleChange('amount', 'isValidAmount', value)}
            onValidate={(flag) => handleValidate('isValidAmount', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='password'
            label='Current password'
            value={transaction.currentPassword}
            isValid={transaction.isValidCurrentPassword}
            feedback='Please provide a valid password.'
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

        {success && (
          <div className='col-12'>
            <Success msg={success} />
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

export default CreateTransactionForm
