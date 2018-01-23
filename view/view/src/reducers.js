import {SET_CLIENTS,SET_CONTRACTS,SET_ORDERS, SET_LOADED, SET_SEARCH} from './actions.js'

const initialState = {

    clients : [],

    contracts : [],

    orders:[],

    loaded: false,
    search: ""

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
      
      case SET_LOADED:
        return Object.assign({}, state, {
        loaded: action.loaded
        })
      case SET_SEARCH:
        return Object.assign({}, state, {
        search: action.searchString
        })

  
    
    default:
        return state
    }
 

}

export default contratosApp;