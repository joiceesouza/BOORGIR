import { getOrder, putOrder } from "../../services/data";
import { useState, useEffect } from "react";
import Button from "../../components/button/button";
import { useHistory } from "react-router";
import LogoNav from "../../components/logoRequest";

function Finishe() {
  const [orders, setOrders] = useState([]);
  const history = useHistory()

  useEffect(() => {
    getOrder()
      .then((ordersList) => {
        ordersList.json()
          .then((itemOrder) => {
            setOrders(itemOrder)

            const pedidosFinalizados = itemOrder.filter((item) => item.status === 'Finalizado');
            setOrders(pedidosFinalizados)

          })
      })
  }, [])


  const changeStatus = (item, index) => {

    putOrder(item.id, "Entregue").then(() => {
      const updatedList = [...orders];
      updatedList.splice(index, 1);
      setOrders(updatedList);
    })

  }

  return (
    <>
      <div className='logo-delivered'>
        <LogoNav />
        <h1 className='h1-delivered'>PEDIDOS PRONTOS</h1>
      </div>
      <div className='button-delivered'>
        <li><button className='button-' onClick={() => history.push('/salão')}>HOME</button></li>
        <li><button className='button-' onClick={() => history.push('/cozinha')}> PEDIDOS </button></li>
        <li><button className='button-' onClick={() => history.push('/pedidos-entregues')}>PEDIDOS ENTREGUES</button></li>
      </div>
      <section className="container-finishe">
        {orders.map((item, index) => (
          <article key={item.id}>
            <div className='product-finishe' >
              <p>Pedido {item.id} </p>
              <p>{item.status} em: {new Date(item.updatedAt).toLocaleString()}</p>
              <p>Nome: {item.client_name}</p>
              <p>Mesa: {item.table}</p>
              <div className="finishe-order">
                {item.Products.map((product) =>
                  <span key={product.id}>
                    <p>{product.qtd} {product.name} {product.flavor}</p>
                  </span>
                )}
                <div className='button-class-finishe'>
                  <Button
                    buttonType='button'
                    buttonOnclick={() => changeStatus(item, index)}
                    buttonText="Entregar"
                    buttonClass='entregar'
                  ></Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  )

}

export default Finishe;