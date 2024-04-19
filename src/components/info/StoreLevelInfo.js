/* eslint-disable react-hooks/exhaustive-deps */
import Paragraph from '../ui/Paragraph'
import { useTranslation } from 'react-i18next'
import { formatMonth } from '../../helper/humanReadable'
import { listSellingProductsByStore } from '../../apis/product'
import { useEffect, useState } from 'react'

const StoreLevelInfo = ({ store = {} }) => {
  const { t } = useTranslation()
  const percent = Math.round(
    (store?.numberOfSuccessfulOrders /
      (store?.numberOfSuccessfulOrders + store?.numberOfFailedOrders)) *
      100 || 100
  )
  const [numberOfProducts, setNumberOfProducts] = useState(0)
  const [initialNumberOfProducts, setInitialNumberOfProducts] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sortBy = ''
        const data = await listSellingProductsByStore(
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
          store._id
        )
        if (data.error) {
          console.error('Error fetching products:', data.error)
        } else {
          const newNumberOfProducts = data.products.length
          if (initialNumberOfProducts === 0) {
            setInitialNumberOfProducts(newNumberOfProducts)
          }
          setNumberOfProducts(newNumberOfProducts)
        }
      } catch (error) {
        console.error('Something went wrong:', error)
      }
    }
    fetchData()
  }, [store._id])

  return (
    <div className='container-fluid'>
      <div className='p-2'>
        <div className='row mb-2 gap-md-3 gap-sm-1'>
          <div className='row'>
            <div className='col-xl-6 col-md-12'>
              <Paragraph
                label={
                  <span>
                    <i className='fa-light fa-star me-2 text-secondary'></i>
                    {t('storeDetail.rating')}
                  </span>
                }
                colon
                time={store.numberOfReviews}
                value={
                  <span className='text-primary'>
                    {store.rating === 0 && store.numberOfReviews === 0
                      ? '4'
                      : store.rating}{' '}
                    / 5 <i className='fa-solid fa-star text-warning'></i>
                  </span>
                }
              />
            </div>
            <div className='col-xl-6 col-md-12'>
              <Paragraph
                label={
                  <span>
                    <i className='fa-light fa-user-check me-2 text-secondary'></i>
                    {t('joined')}
                  </span>
                }
                colon
                value={
                  <span className='text-primary'>
                    {formatMonth(store.createdAt)}
                  </span>
                }
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6 col-md-12'>
              <Paragraph
                label={
                  <span>
                    <i className='fa-light fa-user-group me-2 text-secondary'></i>
                    {t('storeDetail.followers')}
                  </span>
                }
                colon
                value={
                  <span className='text-primary'>
                    {store.numberOfFollowers}
                  </span>
                }
              />
            </div>
            <div className='col-lg-6 col-md-12'>
              <Paragraph
                label={
                  <span>
                    <i className='fa-light fa-box-check me-2 text-secondary'></i>
                    {t('success/failure')}
                  </span>
                }
                colon
                value={<span className='text-primary'>{percent} %</span>}
              />
            </div>
          </div>
          <div className='row'>
            <Paragraph
              label={
                <span>
                  <i className='fa-light fa-box me-2 text-secondary'></i>
                  {t('storeDetail.numberOfProduct')}
                </span>
              }
              colon
              value={
                <span className='text-primary'>{initialNumberOfProducts}</span>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreLevelInfo
