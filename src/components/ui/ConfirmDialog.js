import { useTranslation } from 'react-i18next'

const ConfirmDialog = ({
  title = 'Confirm the action',
  messageKey = 'confirmDialog',
  color = 'primary',
  onSubmit = () => {},
  onClose = () => {}
}) => {
  const { t } = useTranslation()

  const message = t(messageKey)

  const onConfirm = () => {
    onSubmit()
    onClose()
  }

  return (
    <>
      <div className='modal-backdrop fade show'></div>
      <div className='modal d-block' tabIndex='-1' role='dialog'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content rounded-1'>
            <div className={`modal-header text-${color}`}>
              <h5 className='modal-title'>{title}</h5>
              <button
                type='button'
                className='btn-close'
                onClick={onClose}
              ></button>
            </div>
            <div className='modal-body'>{message}</div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-outline-danger'
                onClick={onClose}
              >
                {t('button.cancel')}
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={onConfirm}
              >
                {t('button.confirm')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmDialog
