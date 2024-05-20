import Paragraph from '../ui/Paragraph'
import EmailActiveButton from '../button/EmailActiveButton'
// import PhoneActiveButton from '../button/PhoneActiveButton'
import UserEditProfileItem from '../item/UserEditProfileItem'
import UserEditPasswordItem from '../item/UserEditPasswordItem'
import { useTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'

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
      <div className='row py-2 border rounded-2 bg-body'>
        <div className='col-12 border-bottom pb-2 fs-12 fw-normal'>
          {t('userDetail.profile')}
        </div>
        <div className='col-12 mt-2'>
          <Paragraph
            label={
              <span>
                <i className='fa-light fa-user me-2 text-secondary'></i>
                {t('userDetail.name')}
              </span>
            }
            colon
            value={
              user.firstName !== undefined && user.lastName !== undefined ? (
                `${user.firstName} ${user.lastName}`
              ) : (
                <Skeleton width={200} height={25} />
              )
            }
          />
        </div>

        {!isEditable ? (
          <div className='col-12'>
            <Paragraph
              label={
                <span>
                  <i className='fa-light fa-envelope me-2 text-secondary'></i>
                  Email
                </span>
              }
              value={
                user.email ? (
                  hideLastDigits(user.email, 3, 1) || '-'
                ) : (
                  <Skeleton width={200} height={25} />
                )
              }
            />
          </div>
        ) : (
          <>
            <div className='col-12 d-flex'>
              <Paragraph
                label={
                  <span>
                    <i className='fa-light fa-envelope me-2 text-secondary'></i>
                    Email
                  </span>
                }
                colon
                value={user.email ? hideLastDigits(user.email, 3, 1) : '-'}
              />
              <EmailActiveButton
                email={user.email}
                isEmailActive={user.isEmailActive}
                googleId={user.googleId}
              />
            </div>
          </>
        )}

        {!isEditable ? (
          <div className='col-12'>
            <Paragraph
              label={
                <span>
                  <i className='fa-light fa-phone me-2 text-secondary'></i>
                  {t('userDetail.phone')}
                </span>
              }
              colon
              value={user.phone ? user.phone : '-'}
            />
          </div>
        ) : (
          <>
            <div className='col-12'>
              <Paragraph
                label={
                  <span>
                    <i className='fa-light fa-phone	me-2 text-secondary'></i>
                    {t('userDetail.phone')}
                  </span>
                }
                colon
                value={user.phone ? hideLastDigits(user.phone, 8, 0) : '-'}
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

        <div className='col-12'>
          <Paragraph
            label={
              <span>
                <i className='fa-regular fa-credit-card	 me-2 text-secondary'></i>
                ID Card
              </span>
            }
            colon
            value={user.id_card ? hideLastDigits(user.id_card, 8, 0) : '-'}
          />
        </div>

        {isEditable && (
          <div className='col-12 d-flex justify-content-end'>
            <UserEditProfileItem user={user} />

            {!user.googleId && (
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
