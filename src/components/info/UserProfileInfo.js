import Paragraph from '../ui/Paragraph'
import PhoneActiveButton from '../button/PhoneActiveButton'
import EmailActiveButton from '../button/EmailActiveButton'
import UserEditProfileItem from '../item/UserEditProfileItem'
import UserEditPasswordItem from '../item/UserEditPasswordItem'
import { useTranslation } from 'react-i18next'

const UserProfileInfo = ({ user = {}, isEditable = false }) => {
  const { t } = useTranslation()
  const hideLastDigits = (str, numDigitsToHide, position) => {
    if (str && str.length > numDigitsToHide) {
      const hiddenPart = '*'.repeat(numDigitsToHide)
      return (
        str.slice(0, position) +
        hiddenPart +
        str.slice(position + numDigitsToHide)
      )
    }
    return str
  }
  return (
    <div className='container-fluid'>
      <div className='row py-2 border rounded-1'>
        <div className='col-12'>
          <Paragraph
            label={t('userDetail.name')}
            colon
            value={`${user.firstName} ${user.lastName}`}
          />
        </div>

        {!isEditable ? (
          <div className='col-sm-12'>
            <Paragraph
              label='Email'
              value={hideLastDigits(user.email, 3, 1) || '-'}
            />
          </div>
        ) : (
          <>
            <div className='col-sm-12 d-flex'>
              <Paragraph
                label='Email'
                colon
                value={hideLastDigits(user.email, 3, 1) || '-'}
              />
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
              colon
              value={user.phone || '-'}
            />
          </div>
        ) : (
          <>
            <div className='col-sm-6'>
              <Paragraph
                label={t('userDetail.phone')}
                colon
                value={hideLastDigits(user.phone, 8, 0) || '-'}
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
          <Paragraph
            label='ID Card'
            colon
            value={hideLastDigits(user.id_card, 8, 0) || '-'}
          />
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
