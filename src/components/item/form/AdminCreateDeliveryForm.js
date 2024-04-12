import { useState } from 'react'
import { getToken } from '../../../apis/auth'
import { createDelivery } from '../../../apis/delivery'
import { regexTest, numberTest } from '../../../helper/test'
import TextArea from '../../ui/TextArea'
import Input from '../../ui/Input'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AdminCreateDeliveryForm = ({ onRun = () => {} }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [delivery, setDelivery] = useState({
    name: '',
    description: '',
    price: 0,
    isValidName: true,
    isValidDescription: true,
    isValidPrice: true
  })

  const { _id, accessToken } = getToken()

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
    setIsLoading(true)
    createDelivery(_id, accessToken, delivery)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(t('toastSuccess.deliveryUnit.create'))
          setDelivery({
            name: '',
            description: '',
            price: 1000,
            isValidName: true,
            isValidDescription: true,
            isValidPrice: true
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
          title={t('dialog.addDelivery')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
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
            required={true}
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
            label={`${t('deliveryDetail.fee')} (₫)`}
            value={delivery.price}
            isValid={delivery.isValidPrice}
            feedback={t('deliveryDetail.feeValid')}
            validator='greaterThanOrEqualTo'
            required={true}
            onChange={(value) => handleChange('price', 'isValidPrice', value)}
            onValidate={(flag) => handleValidate('isValidPrice', flag)}
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

export default AdminCreateDeliveryForm
