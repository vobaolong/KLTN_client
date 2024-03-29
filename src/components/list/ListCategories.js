/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { listActiveCategories } from '../../apis/category'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
// import CategoryCard from '../card/CategoryCard'
import CategoryCard from '../card/CategoryCard'
import Slider from 'react-slick'

const ListCategories = ({
  heading = '',
  categoryId = null
  // col = 'col-xl-2-5 col-md-3 col-sm-4 col-6',
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])

  const settings = {
    className: 'center',
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  }

  const init = () => {
    setIsLoading(true)
    listActiveCategories({
      search: '',
      categoryId,
      sortBy: 'name',
      order: 'asc',
      limit: 20,
      page: 1
    })
      .then((data) => {
        if (data.error) setError(data.error)
        else setCategories(data.categories)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [categoryId])

  return (
    <div className='bg-body box-shadow rounded-3 p-3'>
      {heading && <h5>{heading}</h5>}
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      <div className='slider-container'>
        <Slider {...settings}>
          {categories?.map((category, index) => (
            <div key={index}>
              <CategoryCard category={category} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default ListCategories
