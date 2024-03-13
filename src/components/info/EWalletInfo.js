import { formatPrice } from '../../helper/formatPrice'

const EWalletInfo = ({ eWallet = 0 }) => (
  <div className='d-inline-flex justify-content-start align-items-center link-golden fs-2'>
    <i class='fa-solid fa-wallet me-2'></i>
    <span>{formatPrice(eWallet)} ₫</span>
  </div>
)

export default EWalletInfo
