import './style.css';

function ProductOrder({ item }) {
  const products = item.Products
  return (
    <div className="order-li">
      <article className="item-order" id={item.id}>
        <p> <i className="fas fa-receipt item-icon"></i> {item.id}</p> 
        <p><i class="far fa-user item-icon"></i> {item.client_name}</p>
        <p>Mesa: {item.table}</p>
        <p >Status: {item.status}</p>
        <p><i className="far fa-calendar-alt item-icon-calendar"></i> {new Date(item.createdAt).toLocaleString()}</p>
        {products.map((product) => (
          <p key={product.id} className='product-order-list'>
            <div className='qtd'>{product.qtd > 1 ? `${product.qtd}x` : ''} {product.name} | {product.flavor}</div>
          </p>
        ))}

      </article>
    </div>

  )
}

export default ProductOrder;