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
import DropDownMenu from '../ui/DropDownMenu'
import UserSmallCard from '../card/UserSmallCard'
import StoreSmallCard from '../card/StoreSmallCard'
import ProductSmallCard from '../card/ProductSmallCard'
import { useTranslation } from 'react-i18next'
import Loading from '../ui/Loading'
const groupByFunc = {
  order: groupByDate,
  product: groupBySold,
  user: groupByJoined,
  store: groupByJoined
}

const titles = {
  order: 'Sales statistics by orders',
  product: 'Sales statistics by products',
  user: 'Statistics of new users',
  store: 'Statistics of new stores'
}

const ListStatisticsItems = ({ by = 'admin', storeId = '' }) => {
  const { t } = useTranslation()
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
    sliceEnd: 5,
    type: 'line'
  })

  const { _id, accessToken } = getToken()

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
        role: 'user',
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
    } catch (e) {
      console.error('Something went wrong')
    }
    setIsLoading(false)
  }

  const vendorInit = async () => {
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
    } catch (e) {
      console.error('Something went wrong')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (by === 'admin') adminInit()
    else vendorInit()
  }, [by, storeId])

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      <div className='container-fluid px-2'>
        <div className='row'>
          <div className='col-md-3 col-6'>
            <button
              type='button'
              className={`btn ${
                options.flag === 'order' ? 'btn-danger' : 'btn-outline-danger'
              } btn-lg ripple w-100 py-4 mb-2`}
              onClick={() =>
                setOptions({
                  ...options,
                  flag: 'order'
                })
              }
            >
              <i className='fa-solid fa-clipboard'></i>
              <span className='ms-3 res-hide'>{sizes.order}</span>
              <span className='ms-1 res-hide-lg'>{t('admin.orders')}</span>
            </button>
          </div>
          <div className='col-md-3 col-6'>
            <button
              type='button'
              className={`btn ${
                options.flag === 'product'
                  ? 'btn-success'
                  : 'btn-outline-success'
              } btn-lg ripple w-100 py-4 mb-2`}
              onClick={() =>
                setOptions({
                  ...options,
                  flag: 'product'
                })
              }
            >
              <i className='fa-solid fa-box'></i>
              <span className='ms-3 res-hide'>{sizes.product}</span>
              <span className='ms-1 res-hide-lg'>{t('admin.products')}</span>
            </button>
          </div>
          {by === 'admin' && (
            <>
              <div className='col-md-3 col-6'>
                <button
                  type='button'
                  className={`btn ${
                    options.flag === 'user'
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  } btn-lg ripple w-100 py-4 mb-2`}
                  onClick={() =>
                    setOptions({
                      ...options,
                      flag: 'user'
                    })
                  }
                >
                  <i className='fa-solid fa-user-group'></i>
                  <span className='ms-3 res-hide'>{sizes.user}</span>
                  <span className='ms-1 res-hide-lg'>{t('admin.users')}</span>
                </button>
              </div>

              <div className='col-md-3 col-6'>
                <button
                  type='button'
                  className={`btn ${
                    options.flag === 'store'
                      ? 'btn-golden'
                      : 'btn-outline-golden'
                  } btn-lg ripple w-100 py-4 mb-2`}
                  onClick={() =>
                    setOptions({
                      ...options,
                      flag: 'store'
                    })
                  }
                >
                  <i className='fa-solid fa-store'></i>
                  <span className='ms-3 res-hide'>{sizes.store}</span>
                  <span className='ms-1 res-hide-lg'>{t('admin.stores')}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className='container-fluid px-2 mt-3'>
        <div className='row'>
          <div className='col-xl-8 col-lg-6 position-relative'>
            <form
              style={{ right: '2%', top: '1%' }}
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
                    // label={t('admin.adDashboard.statisticsBy')}
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
                  // label={t('admin.adDashboard.chartType')}
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

          <div className='col-xl-4 col-lg-6 bg-body rounded-1 box-shadow p-2'>
            <h5 className='text-start mt-2'>
              {options.flag === 'user' && t('topUser')}
              {options.flag === 'store' && t('topShop')}
              {options.flag === 'product' && t('topProduct')}
              {options.flag === 'order' && t('orderRecent')}
            </h5>
            <div className='table-scroll'>
              <table className='table align-middle table-hover table-sm text-center'>
                <thead>
                  <tr>
                    <th scope='col'></th>
                    <th
                      scope='col'
                      className='text-start  border-end-0'
                      style={{ fontSize: '.9rem' }}
                    >
                      {options.flag === 'user' && t('userDetail.name')}
                      {options.flag === 'store' && t('storeDetail.storeName')}
                      {options.flag === 'product' && t('productDetail.name')}
                      {options.flag === 'order' && t('orderDetail.id')}
                    </th>
                    <th
                      scope='col'
                      className='text-end'
                      style={{ fontSize: '.9rem' }}
                    >
                      {options.flag === 'user' && t('point')}
                      {options.flag === 'store' && t('point')}
                      {options.flag === 'product' && t('productDetail.sold')}
                      {options.flag === 'order' && t('orderDetail.date')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(options.flag === 'order'
                    ? items[options.flag].slice(-6).reverse()
                    : items[options.flag].slice(0, 6)
                  ).map((item, index) => (
                    <tr key={index}>
                      <th scope='row'>{index + 1} </th>
                      <td
                        className='text-start border-end-0'
                        style={{
                          whiteSpace: 'normal'
                        }}
                      >
                        {options.flag === 'user' && (
                          <UserSmallCard user={item} />
                        )}
                        {options.flag === 'store' && (
                          <StoreSmallCard store={item} />
                        )}
                        {options.flag === 'product' && (
                          <ProductSmallCard product={item} rating={true} />
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
                            {item._id}
                          </Link>
                        )}
                      </td>
                      <td
                        className='text-end'
                        style={{
                          whiteSpace: 'normal'
                        }}
                      >
                        {options.flag === 'user' && item.point}
                        {options.flag === 'store' && item.point}
                        {options.flag === 'product' && item.sold}
                        {options.flag === 'order' && (
                          <span style={{ fontSize: '.875rem' }}>
                            {humanReadableDate(item.createdAt)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='d-flex justify-content-start my-2'>
              <Link
                to={`/${by}/${
                  by === 'admin' ? options.flag : options.flag + 's/' + storeId
                }`}
                className='link-hover'
              >
                <span className='me-2 res-hide'>
                  {options.flag === 'user' && t('goToUserManager')}
                  {options.flag === 'store' && t('goToShopManager')}
                  {options.flag === 'product' && t('goToProductManager')}
                  {options.flag === 'order' && t('goToOrderManager')}
                </span>
                <i className='fa-solid fa-external-link-alt'></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListStatisticsItems
