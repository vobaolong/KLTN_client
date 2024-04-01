import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

const IMG = process.env.REACT_APP_STATIC_URL

const InputFile = ({
  onChange = () => {},
  onValidate = () => {},
  size = 'avatar',
  label = 'File',
  isValid = false,
  isDisabled = false,
  accept = '*/*',
  feedback = 'Please provide a valid file',
  defaultSrc = '',
  noRadius = false,
  required = false
}) => {
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (defaultSrc) setSrc(IMG + defaultSrc)
  }, [defaultSrc])

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSrc(e.target.result)
      }
      reader.readAsDataURL(file)
      onChange(file)
    } else {
      onValidate(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleReset = (e) => {
    e.stopPropagation()
    setSrc('')
    onChange('')
  }

  return (
    <div
      className={`cus-input-group cus-input-group--file ${
        size === 'avatar' ? 'cus-avatar-wrap' : ''
      }`}
    >
      <label className='cus-input-group-label cus-input-group-label--file text-muted'>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <div
        className={`${size === 'avatar' ? 'cus-avatar-box' : 'cus-cover-box '}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className={`${size === 'avatar' ? 'cus-avatar' : 'cus-cover'}`}>
          {src && (
            <img
              loading='lazy'
              type='file'
              src={src}
              className={size === 'avatar' ? 'cus-avatar-img' : 'cus-cover-img'}
              style={{ borderRadius: `${noRadius ? '0' : '0.375rem'}` }}
              alt=''
            />
          )}

          {src && (
            <label
              className={`${
                size === 'avatar'
                  ? 'cus-avatar-icon cus-avatar-icon--rm'
                  : 'cus-cover-icon cus-cover-icon--rm'
              }`}
              onClick={(e) => handleReset(e)}
            >
              <i className='fas fa-times'></i>
            </label>
          )}

          {!src && (
            <label
              className={`${
                size === 'avatar'
                  ? 'cus-avatar-label rounded-2'
                  : 'cus-cover-label rounded-2'
              }`}
              style={{ borderRadius: `${noRadius ? '0' : '0.375rem'}` }}
            >
              {isDragActive ? (
                <small>Drop the files here...</small>
              ) : (
                <>
                  <small>
                    Drag 'n' drop some files here, or click to select files
                  </small>
                  <i className='fa-regular fa-images'></i>
                  <small
                    className='invalid-feedback ms-2 mt-0'
                    style={{ width: 'unset' }}
                  >
                    {feedback}
                  </small>
                </>
              )}
            </label>
          )}
        </div>
      </div>
    </div>
  )
}

export default InputFile
