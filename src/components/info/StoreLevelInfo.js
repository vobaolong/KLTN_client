/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Paragraph from '../ui/Paragraph'
import Skeleton from 'react-loading-skeleton'
import { formatMonth } from '../../helper/humanReadable'
import Modal from '../ui/Modal'
import ListReport from '../item/form/ListReport'
import { getToken } from '../../apis/auth'
import { useSelector } from 'react-redux'

const storeReasons = [
  { value: 'Sản phẩm cấm', label: 'Sản phẩm cấm' },
  {
    value: 'Người dùng có dấu hiệu lừa đảo',
    label: 'Người dùng có dấu hiệu lừa đảo'
  },
  { value: 'Hàng giả, hàng nhái', label: 'Hàng giả, hàng nhái' }
]

const StoreLevelInfo = ({ store = {} }) => {
  const { t } = useTranslation()
  const totalOrders =
    store?.numberOfSuccessfulOrders + store?.numberOfFailedOrders

  const successRate =
    totalOrders > 0
      ? Math.round((store?.numberOfSuccessfulOrders / totalOrders) * 100) || 100
      : 100
  const [showMenu, setShowMenu] = useState(false)
  const user = useSelector((state) => state.account.user)

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className='container-fluid'>
      <div className='p-2'>
        <div className='row mb-2 gap-md-3 gap-sm-1'>
          <div className='row col-11 py-lg-3'>
            <div className='col-md-6 col-sm-12 mt-lg-2'>
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
            <div className='col-md-6 col-sm-12 mt-lg-2'>
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
            <div className='col-md-6 col-sm-12 mt-lg-2'>
              <Paragraph
                label={
                  <span>
                    <i className='fa-light fa-user-group me-2 text-secondary'></i>
                    {t('storeDetail.followers')}
                  </span>
                }
                colon
                value={
                  store.numberOfFollowers !== null &&
                  store.numberOfFollowers !== undefined ? (
                    <span className='text-primary'>
                      {store.numberOfFollowers}
                    </span>
                  ) : (
                    <Skeleton height={20} />
                  )
                }
              />
            </div>
            <div className='col-md-6 col-sm-12 mt-lg-2'>
              <Paragraph
                label={
                  <span>
                    <i className='fa-light fa-box-check me-2 text-secondary'></i>
                    {t('success/failure')}
                  </span>
                }
                colon
                value={
                  successRate ? (
                    <span className='text-primary'>{successRate}%</span>
                  ) : (
                    <Skeleton height={20} />
                  )
                }
              />
            </div>
          </div>
          {getToken() &&
            getToken().role === 'user' &&
            user._id !== store?.ownerId?._id && (
              <div className='col-1 d-flex justify-content-end'>
                <div className='menu-container'>
                  <button
                    className='btn menu-button'
                    onClick={handleMenuToggle}
                  >
                    <i className='fa fa-ellipsis-v'></i>
                  </button>
                  {showMenu && (
                    <div className='menu d-inline-block'>
                      <button
                        type='button'
                        data-bs-target='#report'
                        data-bs-toggle='modal'
                        className='btn--with-img menu-item'
                      >
                        <i className='fa-light fa-circle-info me-2'></i>
                        {t('report')}
                      </button>
                      <Modal
                        hasCloseBtn={false}
                        title={t('dialog.report')}
                        id='report'
                      >
                        <ListReport
                          reasons={storeReasons}
                          objectId={store._id}
                          reportBy={user._id}
                          isStore={true}
                        />
                      </Modal>
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default StoreLevelInfo
