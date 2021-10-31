import { tokenUser } from "./users"

export const getProducts = async () => {
  const url = 'https://lab-api-bq.herokuapp.com/products'

  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${tokenUser}`
    },
  }

  const response = await fetch(url, config)
  return response
}

export const getOrder = async () => {
  const url = 'https://lab-api-bq.herokuapp.com/orders'

  const config ={
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `${tokenUser}`
    }
  }
  const orderGet = await fetch(url, config)
  return orderGet
}


  export const putOrder = async (id, status) => {
    return await fetch(`https://lab-api-bq.herokuapp.com/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenUser}`
      },
      body:JSON.stringify(
        {status: status}
      ),
    })
    
    }