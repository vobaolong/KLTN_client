import { useTranslation } from 'react-i18next'
import UserSmallCard from '../card/UserSmallCard'

const StoreOwnerTable = ({ heading = '', ownerId = {} }) => {
  const { t } = useTranslation()
  return (
    <div className='position-relative'>
      {heading && <h4 className='text-center text-uppercase'>{heading}</h4>}

      <div className='table-scroll my-2'>
        <table className='table align-middle table-hover table-striped table-sm text-center'>
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
  )
}

export default StoreOwnerTable
