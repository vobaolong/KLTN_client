/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getToken } from '../../apis/auth'
import { listItemsByCart } from '../../apis/cart'

const ModalCart = ({ cartId = '', userId = '' }) => {
  const { _id, accessToken } = getToken()
  const [items, setItems] = useState([])

  const init = () => {
    listItemsByCart(_id, accessToken, cartId)
      .then(async (data) => {
        if (data.error) toast.error(data.error)
        else {
          setItems(data.items)
        }
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
      })
  }

  useEffect(() => {
    if (cartId) init()
  }, [cartId, userId])

  console.log(items)
  return (
    <div className='text-white ms-2 your-account'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='d-flex align-items-center justify-content-center rounded-1 p-2 text-white'>
          <h5 className='modal-title' id='cartModalLabel'>
            Your Cart
          </h5>
        </div>
        {/* Render your product list here */}
        <ul className='list-group your-account-options z-10'>
          {items.map((product) => (
            <li key={product.productId?._id}>{product.productId?.name}</li>
          ))}
        </ul>
        <div className='modal-footer'>
          <button
            type='button'
            className='btn btn-secondary'
            data-bs-dismiss='modal'
          >
            Close
          </button>
          <button type='button' className='btn btn-primary'>
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalCart
