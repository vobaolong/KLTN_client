import Logo from '../layout/menu/Logo'

const Modal = ({
  id,
  title = '',
  subTitle = '',
  hasCloseBtn = true,
  children = null
}) => (
  <div className=''>
    <div
      className='cus-modal modal fade'
      id={id}
      tabIndex='-1'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div>
              {title ? (
                <h5 className='modal-title ms-2 text-primary text-capitalize'>
                  {title}
                </h5>
              ) : (
                <Logo noBackground={true} />
              )}

              {subTitle && <p className='modal-title fw-light'>{subTitle}</p>}
            </div>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
            ></button>
          </div>

          <div className='modal-body'>{children}</div>

          {hasCloseBtn && (
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary ripple'
                data-bs-dismiss='modal'
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    <div
      className='fade cus-modal-backdrop'
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

export default Modal
