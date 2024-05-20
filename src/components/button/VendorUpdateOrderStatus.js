import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { vendorUpdateStatusOrder } from '../../apis/order'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import DropDownMenu from '../ui/DropDownMenu'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const VendorUpdateOrderStatusButton = ({
  storeId = '',
  orderId = '',
  status = '',
  onRun
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [statusValue, setStatusValue] = useState(status)
  const { _id, accessToken } = getToken()
  const { t } = useTranslation()

  useEffect(() => {
    setStatusValue(status)
  }, [status])

  const handleUpdate = (value) => {
    setStatusValue(value)
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setIsLoading(true)
    const value = { status: statusValue }
    vendorUpdateStatusOrder(_id, accessToken, value, orderId, storeId)
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          toast.success(t('toastSuccess.order.update'))
        }
        if (onRun) onRun()
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.updateOrder')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
        />
      )}

      <DropDownMenu
        listItem={[
          { label: t('status.notProcessed'), value: 'Not processed' },
          { label: t('status.processing'), value: 'Processing' },
          { label: t('status.shipped'), value: 'Shipped' },
          { label: t('status.delivered'), value: 'Delivered' },
          { label: t('status.cancel'), value: 'Cancelled' }
        ]}
        size='lg'
        value={statusValue}
        setValue={(value) => handleUpdate(value)}
        borderBtn={false}
      />
    </div>
  )
}

export default VendorUpdateOrderStatusButton
