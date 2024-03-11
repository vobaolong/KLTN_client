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
import DoughnutChart from './DoughnutChart'
import DropDownMenu from '../ui/DropDownMenu'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import UserSmallCard from '../card/UserSmallCard'
import StoreSmallCard from '../card/StoreSmallCard'
import ProductSmallCard from '../card/ProductSmallCard'

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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

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
    setError('')
    setIsLoading(true)
    try {
      const orderData = await listOrdersForAdmin(_id, accessToken, {
        search: '',
        limit: 1000,
        sortBy: 'createdAt',
        order: 'desc',
        page: 1,
        status: 'Delivered'
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
        order: 'desc',
        limit: 1000,
        page: 1,
        role: 'user'
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
      setError('Server Error')
    }

    setIsLoading(false)
  }

  const vendorInit = async () => {
    setError('')
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
      setError('Server Error')
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
      {error && <Error msg={error} />}
      <div className='container-fluid px-2'>
        <div className='row'>
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
                  <i className='fas fa-user-friends'></i>
                  <span className='ms-3 res-hide'>{sizes.user}</span>
                  <span className='ms-1 res-hide-lg'>Users</span>
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
                  <i className='fas fa-store'></i>
                  <span className='ms-3 res-hide'>{sizes.store}</span>
                  <span className='ms-1 res-hide-lg'>Stores</span>
                </button>
              </div>
            </>
          )}

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
              <i className='fas fa-box'></i>
              <span className='ms-3 res-hide'>{sizes.product}</span>
              <span className='ms-1 res-hide-lg'>Products</span>
            </button>
          </div>

          <div className='col-md-3 col-6'>
            <button
              type='button'
              className={`btn ${
                options.flag === 'order' ? 'btn-dark' : 'btn-outline-dark'
              } btn-lg ripple w-100 py-4 mb-2`}
              onClick={() =>
                setOptions({
                  ...options,
                  flag: 'order'
                })
              }
            >
              <i className='fas fa-clipboard'></i>
              <span className='ms-3 res-hide'>{sizes.order}</span>
              <span className='ms-1 res-hide-lg'>Orders</span>
            </button>
          </div>
        </div>
      </div>

      <div className='container-fluid px-2'>
        <div className='row'>
          <div className='col-xl-8 col-lg-6'>
            <form className='d-flex'>
              {options.flag !== 'product' ? (
                <div className='me-2'>
                  <DropDownMenu
                    listItem={[
                      {
                        label: 'Hour',
                        value: 'hours',
                        icon: <i className='far fa-clock'></i>
                      },
                      {
                        label: 'Day',
                        value: 'date',
                        icon: <i className='fas fa-calendar-day'></i>
                      },
                      {
                        label: 'Month',
                        value: 'month',
                        icon: <i className='fas fa-calendar-alt'></i>
                      },
                      {
                        label: 'Year',
                        value: 'year',
                        icon: <i className='fas fa-calendar-minus'></i>
                      }
                    ]}
                    value={options.by}
                    setValue={(value) =>
                      setOptions({
                        ...options,
                        by: value
                      })
                    }
                    label='Statistics by'
                    borderBtn={true}
                  />
                </div>
              ) : (
                <div className='me-2'>
                  <DropDownMenu
                    listItem={[
                      {
                        label: '5 Products',
                        value: 5
                      },
                      {
                        label: '10 Products',
                        value: 10
                      },
                      {
                        label: '50 Products',
                        value: 50
                      },
                      {
                        label: '100 Products',
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
                    label='Statistics by'
                    borderBtn={true}
                  />
                </div>
              )}
              <div>
                <DropDownMenu
                  listItem={[
                    {
                      label: 'Line',
                      value: 'line',
                      icon: <i className='fas fa-chart-line'></i>
                    },
                    {
                      label: 'Bar',
                      value: 'bar',
                      icon: <i className='fas fa-chart-bar'></i>
                    }
                    // {
                    //   label: 'Doughnut',
                    //   value: 'doughnut',
                    //   icon: <i className='fas fa-chart-pie'></i>
                    // }
                  ]}
                  value={options.type}
                  setValue={(value) =>
                    setOptions({
                      ...options,
                      type: value
                    })
                  }
                  label='Chart type'
                  borderBtn={true}
                />
              </div>
            </form>

            <div className='mt-2'>
              {options.type === 'line' && (
                <LineChart
                  by={options.by}
                  items={items[options.flag]}
                  groupBy={groupByFunc[options.flag]}
                  title={titles[options.flag]}
                  sliceEnd={options.sliceEnd}
                />
              )}
              {options.type === 'bar' && (
                <BarChart
                  by={options.by}
                  items={items[options.flag]}
                  groupBy={groupByFunc[options.flag]}
                  title={titles[options.flag]}
                  sliceEnd={options.sliceEnd}
                />
              )}
              {options.type === 'doughnut' && (
                <DoughnutChart
                  by={options.by}
                  items={items[options.flag]}
                  groupBy={groupByFunc[options.flag]}
                  title={titles[options.flag]}
                  sliceEnd={options.sliceEnd}
                />
              )}
            </div>
          </div>

          <div className='col-xl-4 col-lg-6'>
            <h4 className='text-center my-4'>Top 5 {options.flag}s</h4>
            <div className='table-scroll my-2'>
              <table className='table align-middle table-hover table-sm text-center'>
                <thead>
                  <tr>
                    <th scope='col'></th>
                    <th scope='col'>
                      {options.flag[0].toUpperCase() +
                        options.flag.substring(1)}
                    </th>
                    <th scope='col'>
                      {options.flag === 'user' && 'Point'}
                      {options.flag === 'store' && 'Point'}
                      {options.flag === 'product' && 'Sold'}
                      {options.flag === 'order' && 'Date'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(options.flag === 'order'
                    ? items[options.flag].slice(-5).reverse()
                    : items[options.flag].slice(0, 5)
                  ).map((item, index) => (
                    <tr key={index}>
                      <th scope='row'>{index} </th>
                      <td
                        className='text-start hidden-avatar'
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
                          <ProductSmallCard product={item} />
                        )}
                        {options.flag === 'order' && <small>{item._id}</small>}
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
                          <small>{humanReadableDate(item.createdAt)}</small>
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
                  Go to {options.flag} manager
                </span>
                <i className='fas fa-external-link-alt'></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListStatisticsItems
