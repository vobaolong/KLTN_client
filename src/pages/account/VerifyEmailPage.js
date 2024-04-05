/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { verifyEmail } from '../../apis/auth'
import Loading from '../../components/ui/Loading'
import Error from '../../components/ui/Error'

const VerifyEmailPage = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { emailCode } = useParams()

  const init = () => {
    setError('')
    setIsLoading(true)
    verifyEmail(emailCode)
      .then((data) => {
        if (data.error) setError('Verify email failed')
        else setSuccess(data.success)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className='d-flex m-5 w-100 h-100 position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {success && (
        <Redirect
          to={{
            pathname: '/account/profile',
            state: { from: props.location }
          }}
        />
      )}
    </div>
  )
}

export default VerifyEmailPage
