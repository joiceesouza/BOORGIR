function CardList({ productList, onClick }) {

  return (
    <>
      {
        productList.map((product) => {

          return (
            <div className='div-item-list'>
            <article key={product.id} onClick={() => { onClick(product) }} className='item-list' >
              <img className="products-img" src={product.image} alt={`imagem do produto ${product.name}`} />
              <p className='class-p'>{product.name}</p>
              <p>{product.descricao}</p>
              <p className='class-price'>Preço: R$ {product.price},00</p>
              <p>{product.flavor}</p>
            </article>
            </div>)
        })
      }
    </>
  )
}
export default CardList