import { useTranslation } from 'react-i18next'

const UserRoleLabel = ({ role = '', detail = true }) => {
  const { t } = useTranslation()
  return (
    <span className='position-relative d-inline-block'>
      <span
        className={`badge ${
          role === 'user'
            ? 'bg-success-rgba text-success'
            : 'bg-primary-rgba text-primary'
        } rounded-1`}
      >
        {detail && <span>{t(`userDetail.role.${role}`)}</span>}
      </span>
    </span>
  )
}

export default UserRoleLabel
