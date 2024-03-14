import vietnam from '../../assets/vietnam-flag-icon.svg'
import english from '../../assets/united-kingdom-flag-icon.svg'
import { locales } from '../../i18n/i18n'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const Language = () => {
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language]
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
  }
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      changeLanguage(savedLanguage)
    }
  }, [])
  return (
    <div className='text-white ms-2'>
      <div className='your-account'>
        <div className='d-flex align-items-center justify-content-center rounded-1 p-2 text-white lang'>
          <img
            style={{ maxWidth: '30px', width: '100%' }}
            src={currentLanguage === 'English' ? english : vietnam}
            alt=''
          />
          {/* <small
            className='lang'
            style={{ minWidth: 'fit-content', marginLeft: '3px' }}
          >
            {currentLanguage}
          </small> */}
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
