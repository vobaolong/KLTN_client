import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import {
  listTransactionsByUser,
  listTransactionsByStore,
  listTransactionsForAdmin
} from '../../apis/transaction'
import { humanReadableDate } from '../../helper/humanReadable'
import { formatPrice } from '../../helper/formatPrice'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import Pagination from '../ui/Pagination'
import SortByButton from './sub/SortByButton'
import TransactionStatusLabel from '../label/TransactionStatusLabel'
import EWalletInfo from '../info/EWalletInfo'
import CreateTransactionItem from '../item/CreateTransactionItem'
import CreateTransactionItemForUser from '../item/CreateTransactionItemForUser'
import StoreSmallCard from '../card/StoreSmallCard'
import UserSmallCard from '../card/UserSmallCard'
import { useTranslation } from 'react-i18next'

const TransactionsTable = ({
  storeId = '',
  by = 'admin',
  owner = {},
  eWallet = 0
}) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [run, setRun] = useState(false)

  const [transactions, setTransactions] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    sortBy: 'createdAt',
    order: 'desc',
    limit: 10,
    page: 1
  })

  const { _id: userId, accessToken } = getToken()

  const init = () => {
    setError('')
    setIsLoading(true)
    if (by === 'user')
      listTransactionsByUser(userId, accessToken, filter)
        .then((data) => {
          if (data.error) setError(data.error)
          else {
            setTransactions(data.transactions)
            setPagination({
              size: data.size,
              pageCurrent: data.filter.pageCurrent,
              pageCount: data.filter.pageCount
            })
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Server Error')
          setIsLoading(false)
        })
    else if (by === 'store')
      listTransactionsByStore(userId, accessToken, filter, storeId)
        .then((data) => {
          if (data.error) setError(data.error)
          else {
            setTransactions(data.transactions)
            setPagination({
              size: data.size,
              pageCurrent: data.filter.pageCurrent,
              pageCount: data.filter.pageCount
            })
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Server Error')
          setIsLoading(false)
        })
    else
      listTransactionsForAdmin(userId, accessToken, filter)
        .then((data) => {
          if (data.error) setError(data.error)
          else {
            setTransactions(data.transactions)
            setPagination({
              size: data.size,
              pageCurrent: data.filter.pageCurrent,
              pageCount: data.filter.pageCount
            })
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Server Error')
          setIsLoading(false)
        })
  }

  useEffect(() => {
    init()
  }, [storeId, by, filter, run])

  const handleChangePage = (newPage) => {
    setFilter({
      ...filter,
      page: newPage
    })
  }

  const handleSetSortBy = (order, sortBy) => {
    setFilter({
      ...filter,
      sortBy,
      order
    })
  }

  return (
    <div className='position-relative'>
      {t('userDetail.wallet') && by !== 'admin' ? (
        <h4 className='text-center text-uppercase'>{t('userDetail.wallet')}</h4>
      ) : (
        <h4 className='text-center text-uppercase'>{t('transactions')}</h4>
      )}

      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div className='d-flex justify-content-between align-items-end'>
        <div className='d-flex align-items-center'>
          {by === 'store' && (
            <>
              <EWalletInfo eWallet={eWallet} />
              {owner && userId === owner._id && (
                <div className='ms-3'>
                  <CreateTransactionItem
                    storeId={storeId}
                    eWallet={eWallet}
                    onRun={() => setRun(!run)}
                  />
                </div>
              )}
            </>
          )}

          {by === 'user' && (
            <>
              <EWalletInfo eWallet={eWallet} />
              <div className='ms-3'>
                <CreateTransactionItemForUser
                  eWallet={eWallet}
                  onRun={() => setRun(!run)}
                />
              </div>
            </>
          )}
        </div>

        <span className='me-2 text-nowrap res-hide'>
          {pagination.size || 0} {t('result')}
        </span>
      </div>

      <div className='table-scroll my-2'>
        <table className='table table-sm table-hover align-middle text-end'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title={t('userDetail.transaction')}
                  sortBy='_id'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title={t('userDetail.date')}
                  sortBy='createdAt'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title={t('userDetail.total')}
                  sortBy='amount'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              {by === 'admin' && (
                <th scope='col' className='text-start'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('userDetail.by')}
                    sortBy='storeId'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
              )}
              <th scope='col' className='text-center'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title={t('storeDetail.status')}
                  sortBy='isUp'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <th scope='row' className='text-center'>
                  {index + 1 + (filter.page - 1) * filter.limit}
                </th>
                <td className='pe-3'>
                  <small>{transaction._id}</small>
                </td>
                <td className='pe-3'>
                  <small>{humanReadableDate(transaction.createdAt)}</small>
                </td>
                <td className='pe-3'>
                  <small className='text-nowrap'>
                    {transaction.amount &&
                      formatPrice(transaction.amount.$numberDecimal)}{' '}
                    ₫
                  </small>
                </td>
                {by === 'admin' && (
                  <td className='text-start ps-4'>
                    {transaction && transaction.storeId ? (
                      <StoreSmallCard store={transaction.storeId} />
                    ) : (
                      <UserSmallCard user={transaction.userId} />
                    )}
                  </td>
                )}
                <td className='text-center ps-4'>
                  <small>
                    <TransactionStatusLabel isUp={transaction.isUp} />
                  </small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default TransactionsTable
