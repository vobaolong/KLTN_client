/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { getListUsers } from '../../../apis/user'
import { addStaffs } from '../../../apis/store'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import UserSmallCard from '../../card/UserSmallCard'
import SearchInput from '../../ui/SearchInput'
import Loading from '../../ui/Loading'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const StoreAddStaffsForm = ({ storeId = '', owner = {}, staffs = [] }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [filter, setFilter] = useState({})
  const [pagination, setPagination] = useState({})
  const [listUsers, setListUsers] = useState([])
  const [listLeft, setListLeft] = useState([])
  const [listRight, setListRight] = useState([])

  const [updateDispatch] = useUpdateDispatch()
  const { t } = useTranslation()
  const { _id, accessToken } = getToken()

  const init = () => {
    getListUsers(filter)
      .then((data) => {
        if (data.error) return
        else {
          setPagination({
            size: data.size,
            pageCurrent: data.filter.pageCurrent,
            pageCount: data.filter.pageCount
          })

          if (filter.page === 1) setListUsers(data.users)
          else setListUsers([...listUsers, ...data.users])
        }
      })
      .catch((error) => {
        return
      })
  }

  useEffect(() => {
    setFilter({
      search: '',
      sortBy: 'firstName',
      role: 'customer',
      order: 'asc',
      limit: 3,
      page: 1
    })
  }, [storeId, owner, staffs])

  useEffect(() => {
    init()
  }, [filter])

  useEffect(() => {
    const listCurrentStaffs = staffs.map((s) => s._id)
    const listCurrentRight = listRight.map((r) => r._id)
    setListLeft(
      listUsers.filter(
        (u) =>
          u._id !== owner._id &&
          listCurrentStaffs.indexOf(u._id) === -1 &&
          listCurrentRight.indexOf(u._id) === -1
      )
    )
  }, [listUsers])

  const handleChangeKeyword = (keyword) => {
    setFilter({
      ...filter,
      search: keyword,
      page: 1
    })
  }

  const handleLoadMore = () => {
    setFilter({
      ...filter,
      page: filter.page + 1
    })
  }

  const handleAddBtn = (user) => {
    setListRight([...listRight, user])
    setListLeft(listLeft.filter((u) => u._id !== user._id))
  }

  const handleRemoveBtn = (user) => {
    setListLeft([...listLeft, user])
    setListRight(listRight.filter((u) => u._id !== user._id))
  }

  const handleSubmit = () => {
    setIsConfirming(true)
  }

  const onSubmit = () => {
    const staffs = listRight.map((r) => r._id)
    setIsLoading(true)
    addStaffs(_id, accessToken, staffs, storeId)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          setListRight([])
          updateDispatch('vendor', data.store)
          toast.success(data.success)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('staffDetail.add')}
          message={
            <span>
              Are you sure you want to add to this store: <br />
              {listRight?.map((user, index) => (
                <span className='mt-2 d-block' key={index}>
                  <UserSmallCard user={user} />
                </span>
              ))}
            </span>
          }
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <div className='row'>
        <div className='col'>
          <div className='border rounded-1 p-2 cus-group bg-light d-flex flex-column justify-content-between'>
            <div className='mb-2'>
              <SearchInput onChange={handleChangeKeyword} />
            </div>

            <div className='flex-grow-1 w-100'>
              {listLeft &&
                listLeft.map((user, index) => (
                  <div
                    key={index}
                    className='d-flex justify-content-between align-items-center'
                  >
                    <div className='mb-2'>
                      <UserSmallCard user={user} />
                    </div>
                    <button
                      type='button'
                      className='btn btn-primary btn-sm ripple rounded-1'
                      onClick={() => handleAddBtn(user)}
                    >
                      <i className='fa-solid fa-user-plus'></i>
                    </button>
                  </div>
                ))}
            </div>

            <button
              type='button'
              disabled={
                pagination && pagination.pageCount > pagination.pageCurrent
                  ? false
                  : true
              }
              className='btn btn-primary ripple w-100 mt-4 rounded-1'
              onClick={handleLoadMore}
            >
              <i className='fa-solid fa-caret-down'></i> {t('button.more')}
            </button>
          </div>
        </div>

        <div className='col'>
          <div className='border rounded-1 p-2 cus-group bg-light  d-flex flex-column justify-content-between align-items-center'>
            <div className='flex-grow-1 w-100'>
              {listRight &&
                listRight.map((user, index) => (
                  <div
                    key={index}
                    className='d-flex justify-content-between align-items-center'
                  >
                    <div className='mb-2'>
                      <UserSmallCard user={user} />
                    </div>
                    <button
                      type='button'
                      className='btn btn-outline-danger btn-sm rounded-1 ripple'
                      onClick={() => handleRemoveBtn(user)}
                    >
                      <i className='fas fa-times-circle'></i>
                    </button>
                  </div>
                ))}
            </div>

            <button
              type='button'
              className='btn rounded-1 btn-primary ripple w-100 mt-4'
              onClick={handleSubmit}
            >
              {t('button.submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreAddStaffsForm
