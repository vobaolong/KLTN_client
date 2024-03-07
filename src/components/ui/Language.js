import vietnam from '../../assets/vietnam-flag-icon.svg'
import english from '../../assets/united-kingdom-flag-icon.svg'
import { locales } from '../../i18n/i18n'
import { useTranslation } from 'react-i18next'

const Language = () => {
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language]
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }
  return (
    <div className='text-white ms-2'>
      <div className='your-account'>
        <div className='d-flex align-items-center justify-content-center rounded-sm rounded px-4 py-2 bg-danger'>
          <img
            style={{ maxWidth: '30px' }}
            src={currentLanguage === 'English' ? english : vietnam}
            alt=''
          />
          <small
            className='lang'
            style={{ minWidth: 'fit-content', marginLeft: '2px' }}
          >
            {currentLanguage}
          </small>
          <i style={{ fontSize: '10px' }} class='fas fa-angle-down ms-1'></i>
        </div>
        <ul className='list-group your-account-options z-10'>
          <li
            className='list-group-item your-account-options-item ripple'
            onClick={() => changeLanguage('vi')}
          >
            Tiếng Việt
          </li>
          <li
            className='list-group-item your-account-options-item ripple'
            onClick={() => changeLanguage('en')}
          >
            English
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Language
