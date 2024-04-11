import { useSelector } from 'react-redux'
import UserLayout from '../../components/layout/UserLayout'

const UserHomePage = () => {
  const user = useSelector((state) => state.user.user)
  return (
    <UserLayout user={user}>
      {/* <div className='text-center my-5'>
        <h4 className='text-uppercase'>
          Hello
          {user && user.firstName && user.lastName && (
            <span>
              , i'm {user.firstName} {user.lastName}
            </span>
          )}
          !
        </h4>
        <p>...</p>
      </div> */}
    </UserLayout>
  )
}

export default UserHomePage
