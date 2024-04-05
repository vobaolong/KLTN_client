/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { listActiveVariantValues } from '../../apis/variant'
import Error from '../ui/Error'
import Loading from '../ui/Loading'
import AddValueVariantItem from '../item/AddValueVariantItem'
import { useTranslation } from 'react-i18next'

const MultiVariantValueSelector = ({
  defaultValue = '',
  categoryId = '',
  variantId = '',
  variantName = '',
  onSet
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [run, setRun] = useState('')
  const [values, setValues] = useState([])
  const [selectedValues, setSelectedValues] = useState([])
  const { t } = useTranslation()

  const init = () => {
    setError('')
    setIsLoading(true)
    listActiveVariantValues(variantId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setValues(data.variantValues)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()

    const oldArray = selectedValues
    const newArray = []

    setSelectedValues(newArray)
    if (onSet) onSet(oldArray, newArray)
  }, [variantId, categoryId])

  useEffect(() => {
    init()
  }, [run])

  useEffect(() => {
    if (defaultValue) {
      const oldArray = selectedValues
      const newArray = defaultValue.filter((v) => v.variantId._id === variantId)

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
            top: '-18px'
          }}
        >
          {variantName}
        </label>

        <div className=''>
          {selectedValues && selectedValues.length > 0 ? (
            selectedValues.map((value, index) => (
              <span
                key={index}
                className='mb-1 d-inline-flex align-items-center'
              >
                <span className='align-items-center bg-body border border-dark-subtle me-3 p-1 rounded-1'>
                  {value.name}
                  <button
                    type='button'
                    className='btn btn-outline-danger btn-sm ripple rounded-1 ms-2'
                    onClick={() => handleRemove(index)}
                  >
                    <i className='fa-solid fa-xmark'></i>
                  </button>
                </span>
              </span>
            ))
          ) : (
            <span className='text-danger'>
              {t('productDetail.noValuesSelected')}
            </span>
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
                <AddValueVariantItem
                  variantId={variantId}
                  variantName={variantName}
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

export default MultiVariantValueSelector
