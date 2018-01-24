import { connect } from 'react-redux'
import { setClients,setOrders, setContracts } from '../actions.js'
import Index from '../App.js'

const getContracts = (contracts) => {
    return contracts;
    }
  
const getClients = (clients) => {
        return clients;
    }

const getOrders = (orders) => {
        return orders;
    }

const getLoaded= (loaded) => {
    return loaded;
    }

const mapStateToProps = state => {
      
    return {
      contracts: getContracts(state.contracts),
      orders: getOrders(state.orders),
      clients: getClients(state.clients),
      loaded: getLoaded(state.loaded)
    }
  }

  

const mapDispatchToProps = dispatch => {
    return{
        
        pushContracts: (payload) => {
            dispatch(setContracts(payload))
          },
        
        pushClients: (payload) => {
            dispatch(setClients(payload))
          },

        pushOrders: (payload) => {
              dispatch(setOrders(payload))
        }
        
        
        }  
  }
  
const IndexContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Index)
  
  export default IndexContainer