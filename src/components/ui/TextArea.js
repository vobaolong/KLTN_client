import { regexTest } from '../../helper/test'

const TextArea = ({
  onChange = () => {},
  onValidate = () => {},
  value = '',
  label = 'Enter something',
  validator = 'anything',
  isValid = true,
  isDisabled = false,
  feedback = 'Please provide a valid value',
  required = false,
  row = 8,
  placeholder = ''
}) => {
  const onHandleChange = (e) => {
    onChange(e.target.value)
  }

  const onHandleBlur = (e) => {
    const validatorArray = validator.split('|')
    const test = validatorArray
      .map((v) => regexTest(v, e.target.value))
      .reduce((prev, curr) => prev || curr)
    onValidate(test)
  }

  return (
    <div className='cus-input-group'>
      <textarea
        rows={row}
        required={required}
        disabled={isDisabled}
        className={`cus-input-group-input form-control ${
          !isValid ? 'is-invalid' : ''
        }`}
        placeholder={placeholder}
        onChange={onHandleChange}
        onBlur={onHandleBlur}
        value={value}
      ></textarea>
      <label className='cus-input-group-label'>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <span className='cus-input-group-bar'></span>
      <small className='invalid-feedback'>{feedback}</small>
    </div>
  )
}

export default TextArea
