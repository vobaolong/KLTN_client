import { useState } from 'react'
import useToggle from '../../hooks/useToggle'
import useUpdateEffect from '../../hooks/useUpdateEffect'

const DropDownMenu = ({
  listItem = [],
  value = '',
  setValue = () => {},
  size = '',
  label = '',
  borderBtn = false,
  resetDefault = true
}) => {
  const [selectedItem, setSelectedItem] = useState(() =>
    resetDefault
      ? listItem.find((item) => item.value === value) || listItem[0]
      : { value: value, label: value }
  )
  const [showDropDownFlag, toggleShowDropDownFlag] = useToggle(false)
  const [iconClass, setIconClass] = useState('fas fa-angle-down')

  const handleSelect = (item) => {
    setValue(item.value)
    toggleShowDropDownFlag()
  }

  const toggleDropDown = () => {
    toggleShowDropDownFlag()
    setIconClass(showDropDownFlag ? 'fas fa-angle-down' : 'fas fa-angle-up')
  }

  useUpdateEffect(() => {
    const selected = resetDefault
      ? listItem.find((item) => item.value === value) || listItem[0]
      : { value: value, label: value }

    setSelectedItem(selected)
  }, [value])

  return (
    <div
      className={`cus-dropdown ${size === 'large' && 'w-100'} ${
        label && 'cus-dropdown--has-label'
      }`}
    >
      {label && <label className='cus-dropdown-label'>{label}</label>}
      <ul
        className={`list-group cus-dropdown-menu ${
          showDropDownFlag ? 'show' : ''
        }`}
        style={{
          maxHeight: '240px',
          overflow: 'auto'
        }}
      >
        {listItem?.map((item, index) => (
          <li
            key={index}
            className='list-group-item cus-dropdown-menu-item'
            onMouseDown={() => handleSelect(item)}
          >
            {item?.icon}
            <span className={item?.icon && 'res-hide'}>{item?.label}</span>
          </li>
        ))}
      </ul>

      <button
        type='button'
        className={`btn ${
          borderBtn ? 'cus-dropdown-btn--border' : 'cus-dropdown-btn'
        } ${size === 'large' && 'w-100'} ${size === 'small' && 'btn-sm'}`}
        onClick={toggleDropDown}
        onBlur={() => {
          toggleShowDropDownFlag(false)
          setIconClass('fas fa-angle-down')
        }}
      >
        <span
          className={`d-inline-flex justify-content-start align-items-center ${
            size === 'large' ? 'flex-grow-1 text-start' : ''
          }`}
        >
          {selectedItem?.icon && (
            <span className='me-2'>{selectedItem.icon}</span>
          )}
          <span className={`${selectedItem?.icon && 'res-hide'}`}>
            {selectedItem?.label}
          </span>
        </span>
        <i className={iconClass + ' ms-2'}></i>
      </button>
    </div>
  )
}

export default DropDownMenu
