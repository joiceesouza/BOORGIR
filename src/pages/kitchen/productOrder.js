import './style.css';

function ProductOrder({ item }) {
  const products = item.Products
  return (
    <div className="order-li">
      <article className="item-order" id={item.id}>
        <p> <i className="fas fa-receipt"></i>: {item.id}</p>
        <p>Cliente: {item.client_name}</p>
        <p>Mesa: {item.table}</p>
        <p >Status: {item.status}</p>
        <p><i className="far fa-calendar-alt"></i> {new Date(item.createdAt).toLocaleString()}</p>
        {products.map((product) => (
          <p key={product.id} className='product-order-list'>
            <div className='qtd'>Produto:{product.qtd > 1 ? `${product.qtd}x` : ''}</div>{product.name} | {product.flavor}
          </p>
        ))}

      </article>
    </div>

  )
}

export default ProductOrder;