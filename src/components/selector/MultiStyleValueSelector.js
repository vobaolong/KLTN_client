import { useState, useEffect } from 'react'
import { listActiveStyleValues } from '../../apis/style'
import Error from '../ui/Error'
import Loading from '../ui/Loading'
import AddValueStyleItem from '../item/AddValueStyleItem'

const MultiStyleValueSelector = ({
  defaultValue = '',
  categoryId = '',
  styleId = '',
  styleName = '',
  onSet
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [run, setRun] = useState('')

  const [values, setValues] = useState([])
  const [selectedValues, setSelectedValues] = useState([])

  const init = () => {
    setError('')
    setIsLoading(true)
    listActiveStyleValues(styleId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setValues(data.styleValues)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server error')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()

    const oldArray = selectedValues
    const newArray = []

    setSelectedValues(newArray)
    if (onSet) onSet(oldArray, newArray)
  }, [styleId, categoryId])

  useEffect(() => {
    init()
  }, [run])

  useEffect(() => {
    if (defaultValue) {
      const oldArray = selectedValues
      const newArray = defaultValue.filter((v) => v.styleId._id === styleId)

      setSelectedValues(newArray)
      if (onSet) onSet(oldArray, newArray)
    }
  }, [defaultValue])

  const handleChoose = (value) => {
    const oldArray = selectedValues
    const temp = oldArray.map((e) => e._id)

    if (temp.indexOf(value._id) === -1) {
      const newArray = [...oldArray, value]
      setSelectedValues(newArray)
      if (onSet) onSet(oldArray, newArray)
    }
  }

  const handleRemove = (index) => {
    const oldArray = selectedValues
    const newArray = [...oldArray.slice(0, index), ...oldArray.slice(index + 1)]

    setSelectedValues(newArray)
    if (onSet) onSet(oldArray, newArray)
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div className='position-relative mt-4'>
        <label
          className='position-absolute text-muted mb-2'
          style={{
            fontSize: '0.8rem',
            top: '-16px'
          }}
        >
          {styleName}
        </label>

        <div className=''>
          {selectedValues && selectedValues.length > 0 ? (
            selectedValues.map((value, index) => (
              <span
                key={index}
                className='mb-1 d-inline-flex align-items-center'
              >
                <span className='border p-1 rounded bg-value'>
                  {value.name}
                </span>
                <button
                  type='button'
                  className='btn btn-outline-danger btn-sm ripple me-4'
                  onClick={() => handleRemove(index)}
                >
                  <i className='fas fa-times-circle'></i>
                </button>
              </span>
            ))
          ) : (
            <span className='text-danger'>No values chosen</span>
          )}

          <div
            className='mt-2'
            style={{
              maxHeight: '200px',
              overflow: 'auto'
            }}
          >
            <div className='list-group'>
              {values.map((value, index) => (
                <button
                  key={index}
                  type='button'
                  className={`list-group-item ripple list-group-item-action ${
                    selectedValues &&
                    selectedValues.map((v) => v._id).indexOf(value._id) !==
                      -1 &&
                    'active'
                  }`}
                  onClick={() => handleChoose(value)}
                >
                  {value.name}
                </button>
              ))}

              <span className='list-group-item'>
                <AddValueStyleItem
                  styleId={styleId}
                  styleName={styleName}
                  onRun={() => setRun(!run)}
                  isFullWidth={true}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiStyleValueSelector
