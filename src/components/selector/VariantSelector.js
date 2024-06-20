/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { listVariantByCategory } from '../../apis/variant'
import Loading from '../ui/Loading'
import MultiVariantValueSelector from '../selector/MultiVariantValueSelector'
import { toast } from 'react-toastify'
import Error from '../ui/Error'
import { useTranslation } from 'react-i18next'

const VariantSelector = ({ defaultValue = '', categoryId = '', onSet }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [variants, setVariants] = useState([])
  const [selectedVariantValues, setSelectedVariantValues] = useState([])

  const init = () => {
    setIsLoading(true)
    setError('')
    listVariantByCategory(categoryId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setVariants(data.variants)
          if (data.variants.length <= 0)
            toast.success(t('toastSuccess.variant.none'))
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (categoryId) init()
    else setVariants([])

    setSelectedVariantValues([])
    if (onSet) onSet([])
  }, [categoryId])

  useEffect(() => {
    if (defaultValue) {
      setSelectedVariantValues(defaultValue)
      if (onSet) onSet(defaultValue)
    }
  }, [defaultValue])

  const handleSet = (olds, news) => {
    let newArray = selectedVariantValues
    let newValues = []
    let flag = true

    if (olds.length > news.length) {
      flag = false
      let temps = news.map((n) => n._id)
      olds.forEach((o) => {
        if (temps.indexOf(o._id) === -1) newValues.push(o)
      })
    } else {
      let temps = olds.map((o) => o._id)
      news.forEach((n) => {
        if (temps.indexOf(n._id) === -1) newValues.push(n)
      })
    }

    if (flag) {
      let temps = newArray.map((na) => na._id)
      newValues.forEach((nv) => {
        if (temps.indexOf(nv._id) === -1) newArray.push(nv)
      })
    } else {
      let temps = newArray.map((na) => na._id)
      newValues.forEach((nv) => {
        if (temps.indexOf(nv._id) !== -1)
          newArray.splice(temps.indexOf(nv._id), 1)
      })
    }

    setSelectedVariantValues(newArray)
    if (onSet) onSet(newArray)
  }

  return (
    <div className='row position-relative'>
      {isLoading && <Loading />}
      {error && (
        <span className='ms-2'>
          <Error msg={error} />
        </span>
      )}
      {variants.map((variant, index) => (
        <div className='col mt-2' key={index}>
          <MultiVariantValueSelector
            defaultValue={defaultValue}
            categoryId={categoryId}
            variantId={variant._id}
            variantName={variant.name}
            onSet={(olds, news) => handleSet(olds, news)}
          />
        </div>
      ))}
    </div>
  )
}

export default VariantSelector
