import { getOrder, putOrder } from "../../services/data";
import { useState, useEffect } from "react";
import Button from "../../components/button/button";
import { useHistory } from "react-router";
import LogoNav from "../../components/logoRequest";
import ToTop from "../../components/toTop";

function Finishe() {
  const [orders, setOrders] = useState([]);
  const history = useHistory()

  useEffect(() => {
    getOrder()
      .then((ordersList) => {
        ordersList.json()
          .then((itemOrder) => {
            setOrders(itemOrder)
            itemOrder.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());

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

  function Time(item) {
    const timeready = Date.parse(item.updatedAt) - Date.parse(item.createdAt)
    const minute = Math.round((timeready / 1000 * 60) % 60) 
    const hour = Math.floor(timeready / (1000 * 60 * 60)) 
  
    const time = `${hour}:${minute}`
    return time
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
              <p><i className="fas fa-receipt item-icon"></i> {item.id} </p>
              <p><i class="far fa-user item-icon"></i> {item.client_name}</p>
              <p>Mesa: {item.table}</p>
              <p>{item.status} em: {new Date(item.updatedAt ).toLocaleString()}</p>
             <p> <i class="far fa-clock item-icon"></i> {Time(item)}</p>
              <div className="finishe-order">
                {item.Products.map((product) =>
                  <span key={product.id}>
                    <p>{product.qtd} {product.name} {product.flavor}</p>
                  </span>
                )}
                            </div>
                <div className='button-class-finishe'>
                  <Button
                    buttonType='button'
                    buttonOnclick={() => changeStatus(item, index)}
                    buttonText="Entregar"
                    buttonClass='entregar'
                  ></Button>
                </div>
              </div>
          </article>
        ))}
      </section>
      {ToTop()}
    </>
  )

}

export default Finishe;