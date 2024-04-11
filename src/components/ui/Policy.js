import React from 'react'
import refundImg from '../../assets/refund.png'
import returnImg from '../../assets/return.png'
import checkImg from '../../assets/package.png'

const Policy = () => {
  return (
    <div className='mb-4 text-muted d-flex res-flex-column justify-content-between gap-2 bg-white rounded-2 box-shadow p-3'>
      <span className=''>
        <img
          src={refundImg}
          className='me-2'
          style={{ width: '30px' }}
          alt=''
        />
        <span>Được hoàn tiền 111% nếu là hàng giả.</span>
      </span>
      <span className=''>
        <img
          src={returnImg}
          className='me-2'
          style={{ width: '30px' }}
          alt=''
        />
        <span>Đổi trả miễn phí tại nhà trong 30 ngày nếu sản phẩm lỗi.</span>
      </span>
      <span className=''>
        <img src={checkImg} className='me-2' style={{ width: '30px' }} alt='' />
        <span>Được mở hộp kiểm tra khi nhận hàng.</span>
      </span>
    </div>
  )
}

export default Policy
