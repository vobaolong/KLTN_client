/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { listSellingProductsByStore } from '../../apis/product'
import Loading from '../ui/Loading'
import ProductCard from '../card/ProductCard'
import Slider from 'react-slick'
import Error from '../ui/Error'

const ListProductsByStore = ({
  heading = '',
  storeId = '',
  sortBy = 'sold'
}) => {
  const [error, setError] = useState('')
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
    setError('')
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
        if (data.error) setError(data.error)
        else setProducts(data.products)
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server Error')
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
      {error && <Error msg={error} />}

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
