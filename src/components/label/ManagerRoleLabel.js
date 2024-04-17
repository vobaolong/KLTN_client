import { useTranslation } from 'react-i18next'

const UserRoleLabel = ({ role = '', detail = true }) => {
  const { t } = useTranslation()
  return (
    <span className='position-relative d-inline-block'>
      <span
        className={`badge border cus-tooltip rounded-1
			${
        role === 'owner'
          ? 'bg-primary-rgba text-primary'
          : 'bg-success-rgba text-success'
      }`}
      >
        {detail && <span>{t(`userDetail.${role}`)}</span>}
      </span>
    </span>
  )
}
export default UserRoleLabel
