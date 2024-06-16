import { useSelector } from 'react-redux'
import AccountLayout from '../../components/layout/AccountLayout'
import UserLevelInfo from '../../components/info/UserLevelInfo'
import UserProfileInfo from '../../components/info/UserProfileInfo'
import Cover from '../../components/image/Cover'
import Avatar from '../../components/image/Avatar'
import MetaData from '../../components/layout/meta/MetaData'
import { useTranslation } from 'react-i18next'
import UserRankInfo from '../../components/info/UserRankInfo'

const ProfilePage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('breadcrumbs.profileInfo'), url: '/account/profile' }
  ]

  return (
    <AccountLayout user={user} paths={paths}>
      <MetaData title={`${t('userDetail.myAccount')} | Zenpii Việt Nam`} />
      <div className='res-mx--12-md'>
        <div className='position-relative bg-body rounded-2 p-2 box-shadow'>
          <Cover
            cover={user.cover}
            alt={user.firstName + ' ' + user.lastName}
            isEditable='user'
          />
          <div className='avatar-absolute avatar-absolute--store'>
            <Avatar
              avatar={user.avatar}
              name={
                user.firstName && user.lastName
                  ? user.firstName + ' ' + user.lastName
                  : undefined
              }
              alt={user.firstName + ' ' + user.lastName}
              borderName={true}
              isEditable='user'
            />
          </div>
          <div className='level-group-absolute res-hide bg-white w-50 h-100'>
            <UserLevelInfo user={user} />
          </div>
        </div>

        <div className='mt-2 d-none res-dis'>
          <UserLevelInfo user={user} />
        </div>

        <div className='mt-2'>
          <UserProfileInfo user={user} isEditable={true} />
        </div>

        <div className='mt-2'>
          <UserRankInfo user={user} />
        </div>
      </div>
    </AccountLayout>
  )
}

export default ProfilePage
