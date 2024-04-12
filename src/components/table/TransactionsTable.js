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
import TransactionStatusLabel from '../label/TransactionStatusLabel'
import EWalletInfo from '../info/EWalletInfo'
import CreateTransactionItem from '../item/CreateTransactionItem'
import CreateTransactionItemForUser from '../item/CreateTransactionItemForUser'
import StoreSmallCard from '../card/StoreSmallCard'
import UserSmallCard from '../card/UserSmallCard'
import { useTranslation } from 'react-i18next'
import SuccessLabel from '../label/SuccessLabel'
import ShowResult from '../ui/ShowResult'
import { toast } from 'react-toastify'

const TransactionsTable = ({
  storeId = '',
  by = 'admin',
  owner = {},
  eWallet = 0
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    if (by === 'user')
      listTransactionsByUser(userId, accessToken, filter)
        .then((data) => {
          if (data.error) toast.error(data.error)
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
          console.log('Something went wrong')
          setIsLoading(false)
        })
    else if (by === 'store')
      listTransactionsByStore(userId, accessToken, filter, storeId)
        .then((data) => {
          if (data.error) toast.error(data.error)
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
          console.log('Something went wrong')
          setIsLoading(false)
        })
    else
      listTransactionsForAdmin(userId, accessToken, filter)
        .then((data) => {
          if (data.error) toast.error(data.error)
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
          console.log('Something went wrong')
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
        <h5 className='text-center text-uppercase'>{t('userDetail.wallet')}</h5>
      ) : (
        <h5 className='text-center text-uppercase'>{t('transactions')}</h5>
      )}

      {isLoading && <Loading />}
      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className='d-flex align-items-center justify-content-between mb-2'>
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
        {!isLoading && pagination.size === 0 ? (
          <div className='d-flex justify-content-center mt-5 text-primary text-center'>
            <h5>{t('transactionDetail.noTransaction')}</h5>
          </div>
        ) : (
          <div className='table-scroll'>
            <table className='table table-sm table-hover align-middle text-end'>
              <thead>
                <tr>
                  <th scope='col'></th>
                  <th scope='col' className='text-start'>
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
                      title={t('transactionDetail.createdAt')}
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
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                  )}
                  <th scope='col' className='text-center'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('transactionDetail.type')}
                      sortBy='isUp'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col' className='text-center'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('status.status')}
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
                    <td className='text-start'>
                      <small>{transaction._id}</small>
                    </td>
                    <td>
                      <small>{humanReadableDate(transaction.createdAt)}</small>
                    </td>
                    <td>
                      <small className='text-nowrap'>
                        {formatPrice(transaction.amount?.$numberDecimal)}₫
                      </small>
                    </td>
                    {by === 'admin' && (
                      <td className='text-start'>
                        {transaction && transaction.storeId ? (
                          <StoreSmallCard store={transaction.storeId} />
                        ) : (
                          <UserSmallCard user={transaction.userId} />
                        )}
                      </td>
                    )}
                    <td className='text-center'>
                      <span>
                        <TransactionStatusLabel isUp={transaction.isUp} />
                      </span>
                    </td>
                    <td className='text-center'>
                      <span>
                        <SuccessLabel />
                      </span>
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
