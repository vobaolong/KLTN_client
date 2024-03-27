/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { listActiveProducts } from '../../apis/product'
import Loading from '../ui/Loading'
import ProductCard from '../card/ProductCard'
import { toast } from 'react-toastify'

const ListBestSellerProducts = ({
  heading = '',
  col = 'col-xl-2-5 col-md-3 col-sm-4 col-6',
  categoryId = '',
  limit = '10'
}) => {
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
      limit,
      page: 1
    })
      .then((data) => {
        if (data.error) toast.error(data.error)
        else setProducts(data.products)
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [categoryId])

  return (
    <div className='position-relative'>
      {heading && <h4>{heading}</h4>}
      {isLoading && <Loading />}
      <div className='row mt-3'>
        {products?.map((product, index) => (
          <div className={`${col} mb-4`} key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListBestSellerProducts
