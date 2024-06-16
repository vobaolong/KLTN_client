/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { addUser } from '../../actions/user'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import { getUserLevel } from '../../apis/level'
import { countOrder } from '../../apis/order'
import { getUser } from '../../apis/user'

const IMG = process.env.REACT_APP_STATIC_URL

const UserInit = ({ user, actions }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { userId } = useParams()
  const [error, setError] = useState('')

  const init = async () => {
    setError('')
    setIsLoading(true)
    try {
      const data = await getUser(userId)
      if (data.error) {
        setError(data.error)
        setIsLoading(false)
      } else {
        const newUser = data.user
        try {
          const res = await getUserLevel(userId)
          newUser.level = res.level
        } catch {
          newUser.level = {}
        }

        try {
          const res1 = await countOrder('Delivered', userId, '')
          const res2 = await countOrder('Cancelled', userId, '')
          newUser.numberOfSuccessfulOrders = res1.count
          newUser.numberOfFailedOrders = res2.count
        } catch {
          newUser.numberOfSuccessfulOrders = 0
          newUser.numberOfFailedOrders = 0
        }

        actions(newUser)
        setIsLoading(false)
      }
    } catch (error) {
      setError('Server Error')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!user || user._id !== userId) init()
  }, [userId])

  return isLoading ? (
    <div className='cus-position-relative-loading'>
      <Loading size='small' />
    </div>
  ) : (
    <div
      type='button'
      className='your-store-card btn btn-outline-light cus-outline ripple'
    >
      <img
        loading='lazy'
        src={`${IMG + user.avatar}`}
        className='your-store-img'
        alt='avatar'
      />
      <span className='your-store-name unselect'>
        {user.firstName + ' ' + user.lastName}
        {error && <Error msg={error} />}
      </span>
    </div>
  )
}

function mapStateToProps(state) {
  return { user: state.user.user }
}

function mapDispatchToProps(dispatch) {
  return { actions: (user) => dispatch(addUser(user)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInit)
