import { addToCart, getCart, lessOneCakeQtyFromCart, placeOrder, removefromCart } from "../apis/Api";

export const getCartMiddleware = () => {
  return dispatch => {
    dispatch({
      type: "CART_INIT"
    });

    getCart().then(
      response => {
        dispatch({
          type: !response.data ? 'SET_CART_FAILURE' : 'SET_CART_SUCCESS',
          payload: {...response}
        })
      },
      error => {
        dispatch({
          type: 'SET_CART_FAILURE',
          payload: {...error}
        })
      }
    )
  }
}

export const addToCartMiddleware = (data) => {
  return dispatch => {
    dispatch({
      type: "CART_INIT"
    });

    addToCart(data).then(
      response => {
        dispatch({
          type: !response.data ? 'ADD_TO_CART_FAILURE' : 'ADD_TO_CART_SUCCESS',
          payload: {...response}
        })
      },
      error => {
        dispatch({
          type: 'ADD_TO_CART_FAILURE',
          payload: {...error}
        })
      }
    );
  }
}

export const removeOneQtyItemFromCartMiddleware = (cakeid) => {
  return dispatch => {
    dispatch({
      type: "CART_INIT"
    });

    lessOneCakeQtyFromCart(cakeid).then(
      response => {
        dispatch({
          type: 'REMOVE_ONE_FROM_CART_SUCCESS',
          payload: {...response, cakeid: cakeid}
        })
      },
      error => {
        dispatch({
          type: 'REMOVE_ONE_FROM_CART_FAILURE',
          payload: {...error}
        })
      }
    );
  }
}

export const removeItemFromCartMiddleware = (cakeid) => {
  return dispatch => {
    dispatch({
      type: "CART_INIT"
    });

    removefromCart(cakeid).then(
      response => {
        dispatch({
          type: 'REMOVE_FROM_CART_SUCCESS',
          payload: {...response, cakeid: cakeid}
        })
      },
      error => {
        dispatch({
          type: 'REMOVE_FROM_CART_FAILURE',
          payload: {...error}
        })
      }
    );
  }
}

export const placeOrderMiddleware = (token, cart, address) => {
  return dispatch => {
    dispatch({
      type: 'CREATE_ORDER_INIT'
    })
    placeOrder(token, cart, address).then(response => {
      dispatch({
        type:'ORDER_CREATED', payload: response
      })
    }, error => {
      dispatch({
        type: 'ORDER_CREATION_FAILURE'
      })
    })
  }
}