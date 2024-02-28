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

  return (
    <div className='mt-4 position-relative'>
      <label
        className='position-absolute text-muted'
        style={{
          fontSize: '0.8rem',
          left: '12px',
          top: '-16px'
        }}
      >
        {label}
      </label>

      <div className='cus-rating form-control border-0 d-flex flex-row-reverse justify-content-end'>
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
              className={`fas fa-star me-1 ${
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
              className={`fas fa-star me-1 ${
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
              className={`fas fa-star me-1 ${
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
              className={`fas fa-star me-1 ${
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
              className={`fas fa-star me-1 ${
                value >= 1 ? 'link-golden' : 'text-muted'
              }`}
            ></i>
          </label>
        </span>
      </div>

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
