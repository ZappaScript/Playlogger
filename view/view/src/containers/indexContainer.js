import { connect } from 'react-redux'
import { setClients,setOrders, setContracts, setMedias,setCanales,setEspecificaciones } from '../actions.js'
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

const debugPrinter = (state) =>{
    console.log(state);


}

const mapStateToProps = state => {
      
    return {
      contracts: getContracts(state.contracts),
      orders: getOrders(state.orders),
      clients: getClients(state.clients),
      loaded: getLoaded(state.loaded),
      printDebug : debugPrinter.bind(this,state)
    }
  }

  

const mapDispatchToProps = dispatch => {
    return{
        pushOrders: (payload) => {
            dispatch(setOrders(payload))
          },

        pushContracts: (payload) => {
            dispatch(setContracts(payload))
          },
        
        pushClients: (payload) => {
            dispatch(setClients(payload))
          },

        pushMedias: (payload) => {
              dispatch(setMedias(payload))
        },
        pushCanales: (payload) => {
            dispatch(setCanales(payload))
        },
        pushEspecificaciones: (payload) => {
            dispatch(setEspecificaciones(payload))
        }
        
        
        }  
  }
  
const IndexContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Index)
  
  export default IndexContainer