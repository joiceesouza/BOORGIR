import { useEffect, useState } from "react";
import MenuArea from "../../components/menu-area";
import CardList from "../../components/cardList";
import { getProducts, getOrder } from "../../services/data";
import Button from "../../components/button/button";
import './style.css';
import MenuHamburguer from "../../components/menuHamburguer";
import Input from "../../components/inputs";
//import Relogio from "../../components/menu-area/relogio";
import Modal from "../../components/modal";
import { tokenUser } from "../../services/users";
//import OrderArea from "../../components/cardList/order";
//import OrderList from "../../components/cardList/order";
//import { Total } from "../../services/functionHall";

const Cardapio = () => {

  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState([]);
  const [addItem, setAddItem] = useState([]);
  const [mesaValue, setMesaValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleMenu(menuSelected) {
    const menuProducts = products.filter((item) => item.type === menuSelected)
    setMenu(menuProducts)
  }



  useEffect(() => {
    getProducts()
      .then((lista) => {
        lista.json()
          .then((list) => {
            setProducts(list)
          })
      })
  }, [])

    let [order,setOrder] = useState([]) //guarda os pedidos
  function postOrder() {
    return fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenUser}`
      },
      body:JSON.stringify({
        client: nameValue,
        table: mesaValue,
        products: addItem
      }),
    })
    
      .then((res) => res.json())
      .then((json) => {
        order = json
        console.log(order)
        setIsModalVisible(true)
      })
      .catch((error) => {
        console.log(
          'deu ruim'
        )
      })
  
    }
    useEffect(() => {
      getOrder()
        .then((orderRequest) => {
          orderRequest.json()
            .then((listOrder) => {
              setOrder(listOrder)
            
            })
        })
    }, [])

 


    function MenuItem(item){
     const itemCard = addItem.find((card)=>card.id===item.id)
     if(itemCard){
      addItem.forEach((products)=> {
        if(products.id === item.id){
          products.qtd++
        }
      })
       setAddItem([...addItem])
     }else{
      setAddItem([...addItem,{ nome: item.name, preco: item.price, id:item.id, qtd: 1 }])
     }
    }

    function RemoveItem(item){
      const itemCard = addItem.find((card)=>card.id===item.id)
      if(itemCard){
       addItem.forEach((products)=> {
         if(products.id === item.id){
           products.qtd--
         }
       })
        setAddItem([...addItem])
      }else{
       setAddItem([...addItem,{ nome: item.name, preco: item.price, id:item.id, qtd: 1 }])
      }
     }
    
      function Total() {
    return addItem.reduce((accum, item) => accum + (item.preco * item.qtd), 0)
  }



  const remove = (event, index) => {
    event.preventDefault();
    const updatedItemsList = [...addItem];
    updatedItemsList.splice(index, 1);
    setAddItem(updatedItemsList);
  };

  

  return (
    <>
      <div className='nav'>
        <MenuHamburguer/>
        <h1>BEST BURGER IN TOWN</h1>
      </div>


      <div className='container-hall' >
        <div className='item'>
          <div className='div-button'>
          <Button
            buttonType='button'
            buttonOnclick={() => { handleMenu('breakfast') }}
            buttonText="Coffe"
            buttonClass='button-hall'
          >
          </Button>
          <Button
            buttonType='button'
            buttonOnclick={() => { handleMenu('all-day') }}
            buttonText="Burgers"
            buttonClass='button-hall'
          >
          </Button>
         
          </div>
          {products.map(item => {
            return (
              <CardList 
                productList={menu}
                onClick={()=> MenuItem(item)}
              />
            )
          })}
        

        </div>
        <div className='containerItem'>
        <h2>Resumo do Pedido</h2>
        <Input
              inputType='text'
              inputName='nameClient'
              inputPlaceholder='Digite o nome do cliente'
              autoComplete='OFF'
              inputChange={(e) => setNameValue(e.target.value)}
              inputClassName='input-area'
            />
            <div className='option-mesas'>
              <select className='style-mesas' onChange={(e) => setMesaValue(e.target.value)}>
                <option className='style-mesas'>  Escolha a mesa </option>
                <option className='style-mesas' value='1'>  Mesa 1 </option>
                <option className='style-mesas' value='2'>  Mesa 2  </option>
                <option className='style-mesas' value='3'>  Mesa 3  </option>
                <option className='style-mesas' value='4'>  Mesa 4  </option>
                <option className='style-mesas' value='5'>  Mesa 5  </option>
                <option className='style-mesas' value='6'>  Mesa 6  </option>
                <option className='style-mesas' value='7'>  Mesa 7  </option>
                <option className='style-mesas' value='8'>  Mesa 8  </option>
                <option className='style-mesas' value='9'>  Mesa 9  </option>
                <option className='style-mesas' value='10'>  Mesa 10  </option>
              </select>
            </div>
          <div className='cartItem'>
            {addItem.map(item => {
              return (
                <div className='class-area'>
                  <MenuArea 
                  id={item.id}
                    nome={item.nome}
                    preco={item.preco}
                    qtd={item.id}
                  />
                  <Button
                    buttonType='button'
                    buttonOnclick={()=> MenuItem(item)}
                    buttonText="+"
                    buttonClass='contador'
                  >
                  </Button> 
                  <p> {item.qtd}</p> 
                  <Button
                    buttonType='button'
                    buttonOnclick={()=> RemoveItem(item)}
                    buttonText="-"
                    buttonClass='contador'
                  >
                  </Button> 
                </div>
              )
            })} 
        </div>
        <div className='total'>
        <label className='label-total'>Total: R$ {Total()},00</label>
        </div>
     
        <Button
              buttonType='button'
              buttonOnclick={postOrder}
              buttonText="Enviar para a Cozinha"
              buttonClass='button-class'
            ></Button>
          </div>
          {isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}>
            <h2>Pedido enviado com sucesso!</h2>

          </Modal>) : null}
      </div>
    </>
  )

}
export default Cardapio;

//try / catch / finally - MDN
//confirmar se o retorno é um array de obj

//                <hr className='hr-class' />

/*  <Contador onClick={(e) => setContadorQtd(e.target.value)}/>
                <p>{contadorQtd}</p> 
                
                
                
                    <button
                    type='button'
                    onClick={remove}
                    className='input-group remove'
                  ><i className="far fa-trash-alt"></i>
                  </button>
                  
                  
                    {order.map(i => {
            return(
              <OrderList
              getOrderList={getRequest}
              />
            )
          })}
          
          
          
             {order.map(i => {
          return(
          <OrderArea
          id={i.id}
          Products={i.Products}
          client_name={i.client_name}
          status={i.status}
          table={i.table}

          >
          </OrderArea>
          )
        })}*/