/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from 'react'
import { getToken } from '../../apis/auth'
import {
  listVariantValues,
  listActiveVariantValues,
  deleteVariantValue,
  restoreVariantValue
} from '../../apis/variant'
import DeletedLabel from '../label/DeletedLabel'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import Modal from '../ui/Modal'
import AddValueVariantItem from '../item/AddValueVariantItem'
import AdminEditVariantValueForm from '../item/form/AdminEditVariantValueForm'
import ActiveLabel from '../label/ActiveLabel'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const VariantValuesTable = ({
  heading = true,
  variantId = '',
  isActive = false
}) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false)
  const [run, setRun] = useState(false)
  const [deletedVariantValue, setDeletedVariantValue] = useState({})
  const [restoredVariantValue, setRestoredVariantValue] = useState({})
  const [editedVariantValue, setEditedVariantValue] = useState({})
  const [variantValues, setVariantValues] = useState([])
  const [variant, setVariant] = useState({})
  const { _id, accessToken } = getToken()

  const init = () => {
    setIsLoading(true)
    if (!isActive) {
      listVariantValues(_id, accessToken, variantId)
        .then((data) => {
          if (data.error) toast.error(data.error)
          else {
            setVariantValues(data.variantValues)
            setVariant(data.variant)
          }
          setIsLoading(false)
        })
        .catch((error) => {
          toast.error(error)
          setIsLoading(false)
        })
    } else {
      listActiveVariantValues(variantId)
        .then((data) => {
          if (data.error) toast.error(data.error)
          else {
            setVariantValues(data.variantValues)
            setVariant(data.variant)
          }
          setIsLoading(false)
        })
        .catch((error) => {
          toast.error(error)
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    init()
  }, [variantId, run])

  const handleDelete = (variantValue) => {
    setDeletedVariantValue(variantValue)
    setIsConfirming(true)
  }

  const handleRestore = (variantValue) => {
    setRestoredVariantValue(variantValue)
    setIsConfirmingRestore(true)
  }

  const onSubmitDelete = () => {
    setIsLoading(true)
    deleteVariantValue(_id, accessToken, deletedVariantValue._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(data.success)
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Some thing went wrong')
        setIsLoading(false)
      })
  }

  console.log(variant)
  const onSubmitRestore = () => {
    setIsLoading(true)
    restoreVariantValue(_id, accessToken, restoredVariantValue._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(data.success)
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.deleteValue')}
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirming(false)}
        />
      )}
      {isConfirmingRestore && (
        <ConfirmDialog
          title={t('dialog.restoreValue')}
          onSubmit={onSubmitRestore}
          onClose={() => setIsConfirmingRestore(false)}
        />
      )}

      {heading && (
        <h5 className='text-center text-uppercase'>
          Values of <span className='text-primary'>{variant?.name}</span>
        </h5>
      )}

      {isLoading && <Loading />}

      <div className='d-flex justify-content-between align-items-end'>
        <AddValueVariantItem
          variantId={variantId}
          variantName={variant?.name}
          onRun={() => setRun(!run)}
        />
        <span className='text-nowrap res-hide'>
          {variantValues.length || 0} {t('result')}
        </span>
      </div>

      <div className='table-scroll my-2'>
        <table className='table align-middle table-hover table-sm text-center'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope='col'>Name</th>
              {!isActive && (
                <Fragment>
                  <th scope='col'>Status</th>
                  <th scope='col'></th>
                </Fragment>
              )}
            </tr>
          </thead>
          <tbody>
            {variantValues.map((value, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{value.name}</td>
                {!isActive && (
                  <Fragment>
                    <td>
                      {value.isDeleted ? (
                        <span>
                          <DeletedLabel />
                        </span>
                      ) : (
                        <span>
                          <ActiveLabel />
                        </span>
                      )}
                    </td>
                    <td className='text-nowrap'>
                      <button
                        type='button'
                        className='btn btn-primary ripple me-2 rounded-1'
                        data-bs-toggle='modal'
                        data-bs-target='#edit-variant-value-form'
                        onClick={() => setEditedVariantValue(value)}
                      >
                        <i className='fa-solid fa-pen'></i>
                        <span className='ms-2 res-hide'>
                          {t('button.edit')}
                        </span>
                      </button>

                      {!value.isDeleted ? (
                        <button
                          type='button'
                          className='btn btn-outline-danger ripple rounded-1'
                          onClick={() => handleDelete(value)}
                        >
                          <i className='fa-solid fa-trash-alt'></i>
                          <span className='ms-2 res-hide'>
                            {t('button.delete')}
                          </span>
                        </button>
                      ) : (
                        <button
                          type='button'
                          className='btn btn-outline-success ripple'
                          onClick={() => handleRestore(value)}
                        >
                          <i className='fa-solid fa-trash-can-arrow-up'></i>
                          <span className='ms-2 res-hide'>
                            {t('button.restore')}
                          </span>
                        </button>
                      )}
                    </td>
                  </Fragment>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!isActive && (
        <Modal
          id='edit-variant-value-form'
          hasCloseBtn={false}
          title='Edit value'
        >
          <AdminEditVariantValueForm
            oldVariantValue={editedVariantValue}
            onRun={() => setRun(!run)}
          />
        </Modal>
      )}
    </div>
  )
}

export default VariantValuesTable
