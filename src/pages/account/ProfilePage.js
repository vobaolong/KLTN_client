import { useSelector } from 'react-redux'
import AccountLayout from '../../components/layout/AccountLayout'
import UserLevelInfo from '../../components/info/UserLevelInfo'
import UserProfileInfo from '../../components/info/UserProfileInfo'
import Cover from '../../components/image/Cover'
import Avatar from '../../components/image/Avatar'

const ProfilePage = (props) => {
  const user = useSelector((state) => state.account.user)
  return (
    <AccountLayout user={user}>
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
              name={user.firstName + ' ' + user.lastName}
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
          <UserLevelInfo user={user} border={true} />
        </div>

        <div className='mt-3'>
          <UserProfileInfo user={user} isEditable={true} />
        </div>
      </div>
    </AccountLayout>
  )
}

export default ProfilePage
