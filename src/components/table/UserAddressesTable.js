import { useState } from 'react'
import { getToken } from '../../apis/auth'
import { deleteAddresses } from '../../apis/user'
import useUpdateDispatch from '../../hooks/useUpdateDispatch'
import UserEditAddressForm from '../item/form/UserEditAddressForm'
import UserAddAddressItem from '../item/UserAddAddressItem'
import Modal from '../ui/Modal'
import Loading from '../ui/Loading'
import ConfirmDialog from '../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const UserAddressesTable = ({ addresses = [] }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [editAddress, setEditAddress] = useState({})
  const [deleteAddress, setDeleteAddress] = useState({})
  const [isConfirming, setIsConfirming] = useState(false)
  const [updateDispatch] = useUpdateDispatch()
  const { _id, accessToken } = getToken()

  const handleEditAddress = (address, index) => {
    setEditAddress({
      index: index,
      address: address
    })
  }

  const handleDeleteAddress = (address, index) => {
    setDeleteAddress({
      index: index,
      address: address
    })
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setIsLoading(true)
    deleteAddresses(_id, accessToken, deleteAddress.index)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          updateDispatch('account', data.user)
          toast.success(t('toastSuccess.address.delete'))
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
          title={t('userDetail.delAddress')}
          message={deleteAddress.address}
          color='danger'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      {t('address') && (
        <h4 className='text-center text-uppercase'>
          {t('userDetail.address')}
        </h4>
      )}

      <div className='d-flex justify-content-between align-items-end'>
        <UserAddAddressItem count={addresses?.length || 0} />
        <span className='text-nowrap'>
          <small className='text-nowrap res-hide'>
            {t('showing')} {addresses?.length || 0} {t('result')}
          </small>
        </span>
      </div>
      {!isLoading && addresses.length === 0 ? (
        <div className='d-flex justify-content-center mt-3 text-primary text-center'>
          <h5>{t('userDetail.noAddress')}</h5>
        </div>
      ) : (
        <div className='table-scroll my-2'>
          <table className='table table-striped table-sm table-hover align-middle text-center'>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col' className='text-start'>
                  <span style={{ fontWeight: '500', fontSize: '.875rem' }}>
                    {t('userDetail.address')}
                  </span>
                </th>
                <th scope='col'>
                  <span style={{ fontWeight: '500', fontSize: '.875rem' }}>
                    {t('action')}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {addresses?.map((address, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td className='text-start px-2'>
                    <span>{address}</span>
                  </td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-sm btn-primary ripple me-2 my-1 rounded-1'
                      data-bs-toggle='modal'
                      data-bs-target='#edit-address-form'
                      onClick={() => handleEditAddress(address, index)}
                    >
                      <i className='fa-solid fa-pen'></i>
                      <span className='ms-2 res-hide'>{t('button.edit')}</span>
                    </button>
                    <button
                      type='button'
                      className='btn btn-sm btn-outline-danger ripple my-1 rounded-1'
                      onClick={() => handleDeleteAddress(address, index)}
                    >
                      <i className='fa-solid fa-trash-alt'></i>
                      <span className='ms-2 res-hide'>
                        {t('button.delete')}
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        id='edit-address-form'
        hasCloseBtn={false}
        title={t('userDetail.editAddress')}
      >
        <UserEditAddressForm
          oldAddress={editAddress.address}
          index={editAddress.index}
        />
      </Modal>
    </div>
  )
}

export default UserAddressesTable
