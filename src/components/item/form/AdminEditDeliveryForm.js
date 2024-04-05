import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateDelivery } from '../../../apis/delivery'
import { regexTest, numberTest } from '../../../helper/test'
import TextArea from '../../ui/TextArea'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'

const AdminEditDeliveryForm = ({ oldDelivery = '', onRun = () => {} }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [delivery, setDelivery] = useState({
    name: oldDelivery.name,
    description: oldDelivery.description,
    price: oldDelivery.price && oldDelivery.price.$numberDecimal,
    isValidName: true,
    isValidDescription: true,
    isValidPrice: true
  })

  const { _id, accessToken } = getToken()

  useEffect(() => {
    setDelivery({
      name: oldDelivery.name,
      description: oldDelivery.description,
      price: oldDelivery.price && oldDelivery.price.$numberDecimal,
      isValidName: true,
      isValidDescription: true,
      isValidPrice: true
    })
  }, [oldDelivery])

  const handleChange = (name, isValidName, value) => {
    setDelivery({
      ...delivery,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setDelivery({
      ...delivery,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, description, price } = delivery
    if (!name || !description || !price) {
      setDelivery({
        ...delivery,
        isValidName: regexTest('name', name),
        isValidDescription: regexTest('bio', description),
        isValidPrice: numberTest('greaterThanOrEqualTo', price)
      })
      return
    }

    const { isValidName, isValidDescription, isValidPrice } = delivery
    if (!isValidName || !isValidDescription || !isValidPrice) return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setSuccess('')
    setIsLoading(true)
    updateDelivery(_id, accessToken, oldDelivery._id, delivery)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setSuccess(data.success)
          if (onRun) onRun()
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
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
          title={t('deliveryDetail.edit')}
          onSubmit={onSubmit}
          message={t('message.edit')}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label={t('deliveryDetail.name')}
            value={delivery.name}
            isValid={delivery.isValidName}
            feedback={t('deliveryDetail.nameValid')}
            validator='name'
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12'>
          <TextArea
            type='text'
            label={t('deliveryDetail.description')}
            value={delivery.description}
            isValid={delivery.isValidDescription}
            feedback={t('deliveryDetail.bioValid')}
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
            label={`${t('deliveryDetail.cost')} (₫)`}
            value={delivery.price}
            isValid={delivery.isValidPrice}
            feedback={t('deliveryDetail.costValid')}
            validator='greaterThanOrEqualTo'
            onChange={(value) => handleChange('price', 'isValidPrice', value)}
            onValidate={(flag) => handleValidate('isValidPrice', flag)}
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

export default AdminEditDeliveryForm
