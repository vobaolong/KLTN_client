/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react'
import { listActiveProducts } from '../../apis/product'
import Loading from '../ui/Loading'
import ProductCard from '../card/ProductCard'
import { toast } from 'react-toastify'
import Slider from 'react-slick'
import { shallowEqual } from 'react-redux'

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

const ListBestSellerProducts = ({ heading = '', categoryId = '' }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])

  const init = () => {
    setIsLoading(true)
    listActiveProducts({
      search: '',
      rating: '',
      categoryId,
      minPrice: '',
      maxPrice: '',
      sortBy: 'sold',
      order: 'desc',
      limit: 20,
      page: 1
    })
      .then((data) => {
        if (data.error) toast.error(data.error)
        else setProducts(data.products)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Some thing went wrong')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [categoryId, shallowEqual(products)])

  return (
    <div className='position-relative bg-body box-shadow rounded-2 p-3'>
      {heading && <h5 style={{ color: 'var(--muted-color)' }}>{heading}</h5>}
      {isLoading && <Loading />}
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

export default ListBestSellerProducts
