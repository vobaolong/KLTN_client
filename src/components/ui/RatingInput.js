import { useTranslation } from 'react-i18next'

const RatingInput = ({
  label = 'Rating',
  value = 0,
  isValid = true,
  feedback = 'Please provide a valid value',
  onChange = () => {}
}) => {
  const handleChange = (value) => {
    onChange(value)
  }
  const { t } = useTranslation()

  return (
    <div className='mt-3 d-flex gap-2 align-items-center'>
      <span style={{ fontSize: '0.9rem' }} className='text-dark-emphasis'>
        {label}
      </span>
      <div className='cus-rating border-0 d-flex flex-row-reverse justify-content-center'>
        <span>
          <input
            className='visually-hidden'
            type='radio'
            defaultChecked={value === 5}
            name='rating'
            id='str5'
            value='5'
            onClick={() => handleChange(5)}
          />

          <label htmlFor='str5'>
            <i
              className={`fa-solid fa-star me-1 ${
                value >= 5 ? 'link-golden' : 'text-muted'
              }`}
            ></i>
          </label>
        </span>

        <span>
          <input
            className='visually-hidden'
            type='radio'
            defaultChecked={value === 4}
            name='rating'
            id='str4'
            value='4'
            onClick={() => handleChange(4)}
          />

          <label htmlFor='str4'>
            <i
              className={`fa-solid fa-star me-1 ${
                value >= 4 ? 'link-golden' : 'text-muted'
              }`}
            ></i>
          </label>
        </span>

        <span>
          <input
            className='visually-hidden'
            type='radio'
            defaultChecked={value === 3}
            name='rating'
            id='str3'
            value='3'
            onClick={() => handleChange(3)}
          />
          <label htmlFor='str3'>
            <i
              className={`fa-solid fa-star me-1 ${
                value >= 3 ? 'link-golden' : 'text-muted'
              }`}
            ></i>
          </label>
        </span>

        <span>
          <input
            className='visually-hidden'
            type='radio'
            defaultChecked={value === 2}
            name='rating'
            id='str2'
            value='2'
            onClick={() => handleChange(2)}
          />
          <label htmlFor='str2'>
            <i
              className={`fa-solid fa-star me-1 ${
                value >= 2 ? 'link-golden' : 'text-muted'
              }`}
            ></i>
          </label>
        </span>

        <span>
          <input
            className='visually-hidden'
            type='radio'
            defaultChecked={value === 1}
            name='rating'
            id='str1'
            value='1'
            onClick={() => handleChange(1)}
          />
          <label htmlFor='str1'>
            <i
              className={`fa-solid fa-star me-1 ${
                value >= 1 ? 'link-golden' : 'text-muted'
              }`}
            ></i>
          </label>
        </span>
      </div>
      <small className='text-secondary'>
        {(value === 5 && t('reviewDetail.amazing')) ||
          (value === 4 && t('reviewDetail.good')) ||
          (value === 3 && t('reviewDetail.fair')) ||
          (value === 2 && t('reviewDetail.poor')) ||
          (value === 1 && t('reviewDetail.terrible'))}
      </small>
      {!isValid && (
        <small
          className='text-danger'
          role='alert'
          style={{ marginTop: '-20px', display: 'block' }}
        >
          {feedback}
        </small>
      )}
    </div>
  )
}

export default RatingInput
