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
            label={
              <span>
                <i class='fa-solid fa-user	 me-2 text-secondary'></i>
                {t('userDetail.name')}
              </span>
            }
            colon
            value={`${user.firstName} ${user.lastName}`}
          />
        </div>

        {!isEditable ? (
          <div className='col-sm-12'>
            <Paragraph
              label={
                <span>
                  <i class='fa-solid fa-envelope	 me-2 text-secondary'></i>
                  Email
                </span>
              }
              value={hideLastDigits(user.email, 3, 1) || '-'}
            />
          </div>
        ) : (
          <>
            <div className='col-sm-12 d-flex'>
              <Paragraph
                label={
                  <span>
                    <i class='fa-solid fa-envelope me-2 text-secondary'></i>
                    Email
                  </span>
                }
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
              label={
                <span>
                  <i class='fa-solid fa-phone	 me-2 text-secondary'></i>
                  {t('userDetail.phone')}
                </span>
              }
              colon
              value={user.phone || '-'}
            />
          </div>
        ) : (
          <>
            <div className='col-sm-6'>
              <Paragraph
                label={
                  <span>
                    <i class='fa-solid fa-phone	 me-2 text-secondary'></i>
                    {t('userDetail.phone')}
                  </span>
                }
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
            label={
              <span>
                <i class='fa-regular fa-credit-card	 me-2 text-secondary'></i>
                ID Card
              </span>
            }
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
