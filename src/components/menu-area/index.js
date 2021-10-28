const MenuArea = ({ nome, preco,id, flavor }) => {
  return (
    <>
    <li className="order"id={id}>
      <div className="class-order">
        <p className="class-p-order">{nome}</p>
        <p>{flavor}</p>
        <p className="price-item-order">R${preco},00</p>
      </div>
    </li>
    
    </>
  )
}

export default MenuArea;

/* <button className='cart-btn'
    onClick={() => removeItem(item)}>-
    </button> 
    
    
    
      <label type="number" name="quantity"> {quantity}</label>
      <button className='cart-btn'
      onClick={() => adicionarItem(item)}>+
      </button> */