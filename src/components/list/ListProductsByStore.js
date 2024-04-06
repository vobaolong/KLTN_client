/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { listSellingProductsByStore } from '../../apis/product'
import Loading from '../ui/Loading'
import ProductCard from '../card/ProductCard'
import { toast } from 'react-toastify'
import Slider from 'react-slick'

const ListProductsByStore = ({
  heading = '',
  storeId = '',
  sortBy = 'sold'
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])

  const settings = {
    className: 'center',
    infinite: false,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      }
    ]
  }

  const init = () => {
    setIsLoading(true)
    listSellingProductsByStore(
      {
        search: '',
        rating: '',
        categoryId: '',
        minPrice: '',
        maxPrice: '',
        sortBy,
        order: 'desc',
        limit: 10,
        page: 1
      },
      storeId
    )
      .then((data) => {
        if (data.error) toast.error(data.error)
        else setProducts(data.products)
        setIsLoading(false)
      })
      .catch((error) => {
        // toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [storeId, sortBy])

  return (
    <div className='position-relative bg-body box-shadow rounded-2 p-3'>
      {heading && <h5 style={{ color: 'var(--muted-color)' }}>{heading}</h5>}
      {isLoading && <Loading />}
      <div className='slider-container'>
        <Slider {...settings}>
          {products?.map((product, index) => (
            <div className='my-2' key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default ListProductsByStore
