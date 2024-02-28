import { useState, useEffect } from 'react'

const ValueSelectorItem = ({
  listValues = [],
  isEditable = true,
  onSet,
  defaultValue = ''
}) => {
  const [values, setValues] = useState(listValues)
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  useEffect(() => {
    setValues(listValues)
    const oldValue = selectedValue
    const newValue = {}
    setSelectedValue(newValue)
    if (onSet) onSet(oldValue, newValue)
  }, [listValues])

  useEffect(() => {
    if (defaultValue)
      setSelectedValue(() => {
        const temp = listValues.map((value) => value._id)
        return defaultValue.find((value) => temp.indexOf(value._id) != -1)
      })
  }, [defaultValue])

  const handleChoose = (value) => {
    const oldValue = selectedValue
    const newValue = value
    setSelectedValue(newValue)
    if (onSet) onSet(oldValue, newValue)
  }

  return (
    <div className='position-relative mt-3 mb-1'>
      <label
        className='position-absolute text-primary'
        style={{
          fontSize: '0.8rem',
          top: '-16px',
          justifyContent: 'center',
          left: '2px',
          width: 'max-content'
        }}
      >
        {values[0].styleId.name}
      </label>

      <div className=''>
        {values.map((value, index) => (
          <button
            key={index}
            type='button'
            className={`btn btn-sm ms-2 mt-2 ${isEditable && 'ripple'} ${
              selectedValue._id === value._id
                ? 'btn-primary'
                : 'btn-outline-primary'
            } cus-btn-style`}
            disabled={!isEditable}
            onClick={() => handleChoose(value)}
          >
            <span>{value.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ValueSelectorItem
