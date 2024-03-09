import Paragraph from '../ui/Paragraph'
import PhoneActiveButton from '../button/PhoneActiveButton'
import EmailActiveButton from '../button/EmailActiveButton'
import UserEditProfileItem from '../item/UserEditProfileItem'
import UserEditPasswordItem from '../item/UserEditPasswordItem'
import { useTranslation } from 'react-i18next'

const UserProfileInfo = ({ user = {}, isEditable = false }) => {
  const { t } = useTranslation()
  return (
    <div className='container-fluid'>
      <div className='row py-2 border border-primary rounded-1'>
        <div className='col-sm-6'>
          <Paragraph label={t('userDetail.firstName')} value={user.firstName} />
        </div>

        <div className='col-sm-6'>
          <Paragraph label={t('userDetail.lastName')} value={user.lastName} />
        </div>

        {!isEditable ? (
          <div className='col-sm-6'>
            <Paragraph label='Email' value={user.email || '-'} />
          </div>
        ) : (
          <>
            <div className='col-sm-6'>
              <Paragraph label='Email' value={user.email || '-'} />
            </div>

            <div className='col-sm-6 mt-2 ps-4'>
              <EmailActiveButton
                email={user.email}
                isEmailActive={user.isEmailActive}
                googleId={user.googleId}
                facebookId={user.facebookId}
              />
            </div>
          </>
        )}

        {!isEditable ? (
          <div className='col-sm-6'>
            <Paragraph
              label={t('userDetail.phone')}
              value={user.phone || '-'}
            />
          </div>
        ) : (
          <>
            <div className='col-sm-6'>
              <Paragraph
                label={t('userDetail.phone')}
                value={user.phone || '-'}
              />
            </div>

            {/* <div className='col-sm-6 mt-2'>
              <PhoneActiveButton
                phone={user.phone}
                isPhoneActive={user.isPhoneActive}
              />
            </div> */}
          </>
        )}

        <div className='col-sm-6'>
          <Paragraph label='ID Card' value={user.id_card || '-'} />
        </div>

        {isEditable && (
          <div className='col-12 d-flex justify-content-end'>
            <UserEditProfileItem user={user} />

            {!user.googleId && !user.facebookId && (
              <div className='ms-1'>
                <UserEditPasswordItem />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfileInfo
