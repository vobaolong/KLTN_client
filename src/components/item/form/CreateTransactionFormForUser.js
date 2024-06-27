import { useEffect, useState, useRef } from 'react'
import { getToken } from '../../../apis/auth'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import { createTransactionByUser } from '../../../apis/transaction'
import { regexTest, numberTest } from '../../../helper/test'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const CreateTransactionFormForUser = ({ eWallet = 0, onRun }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [updateDispatch] = useUpdateDispatch()
  const { _id: userId, accessToken } = getToken()
  const user = useSelector((state) => state.account.user)
  const isGoogleUser = user && user.googleId

  const [transaction, setTransaction] = useState({
    isUp: 'false',
    amount: 100000,
    currentPassword: '',
    isValidAmount: true,
    isValidCurrentPassword: true
  })

  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

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
    } else {
      setTransaction({
        ...transaction,
        [isValidName]: flag
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { amount, currentPassword } = transaction

    if (!userId || !amount || (!isGoogleUser && !currentPassword)) {
      setTransaction({
        ...transaction,
        isValidAmount:
          numberTest('positive', amount) &&
          parseFloat(transaction.amount) <= parseFloat(eWallet),
        isValidCurrentPassword: isGoogleUser
          ? true
          : regexTest('password', currentPassword)
      })
      return
    }

    if (
      !transaction.isValidAmount ||
      (!isGoogleUser && !transaction.isValidCurrentPassword)
    ) {
      return
    }

    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setIsLoading(true)
    createTransactionByUser(userId, accessToken, transaction)
      .then((data) => {
        if (!isMounted.current) return
        if (data.error) setError(data.error)
        else {
          setTransaction({
            ...transaction,
            amount: 100000,
            currentPassword: '',
            isValidAmount: true,
            isValidCurrentPassword: true
          })
          updateDispatch('account', data.user)
          toast.success(t('toastSuccess.withDraw'))
          if (onRun) onRun()
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        if (!isMounted.current) return
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
            label={t('transactionDetail.amount')}
            value={transaction.amount}
            isValid={transaction.isValidAmount}
            feedback={t('transactionDetail.amountValid')}
            required={true}
            validator='positive'
            onChange={(value) => handleChange('amount', 'isValidAmount', value)}
            onValidate={(flag) => handleValidate('isValidAmount', flag)}
          />
        </div>

        {!isGoogleUser && (
          <div className='col-12'>
            <Input
              type='password'
              label={t('transactionDetail.currentPw')}
              value={transaction.currentPassword}
              isValid={transaction.isValidCurrentPassword}
              feedback={t('transactionDetail.currentPwValid')}
              required={true}
              validator='password'
              onChange={(value) =>
                handleChange('currentPassword', 'isValidCurrentPassword', value)
              }
              onValidate={(flag) =>
                handleValidate('isValidCurrentPassword', flag)
              }
            />
          </div>
        )}

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

export default CreateTransactionFormForUser
