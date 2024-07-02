import { useState, useEffect, memo, useRef } from 'react'
import { listActiveProducts } from '../../apis/product'
import Loading from '../ui/Loading'
import ProductCard from '../card/ProductCard'
import Slider from 'react-slick'
import { shallowEqual } from 'react-redux'
import Error from '../ui/Error'

const ProductCardMemo = memo(ProductCard)
const settings = {
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
        slidesToScroll: 1
      }
    }
  ]
}

const ListBestSellerProduct = ({
  sortBy = '',
  heading = '',
  categoryId = ''
}) => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const isMounted = useRef(true)

  const init = () => {
    setIsLoading(true)
    listActiveProducts({
      search: '',
      rating: '',
      categoryId,
      minPrice: '',
      maxPrice: '',
      sortBy: sortBy,
      order: 'desc',
      limit: 20,
      page: 1
    })
      .then((data) => {
        if (isMounted.current) {
          if (data.error) setError(data.error)
          else setProducts(data.products)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        if (isMounted.current) {
          setError('Server Error')
          setIsLoading(false)
        }
      })
  }

  useEffect(() => {
    isMounted.current = true
    init()
    return () => {
      isMounted.current = false
    }
  }, [categoryId, shallowEqual(products)])

  return (
    <div className='position-relative bg-body box-shadow rounded-2 p-3'>
      {heading && <h5 className='text-dark-emphasis'>{heading}</h5>}
      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div className='slider-container'>
        <Slider {...settings}>
          {products?.map((product, index) => (
            <div className='my-2' key={index}>
              <ProductCardMemo product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default ListBestSellerProduct
