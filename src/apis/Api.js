import axios from "axios";

axios.defaults.baseURL = 'https://apifromashu.herokuapp.com/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.interceptors.request.use(request => {
//     console.log(request);
//     // Edit request config
//     return request;
// }, error => {
//     return Promise.reject(error);
// });

// axios.interceptors.response.use(response => {
//     // Edit response config
//     return response;
// }, error => {
//     return Promise.reject(error);
// });

const nonTokenApis = ['login', 'register', 'allcakes', 'searchcakes', 'cake'];

axios.interceptors.request.use(request => {
  if (!nonTokenApis.includes(request.url.split("?")[0])) {
    request.headers.authtoken = localStorage.token
  }
  return request
})

// Api to get User by token
export const getUserByToken = (token) => {

}

// Api to register user
export const register = (data) => {
  return axios.post('register', data)
    .then(
      (response) => response.data,
      (error) => {}
    );
}

// Api to login user
export const login = (email, password) => {
  return axios.post('login', {email: email, password: password})
    .then(
      (response) => response.data,
      (error) => {}
    );
}

// Api to get all cakes
export const getAllCakes = () => {
  return axios.get('allcakes')
    .then(
      (response) => response.data,
      (error) => {}
    );
}

// Api to get cakes by search
export const getCakesBySearch = (search) => {
  return axios.get('searchcakes?q=' + search)
    .then(
      (response) => response.data,
      (error) => {}
    )
}

// Api to get cake by id
export const getCake = (cakeid) => {
  return axios.get('cake/' + cakeid)
    .then(
      response => response.data,
      erros => {}
    )
}

// Api to get cart data
export const getCart = () => {
  return axios.post('cakecart', {})
    .then(
      response => response.data,
      erros => {}
    )
}

// Api to add item to cart
export const addToCart = (data) => {
  return axios.post('addcaketocart', data)
    .then(
      (response) => response.data,
      (error) => {}
    )
}

// Api to remove item from cart
export const removefromCart = (cakeid) => {
  return axios.post('removecakefromcart', {cakeid: cakeid})
    .then(
      (response) => response.data,
      (error) => {}
    )
}

// Api to less qunatity by 1 of item from cart
export const lessOneCakeQtyFromCart = (cakeid) => {
  return axios.post('removeonecakefromcart', {cakeid: cakeid})
    .then(
      (response) => response.data,
      (error) => {}
    )
}

// Api to clear cart
export const emptyCart = () => {
  return axios.post('clearcart', {})
    .then(
      (response) => response.data,
      (error) => {}
    )
}

// Api to place order
export const placeOrder = (cart, address) => {
  let data = {
    name: address.fullname,
    city: address.city,
    pincode: address.pincode,
    address: address.addressLine,
    phone: address.phone,
    price: cart.totalPrice,
    cakes: cart.items
  };

  return axios.post('addcakeorder', data).then(
      (response) => response.data,
      (error) => {}
    )
}

// Api to get orders
export const getOrders = () => {
  return axios.post('cakeorders', {})
    .then(response => response.data, error => [])
}

// Api to add image to cake
export const cakeImageUpload = (data) => {
  return axios.post('upload', data).then(
    response => response.data, error => []
  )
}

// Api to add new cake
export const addNewCake = (data) => {
  return axios.post('addcake', data || {}).then(
    (response) => response.data,
    (error) => {}
  );
}