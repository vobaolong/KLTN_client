/* eslint-disable react-hooks/exhaustive-deps */
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
import Pagination from '../ui/Pagination'
import SortByButton from './sub/SortByButton'
import Error from '../ui/Error'
import TransactionStatusLabel from '../label/TransactionStatusLabel'
import EWalletInfo from '../info/EWalletInfo'
import CreateTransactionItem from '../item/CreateTransactionItem'
import CreateTransactionItemForUser from '../item/CreateTransactionItemForUser'
import StoreSmallCard from '../card/StoreSmallCard'
import UserSmallCard from '../card/UserSmallCard'
import { useTranslation } from 'react-i18next'
import SuccessLabel from '../label/SuccessLabel'
import ShowResult from '../ui/ShowResult'
import boxImg from '../../assets/box.svg'

const TransactionsTable = ({
  storeId = '',
  by = 'admin',
  owner = {},
  eWallet = 0,
  heading = false,
  onReloadWallet
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [run, setRun] = useState(false)
  const [error, setError] = useState('')
  const [transactions, setTransactions] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })

  const { _id: userId, accessToken } = getToken()

  const [filter, setFilter] = useState({
    sortBy: 'createdAt',
    order: 'desc',
    limit: 9,
    page: 1
  })

  const init = () => {
    let isMounted = true
    setError('')
    setIsLoading(true)
    if (by === 'user')
      listTransactionsByUser(userId, accessToken, filter)
        .then((data) => {
          if (!isMounted) return
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
          if (!isMounted) return
          setError('Server Error')
          setIsLoading(false)
        })
    else if (by === 'store')
      listTransactionsByStore(userId, accessToken, filter, storeId)
        .then((data) => {
          if (!isMounted) return
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
          if (!isMounted) return
          setError('Server Error')
          setIsLoading(false)
        })
    else
      listTransactionsForAdmin(userId, accessToken, filter)
        .then((data) => {
          if (!isMounted) return
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
          if (!isMounted) return
          setError('Server Error')
          setIsLoading(false)
        })
    return () => {
      isMounted = false
    }
  }

  useEffect(() => {
    const cleanup = init()
    return cleanup
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

  const handleReload = () => {
    setRun(!run)
    if (onReloadWallet) {
      onReloadWallet()
    }
  }

  return (
    <div className='position-relative'>
      {heading && (
        <h5 className='text-start'>
          {by !== 'admin' ? t('userDetail.wallet') : t('transactions')}
        </h5>
      )}
      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className='d-flex align-items-center justify-content-between mb-2'>
          {by === 'store' && (
            <>
              <EWalletInfo eWallet={eWallet} onReload={handleReload} />
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
        {!isLoading && pagination.size === 0 ? (
          <div className='m-4 text-center'>
            <img className='mb-3' src={boxImg} alt='boxImg' width={'80px'} />
            <h5>{t('transactionDetail.noTransaction')}</h5>
          </div>
        ) : (
          <div className='table-scroll'>
            <table className='table table-sm table-hover align-middle text-start'>
              <thead>
                <tr>
                  <th scope='col' className='text-center'></th>
                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('userDetail.transaction')}
                      sortBy='_id'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col' className='text-end'>
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
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                  )}
                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('transactionDetail.type')}
                      sortBy='isUp'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('status.status')}
                      sortBy='isUp'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('transactionDetail.createdAt')}
                      sortBy='createdAt'
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
                    <td>
                      <small>{transaction._id}</small>
                    </td>
                    <td className='text-end'>
                      <small>
                        {formatPrice(transaction.amount?.$numberDecimal)}
                        <sup>₫</sup>{' '}
                        <small className='text-warning'>
                          {transaction.amount.$numberDecimal > 0 ? '' : '(COD)'}
                        </small>
                      </small>
                    </td>
                    {by === 'admin' && (
                      <td>
                        {transaction && transaction.storeId ? (
                          <StoreSmallCard store={transaction.storeId} />
                        ) : (
                          <UserSmallCard user={transaction.userId} />
                        )}
                      </td>
                    )}
                    <td>
                      <span>
                        <TransactionStatusLabel isUp={transaction.isUp} />
                      </span>
                    </td>
                    <td>
                      <span>
                        <SuccessLabel />
                      </span>
                    </td>
                    <td className='py-2'>
                      <small>{humanReadableDate(transaction.createdAt)}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className='d-flex justify-content-between align-items-center px-4 mt-1'>
          {pagination.size !== 0 && (
            <ShowResult
              limit={filter.limit}
              size={pagination.size}
              pageCurrent={pagination.pageCurrent}
            />
          )}
          {pagination.size !== 0 && (
            <Pagination
              pagination={pagination}
              onChangePage={handleChangePage}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default TransactionsTable
