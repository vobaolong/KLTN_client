import Paragraph from '../ui/Paragraph'
import UserRoleLabel from '../label/UserRoleLabel'
import { useTranslation } from 'react-i18next'

const humanReadableDate = (date) => {
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ]
  date = new Date(date)
  return (
    date.getHours() +
    ':' +
    date.getMinutes() +
    ' ' +
    date.getDate() +
    '/' +
    months[date.getMonth()] +
    '/' +
    date.getFullYear()
  )
}

const UserJoinedInfo = ({ user = {} }) => {
  const { t } = useTranslation()

  return (
    <div className='container-fluid'>
      <div className='row py-2 border border-primary rounded-3'>
        <div className='col-12'>
          <Paragraph
            label={t('role')}
            value={<UserRoleLabel role={user.role} />}
          />
        </div>

        <div className='col-12'>
          <Paragraph
            label={t('join')}
            value={humanReadableDate(user.createdAt)}
          />
        </div>
      </div>
    </div>
  )
}

export default UserJoinedInfo
