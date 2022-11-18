import LogoImg from '../../assets/images/navLogo.webp'
import { Link } from 'react-router-dom'

const Logo = () => {
    return <Link to='/' className='logo'><img className="logoImg" src={LogoImg} alt='Logo de e-watch' /> </Link>
}

export default Logo;
