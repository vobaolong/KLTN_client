/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { listActiveCategories } from '../../apis/category'
import Loading from '../ui/Loading'
import Error from '../ui/Error'

import CategoryCard from '../card/CategoryCard'
import Slider from 'react-slick'

const ListCategories = ({ heading = '', categoryId = null }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])

  const settings = {
    className: 'center',
    infinite: false,
    speed: 900,
    slidesToShow: Math.min(categories.length, 8),
    slidesToScroll: Math.min(categories.length, 8),
    centerPadding: '25%',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(categories.length, 6),
          slidesToScroll: Math.min(categories.length, 5)
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(categories.length, 4),
          slidesToScroll: Math.min(categories.length, 3)
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(categories.length, 2),
          slidesToScroll: Math.min(categories.length, 1)
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
    <>
      {categories.length > 0 && (
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
      )}
    </>
  )
}

export default ListCategories
