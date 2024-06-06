import { useEffect, useState } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import {
  deleteNotifications,
  getNotifications,
  updateRead
} from '../../../apis/notification'
import { socketId } from '../../..'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { humanReadableDate } from '../../../helper/humanReadable'
import { useTranslation } from 'react-i18next'

const BellButton = () => {
  const { t } = useTranslation()
  const [list, setList] = useState([])
  const user = useSelector((state) => state.account.user)
  const [notificationCount, setNotificationCount] = useState(list.length)

  const handleDelete = async () => {
    try {
      await deleteNotifications(user._id)
      setList([])
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async () => {
    try {
      await updateRead(user._id)
      setNotificationCount(0)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchNotifications = async (id) => {
    try {
      const res = await getNotifications(id)
      const sortedNotifications = res.notifications.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setList(sortedNotifications)
      setNotificationCount(res.numberHidden)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(list)
  useEffect(() => {
    fetchNotifications(user._id)
  }, [user])

  useEffect(() => {
    socketId.on('notification', (id) => {
      fetchNotifications(id)
    })
  }, [])

  const popoverClickRootClose = (
    <Popover
      id='popover-trigger-click-root-close'
      style={{
        borderRadius: '5px',
        minWidth: '400px'
      }}
    >
      <div
        style={{
          height: '300px',
          overflow: 'auto'
        }}
      >
        {list.map((l) => (
          <Link
            to={`/account/purchase/detail/${l.orderId}`}
            key={l._id}
            style={{ fontSize: '13px' }}
            className='cus-notification nolink cus-dropdown w-100 px-3 py-2'
          >
            {l.message}{' '}
            <span className='fw-bold text-uppercase'>{l.orderId}</span>{' '}
            <p>{humanReadableDate(l.createdAt)}</p>
          </Link>
        ))}
        {list.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              marginTop: '60px',
              paddingTop: '120px'
            }}
          >
            Không có thông báo mới
          </p>
        )}
      </div>
      {list.length !== 0 && (
        <>
          <hr className='m-0' />
          <div className='d-flex justify-content-center'>
            <button
              className='btn rounded-0 w-100 btn-primary'
              onClick={handleDelete}
            >
              Xóa tất cả
            </button>
          </div>
        </>
      )}
    </Popover>
  )

  return (
    <li className='nav-item' onClick={handleClick}>
      <OverlayTrigger
        trigger='click'
        rootClose
        placement='bottom'
        overlay={popoverClickRootClose}
      >
        <div className='cart-item-wrap position-relative'>
          <span className='rounded-circle btn lang inherit cus-tooltip ripple'>
            <i className='fa-light fa-bell'></i>
          </span>
          {notificationCount > 0 && (
            <span
              style={{ top: '20%', left: '80%' }}
              className='position-absolute translate-middle badge rounded-pill bg-danger'
            >
              {notificationCount < 100 ? notificationCount : '99+'}
            </span>
          )}
          <small className='cus-tooltip-msg'>{t('notification')}</small>
        </div>
      </OverlayTrigger>
    </li>
  )
}

export default BellButton
