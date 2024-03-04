import { useState } from 'react'
import { getToken } from '../../apis/auth'
import { deleteAddresses } from '../../apis/user'
import useUpdateDispatch from '../../hooks/useUpdateDispatch'
import UserEditAddressForm from '../item/form/UserEditAddressForm'
import UserAddAddressItem from '../item/UserAddAddressItem'
import Modal from '../ui/Modal'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import Success from '../ui/Success'
import ConfirmDialog from '../ui/ConfirmDialog'

const UserAddressesTable = ({ heading = 'Địa Chỉ', addresses = [] }) => {
  const [editAddress, setEditAddress] = useState({})
  const [deleteAddress, setDeleteAddress] = useState({})

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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
    setError('')
    setSuccess('')
    setIsLoading(true)
    deleteAddresses(_id, accessToken, deleteAddress.index)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          updateDispatch('account', data.user)
          setSuccess(data.success)
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
        }, 3000)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Delete address'
          message={deleteAddress.address}
          color='danger'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      {heading && <h4 className='text-center text-uppercase'>{heading}</h4>}

      {error && <Error msg={error} />}
      {success && <Success msg={success} />}

      <div className='d-flex justify-content-between align-items-end'>
        <UserAddAddressItem count={(addresses && addresses.length) || 0} />
        <span className='me-2 text-nowrap'>
          {(addresses && addresses.length) || 0} Kết Quả
        </span>
      </div>

      <div className='table-scroll my-2'>
        <table className='table table-sm table-hover align-middle text-center'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Địa Chỉ</th>
              <th scope='col'>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {addresses &&
              addresses.map((address, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{address}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-dark ripple me-2'
                      data-bs-toggle='modal'
                      data-bs-target='#edit-address-form'
                      onClick={() => handleEditAddress(address, index)}
                    >
                      <i className='fas fa-pen'></i>
                      <span className='ms-2 res-hide'>Sửa</span>
                    </button>

                    <button
                      type='button'
                      className='btn btn-outline-primary ripple'
                      onClick={() => handleDeleteAddress(address, index)}
                    >
                      <i className='fas fa-trash-alt'></i>
                      <span className='ms-2 res-hide'>Xoá</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal id='edit-address-form' hasCloseBtn={false} title='Edit Address'>
        <UserEditAddressForm
          oldAddress={editAddress.address}
          index={editAddress.index}
        />
      </Modal>
    </div>
  )
}

export default UserAddressesTable
