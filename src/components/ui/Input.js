import { useState } from 'react'
import useToggle from '../../hooks/useToggle'
import { regexTest, numberTest } from '../../helper/test'

const Input = ({
  onChange = () => {},
  onValidate = () => {},
  type = 'text',
  value = '',
  label = '',
  validator = 'anything',
  isValid = true,
  isDisabled = false,
  accept = '*/*',
  feedback = 'Please provide a valid value',
  min = 0,
  required = false,
  placeholder = ''
}) => {
  const [tempValue, setTempValue] = useState('')
  const [showPasswordFlag, togglePasswordFlag] = useToggle(true)

  const onHandleChange = (e) => {
    if (type === 'file') {
      onChange(e.target.files[0])
      setTempValue(e.target.value)
    } else {
      onChange(e.target.value)
    }
  }

  const onHandleBlur = (e) => {
    if (type === 'file') {
      return
    } else if (type === 'number') {
      const validatorArray = validator.split('|')
      const test = validatorArray
        .map((v) => numberTest(v, e.target.value))
        .reduce((prev, curr) => prev || curr)
      onValidate(test)
    } else {
      const validatorArray = validator.split('|')
      const test = validatorArray
        .map((v) => regexTest(v, e.target.value))
        .reduce((prev, curr) => prev || curr)
      onValidate(test)
    }
  }

  return (
    <div className='cus-input-group'>
      <input
        type={
          type === 'password' ? (showPasswordFlag ? 'password' : 'text') : type
        }
        min={type === 'number' ? min : undefined}
        required={required}
        disabled={isDisabled}
        accept={accept}
        placeholder={placeholder}
        className={`cus-input-group-input form-control
				${isValid ? '' : 'is-invalid'}
				${type === 'password' ? 'cus-input-group-input--password' : ''}
				${type === 'file' ? 'cus-input-group-input--file' : ''}`}
        onChange={onHandleChange}
        onBlur={onHandleBlur}
        value={type === 'file' ? tempValue : value}
      />
      <label
        className={`cus-input-group-label ${
          type === 'file' ? 'cus-input-group-label--file' : ''
        }`}
      >
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <small className='invalid-feedback text-start'>{feedback}</small>
      {type === 'password' && (
        <i
          className={`show-hide-password-icon text-dark-emphasis fa-solid ${
            showPasswordFlag ? 'fa-eye' : ' fa-eye-slash'
          }`}
          onClick={togglePasswordFlag}
        ></i>
      )}
    </div>
  )
}

export default Input
