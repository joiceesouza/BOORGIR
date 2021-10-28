import Logo from '../imgs/novologo.png'
import { useHistory } from 'react-router'

function LogoNav() {
    const history = useHistory()
    return(
        <>
            <button type='button' className='button-router-hall' onClick={() => history.push('/salão')}><img className='img-delivered' src={Logo} alt='logo'/></button>
        </>
        
    )
}

export default LogoNav
