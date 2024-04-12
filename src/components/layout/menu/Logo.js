import logo from '../../../assets/ZenPii.svg'

const Logo = ({ width = '180px' }) => (
  <img loading='lazy' src={logo} style={{ width: width }} alt='' />
)

export default Logo
