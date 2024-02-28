const ConfirmDialog = ({
  title = 'Confirm the action',
  message = 'Are you sure about that?',
  color = 'primary',
  onSubmit = () => {},
  onClose = () => {}
}) => {
  const onConfirm = () => {
    onSubmit()
    onClose()
  }

  return (
    <div className='fixed-top'>
      <div
        className='modal fade show'
        tabIndex='-1'
        aria-modal='true'
        role='dialog'
        style={{
          display: 'block',
          paddingLeft: '0px',
          animation: 'show 0.6s ease'
        }}
      >
        <div className='modal-dialog' style={{ zIndex: '9999' }}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className={`modal-title text-${color} text-capitalize`}>
                {title}
              </h5>
              <button
                type='button'
                className='btn-close'
                onClick={onClose}
              ></button>
            </div>
            <div className='modal-body pt-0'>{message}</div>
            <div className='modal-footer border-top-0'>
              <button
                type='button'
                className='btn btn-outline-danger ripple'
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-primary ripple'
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className='fade'
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '4',
          width: '100vw',
          height: '100vh',
          animation: 'fade 0.6s ease',
          backgroundColor: '#000',
          opacity: '0.5'
        }}
      ></div>
    </div>
  )
}

export default ConfirmDialog
