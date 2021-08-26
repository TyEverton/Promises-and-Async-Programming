import setText, { appendText, showWaiting, hideWaiting } from './results.mjs'

export function get() {
  axios.get('http://localhost:3000/orders/1').then(({ data }) => {
    setText(JSON.stringify(data))
  })
}

//the promise above starts by calling an async function, then chains the then function following the get function. the "then" function grabs the data from the get function and sets it as a human readable format

export function getCatch() {
  axios
    .get('http://localhost:3000/orders/123')
    .then(({ data }) => {
      setText(JSON.stringify(data))
    })
    .catch((err) => setText(err))
}

export function chain() {
  axios
    .get('http://localhost:3000/orders/1')
    .then(({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`,
      )
    })
    .then(({ data }) => {
      setText(`City: ${data.city}`)
    })
}
//lines 20 - 31 - 21/22 take an order, then *lines 23-25* it takes that order and reads the address,  then lines 28-29 display the address
export function chainCatch() {
  axios
    .get('http://localhost:3000/orders/1')
    .then(({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`,
      )
    })
    .then(({ data }) => {
      setText(`City: ${data.my.city}`)
    })
    .catch((err) => setText(err))
}

export function final() {
  showWaiting()
  axios
    .get('http://localhost:3000/orders/1')
    .then(({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`,
      )
    })
    .then(({ data }) => {
      setText(`City: ${data.city}`)
    })
    .catch((err) => setText(err))
    .finally(() => {
      setTimeout(() => {
        hideWaiting()
      }, 1500)
      appendText(' -- Completed --')
    })
}
