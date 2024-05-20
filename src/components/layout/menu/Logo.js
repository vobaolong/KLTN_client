import logo from '../../../assets/ZenPii.svg'
import logoAdmin from '../../../assets/ZenPiiAdmin.svg'

const Logo = ({ width = '180px', navFor = '' }) => (
  <img
    loading='lazy'
    src={navFor !== 'user' ? logoAdmin : logo}
    style={{ width: width }}
    alt=''
  />
)

export default Logo
