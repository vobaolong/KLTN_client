import { useSelector } from 'react-redux'
import UserLayout from '../../components/layout/UserLayout'
import UserProfileInfo from '../../components/info/UserProfileInfo'
import UserLevelInfo from '../../components/info/UserLevelInfo'

const UserAboutPage = () => {
  const user = useSelector((state) => state.user.user)
  return (
    <UserLayout user={user}>
      <div style={{ margin: '0 auto' }}>
        <div className='mb-1 d-none res-dis'>
          <UserLevelInfo user={user} />
        </div>
        <div className='mb-1'>
          <UserProfileInfo user={user} />
        </div>
      </div>
    </UserLayout>
  )
}

export default UserAboutPage
