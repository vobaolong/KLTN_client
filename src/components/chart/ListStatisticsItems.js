/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { listOrdersForAdmin, listOrdersByStore } from '../../apis/order'
import {
  listProductsForAdmin,
  listProductsForManager
} from '../../apis/product'
import { listUserForAdmin } from '../../apis/user'
import { listStoresForAdmin } from '../../apis/store'
import { groupByDate, groupByJoined, groupBySold } from '../../helper/groupBy'
import { humanReadableDate } from '../../helper/humanReadable'
import LineChart from './LineChart'
import BarChart from './BarChart'
// import DoughnutChart from './DoughnutChart'
import DropDownMenu from '../ui/DropDownMenu'
import UserSmallCard from '../card/UserSmallCard'
import StoreSmallCard from '../card/StoreSmallCard'
import ProductSmallCard from '../card/ProductSmallCard'
import { useTranslation } from 'react-i18next'
import Loading from '../ui/Loading'
import { formatPrice } from '../../helper/formatPrice'

const ListStatisticsItems = ({ by = '', storeId = '' }) => {
  const { t } = useTranslation()
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const [items, setItems] = useState({
    order: [],
    product: [],
    user: [],
    store: []
  })
  const [sizes, setSizes] = useState({
    order: 0,
    product: 0,
    user: 0,
    store: 0
  })
  const [options, setOptions] = useState({
    flag: 'order',
    by: 'hours',
    sliceEnd: 6,
    type: 'line'
  })

  const titles = {
    order: t('admin.adDashboard.salesStatisticsByOrders'),
    product: t('admin.adDashboard.statisticsByProducts'),
    user: t('admin.adDashboard.statisticsNewUser'),
    store: t('admin.adDashboard.statisticsNewStore')
  }

  const groupByFunc = {
    order: groupByDate,
    product: groupBySold,
    user: groupByJoined,
    store: groupByJoined
  }

  const { _id, accessToken } = getToken()

  const calculateTotalRevenue = (orders) => {
    return orders.reduce((totalRevenue, order) => {
      if (order.status === 'Delivered') {
        const amount =
          by === 'admin'
            ? order.amountToZenpii.$numberDecimal
            : order.amountToStore.$numberDecimal
        return totalRevenue + parseFloat(amount)
      }
      return totalRevenue
    }, 0)
  }

  const adminInit = async () => {
    setIsLoading(true)
    try {
      const orderData = await listOrdersForAdmin(_id, accessToken, {
        search: '',
        sortBy: 'createdAt',
        order: 'desc',
        status: 'Delivered',
        limit: 1000,
        page: 1
      })

      const productData = await listProductsForAdmin(_id, accessToken, {
        search: '',
        sortBy: 'sold',
        isActive: 'true',
        order: 'desc',
        limit: 1000,
        page: 1
      })

      const userData = await listUserForAdmin(_id, accessToken, {
        search: '',
        sortBy: 'point',
        by: 'user',
        order: 'desc',
        limit: 1000,
        page: 1
      })

      const storeData = await listStoresForAdmin(_id, accessToken, {
        search: '',
        sortBy: 'point',
        sortMoreBy: 'rating',
        isActive: 'true',
        order: 'desc',
        limit: 1000,
        page: 1
      })

      setItems({
        ...items,
        order: orderData.orders.reverse(),
        product: productData.products,
        user: userData.users,
        store: storeData.stores
      })

      setSizes({
        ...sizes,
        order: orderData.size,
        product: productData.size,
        user: userData.size,
        store: storeData.size
      })

      const totalRevenue = calculateTotalRevenue(orderData.orders)
      setTotalRevenue(totalRevenue)
    } catch (e) {
      console.error('Something went wrong')
    }
    setIsLoading(false)
  }

  const sellerInit = async () => {
    setIsLoading(true)
    try {
      const orderData = await listOrdersByStore(
        _id,
        accessToken,
        {
          search: '',
          limit: 1000,
          sortBy: 'createdAt',
          order: 'desc',
          page: 1,
          status: 'Delivered'
        },
        storeId
      )

      const productData = await listProductsForManager(
        _id,
        accessToken,
        {
          search: '',
          sortBy: 'sold',
          isActive: 'true',
          order: 'desc',
          limit: 1000,
          page: 1
        },
        storeId
      )

      setItems({
        ...items,
        order: orderData.orders.reverse(),
        product: productData.products
      })

      setSizes({
        ...sizes,
        order: orderData.size,
        product: productData.size
      })

      const totalRevenue = calculateTotalRevenue(orderData.orders)
      setTotalRevenue(totalRevenue)
    } catch (e) {
      console.error('Something went wrong')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (by === 'admin') adminInit()
    else sellerInit()
  }, [by, storeId])
  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      <div className='container-fluid px-0'>
        <div className='row'>
          <div className='col-md-4 col-12'>
            <div className='rounded-2 bg-body text-center box-shadow p-3 mb-2 d-flex gap-2 text-dark-emphasis align-items-start justify-content-between'>
              <div className='d-flex flex-column align-items-start justify-content-start'>
                <span style={{ fontSize: '1rem' }} className='text-secondary'>
                  {t('admin.adDashboard.totalRevenue')}
                </span>
                <span style={{ fontSize: '1.3rem' }} className='fw-bold'>
                  {formatPrice(totalRevenue)}
                  <sup>₫</sup>
                </span>
              </div>
              <i className=' fa-light fw-normal fa-wallet fs-5 rounded-circle text-primary'></i>
            </div>
          </div>

          <div className='col-md-2 col-6'>
            <button
              type='button'
              className={`rounded-2 w-100 bg-body text-center box-shadow p-3 mb-2 d-flex align-items-start justify-content-between gap-2 text-dark-emphasis border ${
                options.flag === 'order' ? 'border-danger' : 'border-0 '
              }`}
              onClick={() =>
                setOptions({
                  ...options,
                  flag: 'order'
                })
              }
            >
              <div className='d-flex flex-column align-items-start justify-content-center'>
                <span style={{ fontSize: '1rem' }} className='text-secondary'>
                  {t('admin.orders')}
                </span>
                <span style={{ fontSize: '1.3rem' }} className='fw-bold'>
                  {sizes.order}
                </span>
              </div>
              <span>
                <i
                  className={`text-center  fs-5 rounded-circle text-danger ${
                    options.flag === 'order' ? 'fa-solid' : 'fa-light fw-normal'
                  } fa-receipt`}
                ></i>
              </span>
            </button>
          </div>
          <div className='col-md-2 col-6'>
            <button
              type='button'
              className={`rounded-2 w-100 bg-body box-shadow p-3 mb-2 d-flex align-items-start justify-content-between gap-2 text-dark-emphasis border ${
                options.flag === 'product' ? 'border-success' : 'border-0'
              }`}
              onClick={() =>
                setOptions({
                  ...options,
                  flag: 'product'
                })
              }
            >
              <div className='d-flex flex-column align-items-start justify-content-center'>
                <span style={{ fontSize: '1rem' }} className='text-secondary'>
                  {t('admin.products')}
                </span>
                <span style={{ fontSize: '1.3rem' }} className='fw-bold'>
                  {sizes.product}
                </span>
              </div>

              <span>
                <i
                  className={`text-center  fs-5 rounded-circle text-success ${
                    options.flag === 'product'
                      ? 'fa-solid'
                      : 'fa-light fw-normal'
                  } fa-box`}
                ></i>
              </span>
            </button>
          </div>
          {by === 'admin' && (
            <>
              <div className='col-md-2 col-6'>
                <button
                  type='button'
                  className={`rounded-2 w-100 bg-body text-center box-shadow p-3 mb-2 d-flex align-items-start justify-content-between gap-2 text-dark-emphasis border ${
                    options.flag === 'user' ? 'border-primary' : 'border-0 '
                  }`}
                  onClick={() =>
                    setOptions({
                      ...options,
                      flag: 'user'
                    })
                  }
                >
                  <div className='d-flex flex-column align-items-start justify-content-center'>
                    <span
                      style={{ fontSize: '1rem' }}
                      className='text-secondary'
                    >
                      {t('admin.users')}
                    </span>
                    <span style={{ fontSize: '1.3rem' }} className='fw-bold'>
                      {sizes.user}
                    </span>
                  </div>
                  <span>
                    <i
                      className={`text-center  fs-5 rounded-circle text-primary ${
                        options.flag === 'user'
                          ? 'fa-solid'
                          : 'fa-light fw-normal'
                      } fa-user`}
                    ></i>
                  </span>
                </button>
              </div>

              <div className='col-md-2 col-6'>
                <button
                  type='button'
                  className={`rounded-2 w-100 bg-body text-center box-shadow p-3 mb-2 d-flex align-items-start justify-content-between gap-2 text-dark-emphasis border ${
                    options.flag === 'store' ? 'border-warning' : 'border-0 '
                  }`}
                  onClick={() =>
                    setOptions({
                      ...options,
                      flag: 'store'
                    })
                  }
                >
                  <div className='d-flex flex-column align-items-start justify-content-center'>
                    <span
                      style={{ fontSize: '1rem' }}
                      className='text-secondary'
                    >
                      {t('admin.stores')}
                    </span>
                    <span style={{ fontSize: '1.3rem' }} className='fw-bold'>
                      {sizes.store}
                    </span>
                  </div>
                  <span>
                    <i
                      className={`text-center fs-5 rounded-circle text-warning ${
                        options.flag === 'store'
                          ? 'fa-solid'
                          : 'fa-light fw-normal'
                      } fa-store`}
                    ></i>
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className='mt-2'>
        <div className='row'>
          <div className='col-xl-8 col-lg-6 position-relative mb-2'>
            <form
              style={{ right: '2%', top: '2%' }}
              className='d-flex justify-content-end me-2 position-absolute'
            >
              {options.flag !== 'product' ? (
                <div className='me-2'>
                  <DropDownMenu
                    listItem={[
                      {
                        label: t('admin.adDashboard.hour'),
                        value: 'hours',
                        icon: <i className='fa-regular fa-clock'></i>
                      },
                      {
                        label: t('admin.adDashboard.day'),
                        value: 'date',
                        icon: <i className='fa-regular fa-calendar-days'></i>
                      },
                      {
                        label: t('admin.adDashboard.month'),
                        value: 'month',
                        icon: <i className='fa-solid fa-calendar-alt'></i>
                      },
                      {
                        label: t('admin.adDashboard.year'),
                        value: 'year',
                        icon: <i className='fa-solid fa-calendar-minus'></i>
                      }
                    ]}
                    value={options.by}
                    setValue={(value) =>
                      setOptions({
                        ...options,
                        by: value
                      })
                    }
                    // label={t('admin.adDashboard.statisticsBy')}
                    borderBtn={false}
                  />
                </div>
              ) : (
                <div className='me-2'>
                  <DropDownMenu
                    listItem={[
                      {
                        label: `5 ${t('admin.products')}`,
                        value: 5
                      },
                      {
                        label: `10 ${t('admin.products')}`,
                        value: 10
                      },
                      {
                        label: `50 ${t('admin.products')}`,
                        value: 50
                      },
                      {
                        label: `100 ${t('admin.products')}`,
                        value: 100
                      }
                    ]}
                    value={options.sliceEnd}
                    setValue={(value) =>
                      setOptions({
                        ...options,
                        sliceEnd: value
                      })
                    }
                    borderBtn={false}
                  />
                </div>
              )}
              <div>
                <DropDownMenu
                  listItem={[
                    {
                      label: t('admin.adDashboard.line'),
                      value: 'line',
                      icon: <i className='fa-solid fa-chart-line'></i>
                    },
                    {
                      label: t('admin.adDashboard.bar'),
                      value: 'bar',
                      icon: <i className='fa-solid fa-chart-column'></i>
                    }
                    // {
                    //   label: 'Doughnut',
                    //   value: 'doughnut',
                    //   icon: <i className='fa-solid fa-chart-pie'></i>
                    // }
                  ]}
                  value={options.type}
                  setValue={(value) =>
                    setOptions({
                      ...options,
                      type: value
                    })
                  }
                  borderBtn={false}
                />
              </div>
            </form>

            <div>
              {options.type === 'line' && (
                <LineChart
                  by={options.by}
                  items={items[options.flag]}
                  groupBy={groupByFunc[options.flag]}
                  title={titles[options.flag]}
                  sliceEnd={options.sliceEnd}
                  value={options.flag}
                  role={by}
                />
              )}
              {options.type === 'bar' && (
                <BarChart
                  by={options.by}
                  items={items[options.flag]}
                  groupBy={groupByFunc[options.flag]}
                  title={titles[options.flag]}
                  sliceEnd={options.sliceEnd}
                  value={options.flag}
                  role={by}
                />
              )}
              {/* {options.type === 'doughnut' && (
                <DoughnutChart
                  by={options.by}
                  items={items[options.flag]}
                  groupBy={groupByFunc[options.flag]}
                  title={titles[options.flag]}
                  sliceEnd={options.sliceEnd}
                />
              )} */}
            </div>
          </div>

          <div className='col-xl-4 col-lg-6 ps-md-0'>
            <div className='bg-body box-shadow p-2 rounded-1'>
              <h5 className='text-start'>
                {options.flag === 'user' && t('topUser')}
                {options.flag === 'store' && t('topShop')}
                {options.flag === 'product' && t('topProduct')}
                {options.flag === 'order' && t('orderRecent')}
              </h5>
              <div className='table-scroll'>
                <table className='table align-middle table-hover table-sm text-start'>
                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>
                        {options.flag === 'user' && t('userDetail.name')}
                        {options.flag === 'store' && t('storeDetail.storeName')}
                        {options.flag === 'product' && t('productDetail.name')}
                        {options.flag === 'order' && t('orderDetail.id')}
                      </th>
                      <th scope='col'>
                        {options.flag === 'user' && t('point')}
                        {options.flag === 'store' && t('point')}
                        {options.flag === 'product' && t('productDetail.sold')}
                        {options.flag === 'order' && t('orderDetail.date')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(options.flag === 'order'
                      ? items[options.flag].slice(-5).reverse()
                      : items[options.flag].slice(0, 5)
                    ).map((item, index) => (
                      <tr key={index}>
                        <th scope='row'>{index + 1} </th>
                        <td
                          style={{
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {options.flag === 'user' && (
                            <small>
                              <UserSmallCard user={item} />
                            </small>
                          )}
                          {options.flag === 'store' && (
                            <small>
                              <StoreSmallCard store={item} />
                            </small>
                          )}
                          {options.flag === 'product' && (
                            <small
                              style={{
                                whiteSpace: 'normal',
                                minWidth: '400px',
                                width: 'fit-content'
                              }}
                            >
                              <ProductSmallCard product={item} rating={true} />
                            </small>
                          )}
                          {options.flag === 'order' && (
                            <Link
                              className='link-hover'
                              style={{ fontSize: '.875rem' }}
                              to={`/${by}/${
                                by === 'admin' ? 'order' : 'orders'
                              }/detail/${item._id}${
                                by !== 'admin' ? `/${storeId}` : ''
                              }`}
                            >
                              <small>{item._id}</small>
                            </Link>
                          )}
                        </td>
                        <td
                          style={{
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {options.flag === 'user' && item.point}
                          {options.flag === 'store' && item.point}
                          {options.flag === 'product' && item.sold}
                          {options.flag === 'order' && (
                            <small>{humanReadableDate(item.createdAt)}</small>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='d-flex justify-content-end mt-1'>
                <Link
                  to={`/${by}/${
                    by === 'admin'
                      ? options.flag
                      : options.flag + 's/' + storeId
                  }`}
                  className='link-hover'
                >
                  <span className='me-2'>
                    {options.flag === 'user' && t('goToUserManager')}
                    {options.flag === 'store' && t('goToShopManager')}
                    {options.flag === 'product' && t('goToProductManager')}
                    {options.flag === 'order' && t('goToOrderManager')}
                  </span>
                  <i className='fa-light fa-arrow-up-right-from-square'></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListStatisticsItems
