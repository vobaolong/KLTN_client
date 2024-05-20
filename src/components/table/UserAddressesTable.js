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

const UserAddressesTable = ({ addresses = [], heading = false }) => {
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
        console.log('Some thing went wrong')
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

      <div className='p-3 box-shadow bg-body rounded-2'>
        <div className='text-end mb-3'>
          <UserAddAddressItem heading={true} count={addresses?.length || 0} />
        </div>
        {!isLoading && addresses.length === 0 ? (
          <div className='d-flex justify-content-center mt-3 text-primary text-center'>
            <h5>{t('userDetail.noAddress')}</h5>
          </div>
        ) : (
          <div className='table-scroll my-2'>
            <table className='table table-sm table-hover align-middle text-start'>
              <thead>
                <tr>
                  <th scope='col' className='text-center'></th>
                  <th scope='col'>
                    <span>{t('userDetail.address')}</span>
                  </th>
                  <th scope='col'>
                    <span>{t('action')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {addresses?.map((address, index) => (
                  <tr key={index}>
                    <th scope='row' className='text-center'>
                      {index + 1}
                    </th>
                    <td>
                      <span>{address}</span>
                    </td>
                    <td>
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-primary ripple me-2 my-1 rounded-1'
                        data-bs-toggle='modal'
                        data-bs-target='#edit-address-form'
                        onClick={() => handleEditAddress(address, index)}
                        title={t('button.edit')}
                      >
                        <i className='d-none res-dis-sm fa-duotone fa-pen-to-square'></i>
                        <span className='res-hide'>{t('button.edit')}</span>
                      </button>
                      <button
                        type='button'
                        className='btn btn-sm btn-outline-danger ripple my-1 rounded-1'
                        onClick={() => handleDeleteAddress(address, index)}
                        title={t('button.delete')}
                      >
                        <i className='d-none res-dis-sm fa-solid fa-trash-alt'></i>
                        <span className='res-hide'>{t('button.delete')}</span>
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
        {addresses?.length !== 0 && (
          <span className='text-nowrap'>
            <span
              style={{ fontSize: '0.85rem' }}
              className='text-nowrap text-secondary'
            >
              {t('showing')}{' '}
              <span className='fw-bold'>{addresses?.length || 0} </span>
              {t('result')}
            </span>
          </span>
        )}
      </div>
    </div>
  )
}

export default UserAddressesTable
