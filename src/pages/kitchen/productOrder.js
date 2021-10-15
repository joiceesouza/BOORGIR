function ProductOrder({item}) {
    const products = item.Products
    return(
        <>
    <li className="order"id={item.id}>
      <div className="class-order">
        <p className="class-p-order">cliente:{item.client_name}</p>
        <p className="price-item-order">comanda:{item.id}</p>
        <p className="price-item-order">mesa:{item.table}</p>
        <p className="price-item-order">tempo de preparo:</p>
        <ul className="order-list">
            {products.map((product) => (
            <li key={product.id}>
                {product.qtd > 1 ? `${product.qtd}x` : ''} {product.name} {product.flavor}
            </li>
            ))}
        </ul> 
      </div>
    </li>
        </>
    )

}

export default ProductOrder;