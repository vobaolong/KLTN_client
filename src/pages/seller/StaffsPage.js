import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import SellerLayout from '../../components/layout/SellerLayout'
import StoreOwnerTable from '../../components/table/StoreOwnerTable'
import StoreStaffsTable from '../../components/table/StoreStaffsTable'
import { useTranslation } from 'react-i18next'

const StaffsPage = () => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.seller.store)
  const [flag, toggleFlag] = useToggle(true)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: `/seller/${store._id}` },
    { name: t('breadcrumbs.staff'), url: `/seller/staffs/${store._id}` }
  ]

  return (
    <SellerLayout user={user} store={store} paths={paths}>
      <div className='mb-2 bg-body rounded-top-1 box-shadow'>
        <ul className='nav nav-tabs'>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${flag ? 'active' : ''}`}
              onClick={() => toggleFlag(true)}
            >
              <span className='res-hide'>{t('staffDetail.staffList')}</span>
            </span>
          </li>
          <li className='nav-item col-6 text-center pointer'>
            <span
              className={`nav-link ${!flag ? 'active' : ''}`}
              onClick={() => toggleFlag(false)}
            >
              <span className='res-hide'>{t('staffDetail.owner')}</span>
            </span>
          </li>
        </ul>
      </div>
      {flag ? (
        <StoreStaffsTable
          staffIds={store.staffIds}
          ownerId={store.ownerId}
          storeId={store._id}
        />
      ) : (
        <StoreOwnerTable ownerId={store.ownerId} />
      )}
    </SellerLayout>
  )
}

export default StaffsPage
