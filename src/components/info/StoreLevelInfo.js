/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Paragraph from '../ui/Paragraph'
import Skeleton from 'react-loading-skeleton'
import { formatMonth } from '../../helper/humanReadable'
import { listSellingProductsByStore } from '../../apis/product'

const StoreLevelInfo = ({ store = {} }) => {
  const { t } = useTranslation()
  const successRate = Math.round(
    (store?.numberOfSuccessfulOrders /
      (store?.numberOfSuccessfulOrders + store?.numberOfFailedOrders)) *
      100
  )
  const [initialNumberOfProducts, setInitialNumberOfProducts] = useState(0)

  useEffect(() => {
    let isMounted = true

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
            limit: 100,
            page: 1
          },
          store._id
        )

        if (isMounted && !data.error) {
          const newNumberOfProducts = data.products.length
          if (initialNumberOfProducts === 0) {
            setInitialNumberOfProducts(newNumberOfProducts)
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [store._id])

  return (
    <div className='container-fluid'>
      <div className='p-2'>
        <div className='row mb-2 gap-md-3 gap-sm-1'>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
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
                  store.rating ? (
                    <span className='text-primary'>
                      {store.rating === 0 && store.numberOfReviews === 0
                        ? '4'
                        : store.rating}{' '}
                      / 5 <i className='fa-solid fa-star text-warning'></i>
                    </span>
                  ) : (
                    <Skeleton height={20} />
                  )
                }
              />
            </div>
            <div className='col-md-6 col-sm-12'>
              <Paragraph
                label={
                  <span>
                    <i className='fa-light fa-user-check me-2 text-secondary'></i>
                    {t('joined')}
                  </span>
                }
                colon
                value={
                  store.createdAt ? (
                    <span className='text-primary'>
                      {formatMonth(store.createdAt)}
                    </span>
                  ) : (
                    <Skeleton height={20} />
                  )
                }
              />
            </div>
            <div className='col-md-6 col-sm-12'>
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
                    {store.numberOfFollowers || 0}
                  </span>
                }
              />
            </div>
            <div className='col-md-6 col-sm-12'>
              <Paragraph
                label={
                  <span>
                    <i className='fa-light fa-box-check me-2 text-secondary'></i>
                    {t('success/failure')}
                  </span>
                }
                colon
                value={
                  <span className='text-primary'>{successRate || 100} %</span>
                }
              />
            </div>
            <div className='col-md-6 col-sm-12'>
              <Paragraph
                label={
                  <span>
                    <i className='fa-light fa-box me-2 text-secondary'></i>
                    {t('storeDetail.numberOfProduct')}
                  </span>
                }
                colon
                value={
                  <span className='text-primary'>
                    {initialNumberOfProducts || 0}
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreLevelInfo
