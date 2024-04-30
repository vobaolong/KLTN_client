import { useTranslation } from 'react-i18next'

const ListCartItemOffCanvas = () => {
  const { t } = useTranslation()

  return (
    <div style={{ width: '100%' }}>
      <div
        className='d-flex align-items-center justify-content-between'
        style={{ width: '100%' }}
      >
        <button
          className='btn btn-primary rounded-1 ripple'
          style={{ width: 'max-content' }}
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasFilter'
          aria-controls='offcanvasFilter'
        >
          <i className='fa-solid fa-sliders-h'></i>
          <span className='ms-2'>{t('filters.filter')}</span>
        </button>
      </div>
      <div
        className='offcanvas offcanvas-end'
        tabIndex='-1'
        id='offcanvasFilter'
        aria-labelledby='offcanvasFilterLabel'
      >
        <div className='offcanvas-header'>
          <h2 className='offcanvas-title' id='offcanvasFilterLabel'>
            {t('filters.filter')}
          </h2>
          <button
            type='button'
            className='btn-close text-reset'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className='offcanvas-body'>
          <div className='mb-4'>
            <h6>{t('filters.rating')}</h6>
          </div>

          <div className='mb-4'>
            <h6 className='mb-0'>{t('filters.price')}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCartItemOffCanvas
