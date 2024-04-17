import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import { useTranslation } from 'react-i18next'

const ColorPickerInput = ({ color, onChange, label, required = true }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const { t } = useTranslation()
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  const handleChange = (selectedColor) => {
    onChange(selectedColor.hex)
  }

  return (
    <div className='mt-3'>
      <small className='text-secondary ms-1'>
        {label} {required && <small className='text-danger'>*</small>}
      </small>
      <div className='d-flex align-items-center ms-2'>
        <span className='me-2'>{t('pickColor')} </span>
        <div style={{ display: 'inline-block' }} onClick={handleClick}>
          <div
            className='border pointer'
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              background: color
            }}
          />
        </div>
        {displayColorPicker && (
          <div style={{ position: 'absolute', zIndex: '2', right: '0' }}>
            <div
              style={{
                position: 'fixed',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0'
              }}
              onClick={handleClose}
            />
            <ChromePicker color={color} onChange={handleChange} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ColorPickerInput
