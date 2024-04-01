/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from 'react'
import { getToken } from '../../apis/auth'
import {
  listStyleValues,
  listActiveStyleValues,
  deleteStyleValue,
  restoreStyleValue
} from '../../apis/style'
import DeletedLabel from '../label/DeletedLabel'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import Modal from '../ui/Modal'
import AddValueStyleItem from '../item/AddValueStyleItem'
import AdminEditStyleValueForm from '../item/form/AdminEditStyleValueForm'
import ActiveLabel from '../label/ActiveLabel'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const StyleValuesTable = ({
  heading = true,
  styleId = '',
  isActive = false
}) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false)
  const [run, setRun] = useState(false)
  const [deletedStyleValue, setDeletedStyleValue] = useState({})
  const [restoredStyleValue, setRestoredStyleValue] = useState({})
  const [editedStyleValue, setEditedStyleValue] = useState({})
  const [styleValues, setStyleValues] = useState([])
  const [style, setStyle] = useState({})
  const { _id, accessToken } = getToken()

  const init = () => {
    setIsLoading(true)
    if (!isActive) {
      listStyleValues(_id, accessToken, styleId)
        .then((data) => {
          if (data.error) toast.error(data.error)
          else {
            setStyleValues(data.styleValues)
            setStyle(data.style)
          }
          setIsLoading(false)
        })
        .catch((error) => {
          toast.error(error)
          setIsLoading(false)
        })
    } else {
      listActiveStyleValues(styleId)
        .then((data) => {
          if (data.error) toast.error(data.error)
          else {
            setStyleValues(data.styleValues)
            setStyle(data.style)
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
  }, [styleId, run])

  const handleDelete = (styleValue) => {
    setDeletedStyleValue(styleValue)
    setIsConfirming(true)
  }

  const handleRestore = (styleValue) => {
    setRestoredStyleValue(styleValue)
    setIsConfirmingRestore(true)
  }

  const onSubmitDelete = () => {
    setIsLoading(true)
    deleteStyleValue(_id, accessToken, deletedStyleValue._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(data.success)
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  const onSubmitRestore = () => {
    setIsLoading(true)
    restoreStyleValue(_id, accessToken, restoredStyleValue._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(data.success)
          setRun(!run)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Delete style value'
          color='danger'
          onSubmit={onSubmitDelete}
          onClose={() => setIsConfirming(false)}
        />
      )}
      {isConfirmingRestore && (
        <ConfirmDialog
          title='Restore style value'
          onSubmit={onSubmitRestore}
          onClose={() => setIsConfirmingRestore(false)}
        />
      )}

      {heading && (
        <h4 className='text-center text-uppercase'>
          Values of <span className='text-primary'>{style.name}</span>
        </h4>
      )}

      {isLoading && <Loading />}

      <div className='d-flex justify-content-between align-items-end'>
        <AddValueStyleItem
          styleId={styleId}
          styleName={style.name}
          onRun={() => setRun(!run)}
        />
        <span className='text-nowrap res-hide'>
          {styleValues.length || 0} {t('result')}
        </span>
      </div>

      <div className='table-scroll my-2'>
        <table className='table align-middle table-hover table-striped table-sm text-center'>
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
            {styleValues.map((value, index) => (
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
                        data-bs-target='#edit-style-value-form'
                        onClick={() => setEditedStyleValue(value)}
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
                          <i className='fas fa-trash-alt'></i>
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
          id='edit-style-value-form'
          hasCloseBtn={false}
          title='Edit value'
        >
          <AdminEditStyleValueForm
            oldStyleValue={editedStyleValue}
            onRun={() => setRun(!run)}
          />
        </Modal>
      )}
    </div>
  )
}

export default StyleValuesTable
