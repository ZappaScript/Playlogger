import {SET_CLIENTS,SET_CONTRACTS,SET_ORDERS} from './actions.js'

const initialState = {

    clients : [],

    contracts : [],

    orders:[]

}


function contratosApp(state = initialState, action) {
    switch (action.type) {
      case SET_CLIENTS:
        return Object.assign({}, state, {
          clients: action.clients
        })

      case SET_CONTRACTS:
        return Object.assign({}, state, {
        contracts: action.contracts
        })

      case SET_ORDERS:
        return Object.assign({}, state, {
        orders: action.orders
        })
      
        

  
    
    default:
        return state
    }
 

}

export default contratosApp;