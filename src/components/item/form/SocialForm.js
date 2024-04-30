import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { authSocial, setToken } from '../../../apis/auth'
import { GoogleLogin } from 'react-google-login'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
// import { GoogleLogin } from '@react-oauth/google'

const SocialForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()
  const onSuccess = (res) => {
    if (!res.profileObj && !res.accessToken) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    const data = res.profileObj || res
    const user = {
      firstName: data.givenName || data.name.split(' ')[0],
      lastName:
        (data.familyName ? data.familyName : data.givenName) ||
        data.name.split(' ')[1],
      email: data.email
    }

    if (data.googleId) user.googleId = data.googleId

    authSocial(user)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setIsLoading(false)
        } else {
          const { accessToken, refreshToken, _id, role } = data
          setToken({ accessToken, refreshToken, _id, role }, () => {
            history.go(0)
          })
        }
      })
      .catch((error) => {
        console.log('Server error!')
        setIsLoading(false)
      })
  }

  const onFailure = (res) => {
    setError(res.details)
    setIsLoading(false)
  }

  const onRequest = () => {
    setIsLoading(true)
  }

  return (
    <>
      {isLoading && <Loading />}
      {error && (
        <div className='col-12'>
          <Error msg={error} />
        </div>
      )}

      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        onRequest={onRequest}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <button
            type='button'
            className='btn btn--with-img btn-outline-primary ripple fw-bold'
            onClick={renderProps.onClick}
          >
            <img
              loading='lazy'
              className='social-img me-2 rounded-circle'
              src='https://img.icons8.com/color/48/000000/google-logo.png'
              alt=''
            />
            Continue with Google
          </button>
        )}
      />
    </>
  )
}

export default SocialForm
