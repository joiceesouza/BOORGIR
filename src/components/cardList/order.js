/*function OrderList({ getOrderList, onClick }) {

  return (
    <>
      {
        getOrderList.map((i) => {

          return (
            <article key={i.id} onClick={() => { onClick(i) }} className='item-list' >
              <p className='class-p'>{i.Products}</p>
              <p>{i.client_name}</p>
              <p>{i.status}</p>
              <p>{i.table}</p>
            </article>)
        })
      }
    </>
  )
}
export default OrderList;*/