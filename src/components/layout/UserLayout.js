import MainLayout from './MainLayout'
import UserNav from './menu/UserNav'
import Cover from '../image/Cover'
import Avatar from '../image/Avatar'
import UserLevelInfo from '../info/UserLevelInfo'

const UserLayout = ({ user = {}, children = null }) => (
  <MainLayout>
    <div className='user-layout' style={{ margin: '0 auto' }}>
      <div className='px-2 position-relative shadow'>
        <Cover cover={user.cover} alt={user.firstName + ' ' + user.lastName} />
        <div className='avatar-absolute avatar-absolute--store'>
          <Avatar
            avatar={user.avatar}
            name={user && user.firstName + ' ' + user.lastName}
            borderName={true}
            alt={user.firstName + ' ' + user.lastName}
          />
        </div>
        <div className='level-group-absolute level-group-absolute--small res-hide'>
          <UserLevelInfo user={user} />
        </div>
      </div>
    </div>

    <UserNav user={user} />

    <div className='user-page-main mt-3'>{children}</div>
  </MainLayout>
)

export default UserLayout
