import Slider from 'react-slick'
import banner1 from '../../assets/1.webp'
import banner2 from '../../assets/2.jpg'
import banner3 from '../../assets/3.webp'
const ListBanner = () => {
  const settings = {
    className: 'center',
    autoplay: true,
    autoplaySpeed: 6000,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    centerPadding: '25%',
    dots: true
  }

  return (
    <div className='bg-body box-shadow rounded-3 p-3'>
      <Slider {...settings}>
        <div className='px-2'>
          <img className='w-100 rounded-2' src={banner1} alt='Banner 1' />
        </div>
        <div className='px-2'>
          <img className='w-100 rounded-2' src={banner2} alt='Banner 2' />
        </div>
        <div className='px-2'>
          <img className='w-100 rounded-2' src={banner3} alt='Banner 3' />
        </div>
        <div className='px-2'>
          <img className='w-100 rounded-2' src={banner1} alt='Banner 4' />
        </div>
        <div className='px-2'>
          <img className='w-100 rounded-2' src={banner2} alt='Banner 2' />
        </div>
        <div className='px-2'>
          <img className='w-100 rounded-2' src={banner3} alt='Banner 3' />
        </div>
      </Slider>
    </div>
  )
}

export default ListBanner
