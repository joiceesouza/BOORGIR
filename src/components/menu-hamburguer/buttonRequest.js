import Button from '../button/button'
import { useHistory } from 'react-router';

function ButtonRequest() {
    const history = useHistory()
    const peding =() => {history.push('/cozinha')}

    return(
        <div className='Pedidos'>
            <Button
                buttonType='button'
                buttonOnclick={peding}
                buttonText="Pedidos em andamento.."
                buttonClass='button-kitchen'
            >
            </Button>
            <Button
                buttonType='button'
                buttonOnclick=''
                buttonText="Pedidos em preparação.."
                buttonClass='button-kitchen'
            >
            </Button>
            <Button
                buttonType='button'
                buttonOnclick=''
                buttonText="Pedidos prontos.."
                buttonClass='button-kitchen'
            >
            </Button>

        </div>
    )
}

export default ButtonRequest;