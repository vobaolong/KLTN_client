import Modal from '../ui/Modal'
import SignupForm from './form/SignupForm'
import SigninForm from './form/SigninForm'
import useToggle from '../../hooks/useToggle'
import { useTranslation } from 'react-i18next'

const SigninButton = ({ className = '', title = '' }) => {
  const { t } = useTranslation()
  const [signinFlag, toggleSigninFlag] = useToggle(true)

  return (
    <div className='sign-in-item-wrap position-relative'>
      <button
        type='button'
        className={`sign-in-item btn rounded-1 btn-outline-light cus-outline cus-tooltip ripple ${className}`}
        data-bs-toggle='modal'
        data-bs-target='#signin-signup-form'
        onClick={() => toggleSigninFlag(true)}
      >
        {title}
      </button>

      <Modal
        id='signin-signup-form'
        hasCloseBtn={false}
        subTitle={
          !signinFlag ? t('signInForm.signUp') : t('signInForm.comeBack')
        }
      >
        {signinFlag ? (
          <SigninForm onSwap={toggleSigninFlag} />
        ) : (
          <SignupForm onSwap={toggleSigninFlag} />
        )}
      </Modal>
    </div>
  )
}

export default SigninButton
