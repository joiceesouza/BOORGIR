import { getOrder } from "../../services/data";
import { useState, useEffect } from "react";
import Input from '../../components/inputs/'

function InputFilter(){

    const [order, setOrder]= useState([])
    const [intialOrder, setIntialOrder] = useState([])

  useEffect(() => {
    getOrder()
      .then((orderRequest) => {
        orderRequest.json()
          .then((listOrder) => {
            setOrder(listOrder)
          
          })
      })
  }, [])

  const HandleChange = ({target}) => {
      if(!target.value) {
          setOrder(intialOrder)
          return
      }
      const filterComand = order.filter((i) => i.id.includes(target.value))
      setIntialOrder(filterComand)
  }

    return(
        <Input
            inputType='text'
            inputName='nameClient'
            inputPlaceholder='Digite o número da comanda'
            inputChange={HandleChange}
            inputClassName='input-area'
        />
    )
}

export default InputFilter