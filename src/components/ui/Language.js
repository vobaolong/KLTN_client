/* eslint-disable react-hooks/exhaustive-deps */
import vietnam from '../../assets/vietnam-flag-icon.svg'
import english from '../../assets/united-kingdom-flag-icon.svg'
import { locales } from '../../i18n/i18n'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

const Language = ({ vertical = true }) => {
  const { i18n } = useTranslation()
  const [activeLang, setActiveLang] = useState(i18n.language)

  const currentLanguage = locales[i18n.language]
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
    setActiveLang(lang)
  }

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      changeLanguage(savedLanguage)
    }
  }, [i18n.language])

  return (
    <>
      {vertical ? (
        <div className='ms-2 inherit'>
          <div className='your-account'>
            <div className='d-flex align-items-center justify-content-center rounded-1 p-2 inherit lang'>
              <img
                loading='lazy'
                style={{ maxWidth: '30px', width: '100%' }}
                src={currentLanguage === 'English' ? english : vietnam}
                alt=''
              />
              <i
                style={{ fontSize: '10px' }}
                className='fa-solid fa-angle-down ms-1'
              ></i>
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
      ) : (
        <div className='d-flex align-items-center justify-content-between mt-2 gap-32'>
          <button
            className={`btn rounded-1 btn-with-img ${
              activeLang === 'en' ? 'btn-value' : 'btn-outline-value'
            }`}
            onClick={() => changeLanguage('en')}
          >
            <img
              style={{ marginRight: '3px', maxWidth: '30px', width: '100%' }}
              src={english}
              alt='English flag'
            />
            English
          </button>
          <button
            className={`btn rounded-1 btn-with-img ${
              activeLang === 'vi' ? 'btn-value' : 'btn-outline-value'
            }`}
            onClick={() => changeLanguage('vi')}
          >
            <img
              style={{ marginRight: '3px', maxWidth: '30px', width: '100%' }}
              src={vietnam}
              alt='Vietnamese flag'
            />
            Tiếng Việt
          </button>
        </div>
      )}
    </>
  )
}

export default Language
