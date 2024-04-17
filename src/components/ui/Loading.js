const Loading = ({ size = 'medium' }) => (
  <div
    className='position-absolute'
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
      zIndex: '3'
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        animation: 'show 0.3s ease'
      }}
    >
      <div
        className='d-flex justify-content-center align-items-center bg-white shadow-sm rounded-circle position-absolute m-2'
        style={{
          width: `${size === 'small' ? '1.6rem' : '3.6rem'}`,
          height: `${size === 'small' ? '1.6rem' : '3.6rem'}`,
          top: `${size === 'small' && '-40%'}${size === 'large' && '50%'}${
            size === 'medium' && '10%'
          }`,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '4'
        }}
      >
        <div
          className={`spinner-border text-primary ${
            size === 'small' && 'spinner-border-sm'
          }`}
          role='status'
        >
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    </div>
  </div>
)

export default Loading
