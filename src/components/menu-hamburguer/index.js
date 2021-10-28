import { useState } from "react";
import './style.css';
import Modal from "../modal";
import { Logout } from "../../services/users";
import ButtonRequest from "./buttonRequest";
import InputFilter from "../../pages/kitchen/inputFilter";
import { useHistory } from "react-router";


function MenuHamburguer() {
  const history = useHistory()
  const [active, setMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pedido, setIsPedido] = useState(false);


  const ToggleMode = () => {
    setMode(!active)
  }
  return (
    <>
      <div className='menu-class'>
        <div className={active ? 'icon iconActive' : 'icon'} onClick={ToggleMode}>
          <div className='hamburguer hamburguerIcon'></div>
        </div>
        <div className={active ? 'menu menuOpen' : 'menu menuClose'} >
          <div className='list'>
            <ul className='listItems'>
              <li onClick={() => history.push('/salão')}>HOME</li>
              <li onClick={() => history.push('/cozinha')}>PEDIDOS</li>
              <li onClick={() => history.push('/pedidos-prontos')}>PEDIDOS PRONTOS</li>
              <li onClick={() => history.push('/pedidos-entregues')}>PEDIDOS FINALIZADOS</li>
              <li onClick={Logout}>Sair</li>
            </ul>
            {isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}>
              <ButtonRequest/>
            </Modal>) : null}
            {pedido ? (<Modal onClose={() => setIsPedido(false)}>
              <InputFilter/>
            </Modal>) : null}
          </div>
        </div>

      </div>

    </>
  )
}

export default MenuHamburguer;




