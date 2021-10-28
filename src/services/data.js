import { tokenUser } from "./users"

export const getProducts = async () => {
  const url = 'https://lab-api-bq.herokuapp.com/products'

  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${tokenUser}`
    },
  }

  const response = await fetch(url, config)
  return response
}

export const getOrder = async () => {
  const url = 'https://lab-api-bq.herokuapp.com/orders'

  const config ={
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `${tokenUser}`
    }
  }
  const orderGet = await fetch(url, config)
  return orderGet
}


  export const putOrder = async (id, status) => {
    return await fetch(`https://lab-api-bq.herokuapp.com/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenUser}`
      },
      body:JSON.stringify(
        {status: status}
      ),
    })
    
    }

    /* function Kitchen() {
  let [order, setOrder] = useState([])
  const [putOrderItem, setPutOrderItem] = useState([])
  useEffect(() => {
      getOrder()
      .then((order) => {
        order.json()
          .then((itemOrder) => {
            setOrder(itemOrder)
                itemOrder.sort( (a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() );
              const updateItems = itemOrder.map((item) => {
                  if(item.status === "pending") {
                      item.status = "Pendente"
                  } 

                  return item;
              })

              const filterArray = updateItems.filter(item => item.status !== 'Finalizado' && item.status !== 'Entregue' );
              setOrder(filterArray);
              
          })
          
  }, [])

  const changeStatus = (item, option) => {
    let newState = item.status;
    if (item.status === 'Pendente' && option === 'Preparar') {
      newState = "Preparando..."
    } else if (item.status === 'Preparando...' && option === 'Finalizar') {
      alert('Pedido foi enviado para o garçom')
      const newArray = order.filter(pedido => pedido.id !== item.id);
      setPutOrderItem(newArray)
      newState = "Finalizado"
    } else if (item.status === 'Pendente' && option === 'Finalizar') {
      alert('Você deve preparar o pedido primeiro')
    } else {
      return;
    }


    putOrder(item.id, newState).then(() => {
      if (newState === "Preparando...") {

        const updatedKitchenArray = putOrderItem.map((pedido) => {
          if (pedido.id === item.id) {
            pedido.status = newState;
            pedido.updatedAt = new Date()
          }
          
          return pedido
        });

        setPutOrderItem(updatedKitchenArray)
      }
    })
  }
  return (
    <>
     
      <InputFilter />
      {order.map((item) => (
         <div>
            <Button
          buttonType='submit'
          buttonOnclick={() => changeStatus(item, 'Preparar')}
          buttonText="Preparar"
          buttonClass='preparar'
        ></Button>
        <Button
          buttonType='submit'
          buttonOnclick={() => changeStatus(item, 'Finalizar')}
          buttonText="Pronto"
          buttonClass='pronto'
        ></Button>
         <ProductOrder
           key={item.id}
           item={item}
         />
         </div>
       ))}
       )
    </>
  )
}


export default Kitchen  */