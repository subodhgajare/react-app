function CartReducer(state = {
  items: [],
  shippingPrice: 0,
  totalPrice: 0,
  totalQty: 0
}, action) {
  switch (action.type) {
    case "CART_INIT":
      state = { ...state, isLoading: true };
      return state;

    case 'CART_IS_EMPTY':
      return {
        ...state,
        message: 'Your cart is empty. please add cake to your cart'
      }

    case 'CLEAR_MESSAGE':
      return {...state, message: null}

    case "SET_CART_SUCCESS":
      state = { ...state };
      state.items = action.payload?.data;
      return updateCartState(state);

    case 'SET_CART_FAILURE':
      return {...state, ...action.payload, isLoading: false}

    case "ADD_TO_CART_SUCCESS":
      state = { ...state };
      return updateCartState(state, action.payload?.data, action.type);

    case 'ADD_TO_CART_FAILURE':
      return {...state, ...action.payload, isLoading: false}

    case "REMOVE_FROM_CART_SUCCESS":
      state = { ...state };
      return updateCartState(state, {cakeid: action.payload?.cakeid}, action.type);

    case 'REMOVE_FROM_CART_FAILURE':
      return {...state, ...action.payload, isLoading: false}

    case "REMOVE_ONE_FROM_CART_SUCCESS":
      state = { ...state };
      return updateCartState(state, {cakeid: action.payload?.cakeid}, action.type);

    case 'REMOVE_ONE_FROM_CART_FAILURE':
      return {...state, ...action.payload, isLoading: false}

    case "EMPTY_CART":
      state = { ...state, items: [], shippingPrice: 0,totalPrice: 0,totalQty: 0 };
      return state;

    case 'CART_SET_ADDRESS':
      state = {...state, address: {...action.payload}}
      return state

    case 'CREATE_ORDER_INIT':
      return {...state, orderCreationInit: true}

    case 'ORDER_CREATED':
      console.log('ORDER_CREATED', {...action.payload})
      return {
        ...state,
        items: [],
        shippingPrice: 0,
        totalPrice: 0,
        totalQty: 0,
        newOrder:{...action.payload.order},
        message: action.payload.messageg,
        orderCreationInit: false
      }

    case 'ORDER_CREATION_FAILURE':
      return {...state, orderCreationInit: false}

    default: return state;
  }
}

export default CartReducer

const updateCartState = (state, item, action) => {
  let cartItems = state.items;
  let totalQty = 0;
  let totalPrice = 0;

  let itemFound = false;

  if (cartItems.length !== 0) {
    cartItems.forEach((cartItem, index) => {
      if (cartItem.cakeid === item?.cakeid) {
        switch (action) {
          case 'ADD_TO_CART_SUCCESS': {
            let newQty = cartItem.quantity + 1;
            let newPrice = Number((cartItem.price / cartItem.quantity) * (newQty));
            cartItems[index] = {...cartItem, quantity: newQty, price: newPrice};
            totalQty += newQty;
            totalPrice += newPrice;
            itemFound = true;
            break;
          }

          case 'REMOVE_ONE_FROM_CART_SUCCESS': {
            let newQty = cartItem.quantity - 1;
            if (newQty === 0) {
              cartItems.splice(index, 1);
            } else {
              let newPrice = Number((cartItem.price / cartItem.quantity) * (newQty));
              cartItems[index] = {
                ...cartItem,
                quantity: newQty,
                price: newPrice
              };
              totalQty += newQty;
              totalPrice += newPrice;
            }
            break;
          }

          case 'REMOVE_FROM_CART_SUCCESS':
            cartItems.splice(index, 1);
            break;

          default:
            break;
        }
      } else {
        totalQty += cartItem.quantity;
        totalPrice += cartItem.price;
      }
    });
  }

  if (item !== undefined && action === 'ADD_TO_CART_SUCCESS' && !itemFound) {
    cartItems.push(item);
    totalQty += item.quantity;
    totalPrice += item.price;
  }

  return {...state, items: [...cartItems], totalQty: totalQty, totalPrice: totalPrice}
}