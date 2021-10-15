import { getOrder } from "../../services/data";
import { useEffect, useState } from "react";
import ProductOrder from "./productOrder";

function Kitchen() {
  const [order, setOrder]= useState([])

  useEffect(() => {
    getOrder()
      .then((orderRequest) => {
        orderRequest.json()
          .then((listOrder) => {
            setOrder(listOrder)
          
          })
      })
  }, [])
  return (
    <>
    {order.map((item)=>(
      <ProductOrder
      key={item.id}
      item={item}
      />
    ))}
    </>
  )
}


export default Kitchen