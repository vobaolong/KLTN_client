import StoreCarouselUpload from './uploadButton/StoreCarouselUpload'
import defaultImage from '../../assets/default.png'

const IMG = process.env.REACT_APP_STATIC_URL

const Carousel = ({
  storeId = '',
  listImages = [],
  alt = 'carousel',
  isEditable = false,
  style = {}
}) => (
  <div
    id='carouselInterval'
    className='carousel carousel-dark slide'
    data-bs-ride='carousel'
  >
    <div className='carousel-indicators'>
      {listImages?.map((image, index) => (
        <button
          key={index}
          type='button'
          data-bs-target='#carouselInterval'
          data-bs-slide-to={index}
          className={index === 0 ? 'active' : ''}
        ></button>
      ))}
    </div>

    <div className='carousel-inner rounded-2'>
      {listImages?.map((image, index) => (
        <div
          key={index}
          className={`carousel-item ${index === 0 && 'active'}`}
          data-bs-interval='3000'
        >
          <div className='cus-carousel' style={style}>
            <img
              loading='lazy'
              src={image ? IMG + image : defaultImage}
              className='d-block cus-carousel-img'
              alt={alt}
            />
            {isEditable === 'store' && (
              <StoreCarouselUpload storeId={storeId} index={index} />
            )}
          </div>
        </div>
      ))}
    </div>

    <button
      className='carousel-control-prev'
      type='button'
      data-bs-target='#carouselInterval'
      data-bs-slide='prev'
    >
      <span className='carousel-control-prev-icon' aria-hidden='true'></span>
      <span className='visually-hidden'>{'<'}</span>
    </button>

    <button
      className='carousel-control-next'
      type='button'
      data-bs-target='#carouselInterval'
      data-bs-slide='next'
    >
      <span className='carousel-control-next-icon ' aria-hidden='true'></span>
      <span className='visually-hidden'>{'>'}</span>
    </button>
  </div>
)

export default Carousel
