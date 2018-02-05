import {
  SET_CLIENTS,SET_CONTRACTS,SET_ORDERS, 
  SET_LOADED, SET_SEARCH,SET_MEDIAS,
  SET_CANALES,SET_ESPECIFICACIONES, ADD_CLIENT, 
  ADD_CONTRACT, ADD_ORDER, UPDATE_CLIENT,
  UPDATE_CONTRACT, UPDATE_ORDER
} from './actions.js'

const initialState = {

    clients : [],

    contracts : [],

    orders:[],

    media:[],
    canales:[],
    especificaciones:[],

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
      
      case SET_MEDIAS:
        return Object.assign({}, state, {
      
          media: action.medias
      
        })
      
      case SET_CANALES:
        return Object.assign({}, state, {
      
          canales: action.canales
      
        })
        
      case SET_ESPECIFICACIONES:
        return Object.assign({}, state, {
      
          especificaciones: action.especificaciones
      
        })
      
      
      case SET_LOADED:
        return Object.assign({}, state, {
      
          loaded: action.loaded
      
      })
      case SET_SEARCH:
        return Object.assign({}, state, {
      
          search: action.searchString
      
      })
      case ADD_CONTRACT:
        return Object.assign({}, state, {
          
          contracts : state.contracts.concat([action.contract])
      
        })
      case ADD_CLIENT:
        return Object.assign({}, state, {
          
          clients : state.clients.concat([action.client])
      
        })
      case ADD_ORDER:
        return Object.assign({}, state, {
          
          orders : state.orders.concat([action.order])
      
        })
      case  UPDATE_ORDER:
      return Object.assign ({} ,state, {
      
        orders : state.orders.filter((order) => { return order.id != action.order.id }).concat([action.order])
      
      })
      case  UPDATE_CLIENT:
      return Object.assign ({} ,state, { 
      
        clients : state.clients.filter((client) => { return client.id != action.client.id }).concat([action.client])
      
      })
      case  UPDATE_CONTRACT:
      return Object.assign ({} ,state, {
         
        contracts : state.contracts.filter((contract) => { return contract.id != action.contract.id }).concat([action.contract])
       
      })
    default:
        return state
    }
 

}

export default contratosApp;