import { getOrder, putOrder } from "../../services/data";
import { useEffect, useState } from "react";
import ProductOrder from "./productOrder";
import Button from "../../components/button/button";
import Modal from "../../components/modal";
import { useHistory } from "react-router";
import LogoNav from '../../components/logoRequest/index'

function Kitchen() {
  let [order, setOrder] = useState([])
  const [putOrderItem, setPutOrderItem] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const history = useHistory()

  useEffect(() => {
    getOrder()
      .then((order) => {
        order.json()
          .then((itemOrder) => {
            setOrder(itemOrder)
            itemOrder.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            const updateItems = itemOrder.map((item) => {
              if (item.status === "pending") {
                item.status = "Pendente"
              }

              return item;
            })

            const filterKitchen = updateItems.filter(item => item.status !== 'Finalizado' && item.status !== 'Entregue');
            setOrder(filterKitchen);

          })
      })
  }, [])


  const changeStatus = (item, option) => {
    let newState = item.status;
    if (item.status === 'Pendente' && option === 'Preparar') {
      newState = "Preparando..."
      setIsModalVisible(true)
    } else if (item.status === 'Preparando...' && option === 'Finalizar') {
      const newArray = order.filter(pedido => pedido.id !== item.id);
      setPutOrderItem(newArray)
      newState = "Finalizado"
      order.splice(option, 1);
    } else if (item.status === 'Pendente' && option === 'Finalizar') {
      setModal(true)
    }  
    else {
      return;
    }




    putOrder(item.id, newState).then(() => {
      if (newState === "Preparando...") {

        const updatedKitchen = putOrderItem.map((pedido, index) => {
          if (pedido.id === item.id) {
            pedido.status = newState;
            pedido.updatedAt = new Date()
          }
          return pedido
        });

        setPutOrderItem(updatedKitchen)
      }
      if (newState === 'Finalizado') {
        const updatedList = [...putOrderItem];
      updatedList.splice(option, 1);
      setPutOrderItem(updatedList);
      }

    })
  }
  return (
    <>
      <div className='logo-delivered'>
        <LogoNav />
        <h1 className='h1-delivered'> PEDIDOS</h1>
      </div>
      <div className='button-delivered'>
        <li><button className='button-' onClick={() => history.push('/salão')}>HOME</button></li>
        <li><button className='button-' onClick={() => history.push('/pedidos-prontos')}> PEDIDOS PRONTOS</button></li>
        <li><button className='button-' onClick={() => history.push('/pedidos-entregues')}> PEDIDOS ENTREGUES</button></li>
      </div>
      <div className='kitchen-area'>
        {order.map((item) => (
          <div className='area-orders'>
            <ProductOrder
              key={item.id}
              item={item}
            />
            <div className='button-class-kitchen'>
              {item.status === 'Pendente' ? ( <Button
                buttonType='submit'
                buttonOnclick={() => changeStatus(item, 'Preparar')}
                buttonText="Preparar"
                buttonClass='preparar'
              ></Button>) :  <Button
              buttonType='submit'
              buttonOnclick={() => changeStatus(item, 'Finalizar')}
              buttonText="Pronto"
              buttonClass='pronto'
            ></Button>}
            </div>

          </div>
        ))}
      </div>
      {isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}>
        <h2 className='h2-modal'>Pedido foi enviado para o garçom!</h2>
      </Modal>) : null}

      {modal ? (<Modal onClose={() => setModal(false)}>
        <h2 className='h2-modal'>Você deve preparar o pedido primeiro</h2>
      </Modal>) : null}
    </>
  )
}


export default Kitchen