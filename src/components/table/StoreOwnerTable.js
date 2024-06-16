import { useTranslation } from 'react-i18next'
import UserSmallCard from '../card/UserSmallCard'
import Alert from '../ui/Alert'
import { useState } from 'react'

const StoreOwnerTable = ({ heading = false, ownerId = {} }) => {
  const { t } = useTranslation()
  const [alerts, setAlerts] = useState(true)

  return (
    <div className='position-relative'>
      {heading && <h5 className='text-start'>{t('staffDetail.owner')}</h5>}
      {alerts ? (
        <Alert
          icon={<i className='text-primary fa-solid fa-circle-info'></i>}
          msg1={`${t('alert.theOwner')}`}
          alert={`${t('alert.thisSectionContainsInfo')}`}
          msg2={`${t('alert.theShopOwner')}`}
          onClose={() => setAlerts(false)}
        />
      ) : null}
      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className='table-scroll my-2'>
          <table className='table align-middle table-hover table-sm text-center'>
            <thead>
              <tr>
                <th
                  scope='col'
                  style={{ fontSize: '0.9rem', fontWeight: '400' }}
                  className='text-secondary'
                >
                  #
                </th>
                <th
                  scope='col'
                  style={{ fontSize: '0.9rem', fontWeight: '400' }}
                  className='text-secondary text-start'
                >
                  {t('userDetail.name')}
                </th>
                <th
                  scope='col'
                  style={{ fontSize: '0.9rem', fontWeight: '400' }}
                  className='text-secondary'
                >
                  {t('userDetail.idCard')}
                </th>
                <th
                  scope='col'
                  style={{ fontSize: '0.9rem', fontWeight: '400' }}
                  className='text-secondary'
                >
                  {t('userDetail.email')}
                </th>
                <th
                  scope='col'
                  style={{ fontSize: '0.9rem', fontWeight: '400' }}
                  className='text-secondary'
                >
                  {t('userDetail.phone')}
                </th>
              </tr>
            </thead>
            <tbody>
              {ownerId && (
                <tr>
                  <th scope='row'>1</th>
                  <td className='text-start'>
                    <UserSmallCard user={ownerId} />
                  </td>
                  <td>
                    <small>{ownerId.id_card || '-'}</small>
                  </td>
                  <td>
                    <small>{ownerId.email || '-'}</small>
                  </td>
                  <td>
                    <small>{ownerId.phone || '-'}</small>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StoreOwnerTable
