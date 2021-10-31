import { getOrder } from "../../services/data";
import { useEffect, useState } from "react";
import './style.css';
import { useHistory } from "react-router";
import LogoNav from "../../components/logoRequest";


function Delivered() {
  const [orders, setOrders] = useState([]);
  const history = useHistory()

  useEffect(() => {
    getOrder()
      .then((ordersList) => {
        ordersList.json()
          .then((itemOrder) => {
            setOrders(itemOrder)
            itemOrder.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

            const orderDelivered = itemOrder.filter((item) => item.status === 'Entregue');
            setOrders(orderDelivered)      
          })
          
      })
      
  }, [])


  return (
    <>
      <div className='logo-delivered'>
        <LogoNav />
        <h1 className='h1-delivered'>PEDIDOS ENTREGUES</h1>
      </div>
      <div className='button-delivered'>
        <li><button className='button-' onClick={() => history.push('/salão')}>HOME</button></li>
        <li><button className='button-' onClick={() => history.push('/cozinha')}> PEDIDOS</button></li>
        <li><button className='button-' onClick={() => history.push('/pedidos-prontos')}>PEDIDOS PRONTOS</button></li>
      </div>
      <div className='container-delivered'>
        {orders.map((item) => (
          <div className="container-" key={item.id}>
            <article >
              <p>Status: {item.status}</p>
              <p><i class="far fa-user item-icon"></i> {item.client_name}</p>
              <p>Mesa: {item.table}</p>
              <p> Entregue: {new Date(item.updatedAt).toLocaleString()}</p>
              {item.Products.map((product) =>
                <span key={product.id}>
                  <p>{product.qtd} {product.name} {product.flavor} </p>
                </span>
              )}
            </article>
          </div>
        ))}
      </div>
    </>
  )
}
export default Delivered;