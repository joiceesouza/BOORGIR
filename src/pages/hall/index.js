import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProducts, getOrder } from "../../services/data";
import { tokenUser } from "../../services/users";
import MenuArea from "../../components/menu-area";
import Modal from "../../components/modal";
import Input from "../../components/inputs";
import MenuHamburguer from "../../components/menu-hamburguer";
import Button from "../../components/button/button";
import CardList from "../../components/cardList";
import './style.css';


const Cardapio = () => {

  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState([]);
  const [addItem, setAddItem] = useState([]);
  const [mesaValue, setMesaValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const history = useHistory()

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

  let [order, setOrder] = useState([]) //guarda os pedidos
  function postOrder() {
    return fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenUser}`
      },
      body: JSON.stringify({
        client: nameValue,
        table: mesaValue,
        products: addItem
      }),
    })

      .then((res) => res.json())
      .then((json) => {
        order = json
        console.log(order)
        if (nameValue === '' || mesaValue === '' || addItem === '') {
          setModal(true)
        }
        else { setIsModalVisible(true) }
      })
      .catch((error) => {
        alert('Verifique as informações!')
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

  function MenuItem(item) {
    const itemCard = addItem.find((card) => card.id === item.id)
    if (itemCard) {
      addItem.forEach((products) => {
        if (products.id === item.id) {
          products.qtd++
        }
      })
      setAddItem([...addItem])
    } else {
      setAddItem([...addItem, { nome: item.name, preco: item.price, id: item.id, qtd: 1 }])
    }
  }

  function RemoveItem(item) {
    const itemCard = addItem.find((card) => card.id === item.id)
    if (itemCard) {
      addItem.forEach((products, index) => {
        if (products.qtd === 1) {
          addItem.splice(index, 1);
        }
        else if (products.id === item.id) {
          products.qtd--
        }
      })
      setAddItem([...addItem])
    } else {
      setAddItem([...addItem, { nome: item.name, preco: item.preco, id: item.id, qtd: 1 }])
    }
  }

  function Total() {
    return addItem.reduce((accum, item) => accum + (item.preco * item.qtd), 0)
  }

  function rotaKitchen() {
    history.push('/cozinha');
  }

  return (

    <main className='main'>
      <div className='nav'>
        <MenuHamburguer />
        <h1 className='h1-nav'>BEST BURGER IN TOWN</h1>
      </div>
      <div className='container-hall' >
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
        <div className='containerItem'>
          <div className='products'>
            <CardList
              productList={menu}
              onClick={MenuItem}
            />
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
                  <div className='contador-button'>
                    {item.qtd === 1 ? (<button
                      onClick={() => RemoveItem(item)}
                      className='input-remove'
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>) : <Button
                      buttonType='button'
                      buttonOnclick={() => RemoveItem(item)}
                      buttonText="-"
                      buttonClass='contador'
                    >
                    </Button>}
                    <p className='number-contador'> {item.qtd}</p>

                    <Button
                      buttonType='button'
                      buttonOnclick={() => MenuItem(item)}
                      buttonText="+"
                      buttonClass='contador'
                    >
                    </Button>
                  </div>
                  <hr className='hr-hall' />
                </div>
              )
            })}
            <div className='client-hall'>
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
              <div className='total'>
                <label className='label-total'>Total: R$ {Total()},00</label>
              </div>
              <Button
                buttonType='button'
                buttonOnclick={postOrder}
                buttonText="ENVIAR PARA COZINHA"
                buttonClass='button-class'
              ></Button>
            </div>
          </div>
        </div>
      </div>
      {isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}>
        <h2 className='h2-modal'>Pedido enviado com sucesso!</h2>
        <div className='button-rota-kitchen'>
          <Button
            buttonType='button'
            buttonOnclick={rotaKitchen}
            buttonText="Acompanhe seu pedido"
            buttonClass='rota-kitchen'
          ></Button>
        </div>

      </Modal>) : null}

      {modal ? (<Modal onClose={() => setModal(false)}>
        <h2 className='h2-modal'>Preencha corretamente o pedido!</h2>
      </Modal>) : null}
    </main>
  )

}
export default Cardapio;

