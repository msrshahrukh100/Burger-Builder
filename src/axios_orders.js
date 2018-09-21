import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burgerbuilder-52330.firebaseio.com/'
})

// axios.defaults.request.use({
//
// })

export default instance
